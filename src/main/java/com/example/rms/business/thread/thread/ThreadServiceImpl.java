package com.example.rms.business.thread.thread;

import com.example.rms.business.auth.AuthenticationService;
import com.example.rms.business.thread.assessment.likelihood.LikelihoodProjection;
import com.example.rms.business.thread.assessment.severity.SeverityProjection;
import com.example.rms.business.thread.category.Category;
import com.example.rms.business.thread.category.CategoryRepository;
import com.example.rms.business.thread.assessment.AssessServiceImpl;
import com.example.rms.business.thread.assessment.AssessmentDTO;
import com.example.rms.business.thread.assessment.AssessmentRequest;
import com.example.rms.business.thread.thread.dto.ThreadAssessmentResponse;
import com.example.rms.business.thread.thread.dto.ThreadDTO;
import com.example.rms.business.thread.thread.dto.ThreadCompactProjection;
import com.example.rms.business.thread.feedback.ThreadFeedback;
import com.example.rms.business.thread.feedback.ThreadFeedbackDTO;
import com.example.rms.business.thread.feedback.ThreadFeedbackRepository;
import com.example.rms.business.thread.assessment.likelihood.Likelihood;
import com.example.rms.business.thread.thread.dto.ThreadRequest;
import com.example.rms.business.thread.assessment.severity.Severity;
import com.example.rms.exceptions.ForbiddenActionException;
import com.example.rms.exceptions.InvalidRequestBodyException;
import com.example.rms.exceptions.ResourceNotFoundException;
import com.example.rms.exceptions.UnsatisfiedConditionException;
import com.example.rms.user.User;
import com.example.rms.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ThreadServiceImpl implements ThreadService {

    private UserRepository userRepository;
    private ThreadRepository threadRepository;
    private CategoryRepository categoryRepository;
    private ThreadFeedbackRepository threadFeedbackRepository;

    private AuthenticationService authService;
    private AssessServiceImpl assessService;

    @Override
    public List<ThreadCompactProjection> getThreads(ThreadStatus status) {
        return threadRepository.findAllByStatus(status, ThreadCompactProjection.class);
    }

    @Override
    public ThreadCompactProjection getThreadDetail(int threadId) {
        Optional<ThreadCompactProjection> optional = threadRepository.findById(threadId, ThreadCompactProjection.class);
        if (optional.isPresent()) {
            return optional.get();
        }
        throw new ResourceNotFoundException("Thread with id " + threadId + " could not be found");
    }

    @Override
    public ThreadAssessmentResponse getThreadAssessments(int threadId) {
        Optional<ThreadCompactProjection> optional = threadRepository.findById(threadId, ThreadCompactProjection.class);
        if (optional.isPresent()) {

            List<LikelihoodProjection> likelihoodList = assessService.getThreadLikelihoodInLast7Days(threadId);
            List<SeverityProjection> severityList = assessService.getThreadSeverityInLast7Days(threadId);

            return new ThreadAssessmentResponse(likelihoodList, severityList);
        }
        throw new ResourceNotFoundException("Thread with id " + threadId + " could not be found");
    }

    @Override
    public List<ThreadCompactProjection> getPersonalThreads() {
        User requestUser = authService.getAuthenticatedUser();
        return threadRepository.findByAuthorOrRiskOwnerOrderByCreatedAtDesc(requestUser, requestUser, ThreadCompactProjection.class);
    }

    @Override
    public ThreadDTO createThread(ThreadRequest request) {
        User requestUser = authService.getAuthenticatedUser();

        Category selectedCategory = categoryRepository.findById(request.categoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cannot find selected category.")
                );

        Thread newThread = Thread.builder()
                .title(request.title())
                .description(request.description())
                .category(selectedCategory)
                .author(requestUser)
                .riskOwner(requestUser)
                .status(ThreadStatus.IDENTIFIED)
                .build();

        Thread savedThread = threadRepository.saveAndFlush(newThread);

        assessService.performAssess(
                request.likelihoodValue(), savedThread, Likelihood.class
        );

        assessService.performAssess(
                request.severityValue(), savedThread, Severity.class
        );

        return new ThreadDTO(savedThread);
    }

    @Override
    public ThreadDTO updateThread(int threadId, ThreadRequest request) {
        Thread thread = threadRepository.findById(threadId).orElseThrow(
                () -> new ResourceNotFoundException("Thread with Id " + threadId + " cannot be found")
        );
        User requestUser = authService.getAuthenticatedUser();

        checkUpdateAllowance(thread.getRiskOwner().getId(), requestUser.getId(), thread.getStatus());

        // Check if the category is changed before fetching new category
        if (thread.getCategory().getId() != request.categoryId()) {
            Category newCategory = categoryRepository.findById(request.categoryId()).orElseThrow(
                    () -> new InvalidRequestBodyException((HashMap<String, String>) Map.of("category", "The selected category does not exist."))
            );

            // Update Thread's category
            thread.setCategory(newCategory);
        }

        // Update the remaining of the request.
        thread.setTitle(request.title());
        thread.setDescription(request.description());

        return new ThreadDTO(threadRepository.save(thread));
    }

    private void checkUpdateAllowance(int threadOwnerId, int requestUserId, ThreadStatus status) {
        if (threadOwnerId == requestUserId) {
            if (status == ThreadStatus.REJECTED || status == ThreadStatus.RESOLVED)
                throw new UnsatisfiedConditionException("Current Thread is no longer active, alteration is forbidden.");
        } else {
            throw new ForbiddenActionException("You do not have permission to alter this thread.");
        }
    }

    @Override
    public void deleteThread(int threadId) {
        Optional<Thread> optional = threadRepository.findById(threadId);
        if (optional.isPresent()) {
            Thread thread = optional.get();
            if (thread.getStatus() == ThreadStatus.IDENTIFIED) {
                threadRepository.deleteById(threadId);
                return;
            }
            throw new UnsatisfiedConditionException("This action is not permitted (Reason: Thread has been reviewed)");
        }
        throw new ResourceNotFoundException("Thread id " + threadId + " could not be found");
    }

    @Override
    @Transactional(
            rollbackFor = Exception.class,
            noRollbackFor = ResourceNotFoundException.class
    )
    public AssessmentDTO assessThread(int threadId, AssessmentRequest request) {
        Thread thread = threadRepository.findById(threadId).orElseThrow(
                () -> new ResourceNotFoundException("Thread id " + threadId + " could not be found")
        );

        Likelihood assessedLikelihood = assessService.performAssess(
                request.likelihood(), thread, Likelihood.class
        );
        Severity assessedSeverity = assessService.performAssess(
                request.severity(), thread, Severity.class);

        return new AssessmentDTO(assessedLikelihood.getLikelihood(), assessedSeverity.getSeverity());
    }

    @Override
    public ThreadDTO updateThreadStatus(int threadId, ThreadStatus requestStatus) {
        Thread thread = threadRepository.findById(threadId).orElseThrow(
                () -> new ResourceNotFoundException("Thread does not found.")
        );
        ThreadStatus currentStatus = thread.getStatus();
        if (currentStatus != requestStatus && currentStatus != ThreadStatus.IDENTIFIED) {
            thread.setStatus(requestStatus);
            threadRepository.save(thread);
            return new ThreadDTO(thread);
        }
        throw new UnsatisfiedConditionException("New status is not changed.");
    }

    @Override
    public ThreadDTO assignRiskOwner(int threadId, int newOwnerId) {
        Thread thread = threadRepository.findById(threadId).orElseThrow(
                () -> new ResourceNotFoundException("Thread does not exists.")
        );
        if (thread.getStatus() == ThreadStatus.ACTIVE) {
            if (thread.getRiskOwner().getId() != newOwnerId) {
                User currentOwner = userRepository.findById(newOwnerId).orElseThrow(
                        () -> new ResourceNotFoundException("The intended new risk owner does not exist.")
                );
                thread.setRiskOwner(currentOwner);
                Thread savedThread = threadRepository.save(thread);
                return new ThreadDTO(savedThread);
            } else {
                throw new InvalidRequestBodyException((HashMap<String, String>) Map.of("ownerId", "New Risk Owner cannot be the same person."));
            }
        }
        throw new UnsatisfiedConditionException("Cannot change the thread's risk owner now.(Reason: thread is not active).");
    }

    @Override
    @Transactional(
            rollbackFor = Exception.class,
            noRollbackFor = ResourceNotFoundException.class
    )
    public void reviewThread(int threadId, ThreadFeedbackDTO request) {
        Thread thread = threadRepository.findById(threadId).orElseThrow(
                () -> new ResourceNotFoundException("Thread '" + threadId + "' does not exist.")
        );

        System.out.println("THREAD'S CATEGORY = " + thread.getCategory().getName());

        if (thread.getStatus() == ThreadStatus.IDENTIFIED) {
            try {
                ThreadFeedback feedback = ThreadFeedback.builder()
                        .approval(request.approval())
                        .content(request.content())
                        .thread(thread)
                        .reviewer(authService.getAuthenticatedUser())
                        .build();

                if (request.approval()) {
                    thread.setStatus(ThreadStatus.ACTIVE);
                } else {
                    thread.setStatus(ThreadStatus.REJECTED);
                }
                threadRepository.save(thread);

                threadFeedbackRepository.save(feedback);
            } catch (DataIntegrityViolationException exception) {
                throw new RuntimeException(exception.getMessage());
            }
        } else {
            throw new UnsatisfiedConditionException("The thread does not except review now.");
        }
    }
}
