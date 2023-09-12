package com.example.rms.business.thread;

import com.example.rms.auth.AuthenticationService;
import com.example.rms.business.category.Category;
import com.example.rms.business.category.CategoryRepository;
import com.example.rms.business.thread.dto.AssessRequest;
import com.example.rms.business.thread.dto.ThreadDTO;
import com.example.rms.business.thread.dto.ThreadCompactProjection;
import com.example.rms.business.thread.likelihood.Likelihood;
import com.example.rms.business.thread.likelihood.LikelihoodRepository;
import com.example.rms.business.thread.dto.ThreadRequest;
import com.example.rms.business.thread.severity.Severity;
import com.example.rms.business.thread.severity.SeverityRepository;
import com.example.rms.exceptions.InvalidRequestBodyException;
import com.example.rms.exceptions.ResourceNotFoundException;
import com.example.rms.user.User;
import com.example.rms.user.UserRepository;
import com.example.rms.user.UserServiceImpl;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ThreadServiceImpl implements ThreadService {

    private ThreadRepository threadRepository;
    private CategoryRepository categoryRepository;
    private LikelihoodRepository likelihoodRepository;
    private SeverityRepository severityRepository;

    private AuthenticationService authService;

    @Override
    public List<ThreadCompactProjection> getThreads(ThreadStatus status) {
//        return threadRepository.findAll().stream().map(el -> DTOConverter.convertToDTO(el, ThreadDTO.class)).toList();
//        return threadRepository.findAll().stream().map(ThreadDTO::new).toList();
        return threadRepository.findAllByStatus(status, ThreadCompactProjection.class);
    }

    @Override
    public ThreadCompactProjection getThreadDetail(int threadId) {
        Optional<ThreadCompactProjection> optional = threadRepository.findById(threadId, ThreadCompactProjection.class);
        if (optional.isPresent()) {
            return optional.get();
            //            return DTOConverter.convertToDTO(optional.get(), ThreadDTO.class);
        }
        throw new ResourceNotFoundException("Thread with id " + threadId + " could not be found");
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
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Thread savedThread = threadRepository.saveAndFlush(newThread);

        likelihoodRepository.save(new Likelihood(
                savedThread,
                request.likelihoodValue(),
                requestUser
        ));

        severityRepository.save(new Severity(
                savedThread,
                request.severityValue(),
                requestUser
        ));

        return new ThreadDTO(savedThread);

//        return DTOConverter.convertToDTO(savedThread, ThreadDTO.class);
    }

    @Override
    public ThreadDTO updateThread(int threadId, ThreadRequest request) {
        Optional<Thread> optionalThread = threadRepository.findById(threadId);
        if (optionalThread.isPresent()) {
            User requestUser = authService.getAuthenticatedUser();
            Thread foundThread = optionalThread.get();
            boolean isUpdateAllowed = isUpdateAllowed(foundThread.getRiskOwner().getId(), requestUser.getId(), foundThread.getStatus());
            if (isUpdateAllowed) {

                // Check if the category is changed before fetching new category
                if (foundThread.getCategory().getId() != request.categoryId()) {
                    Category newCategory = categoryRepository.findById(request.categoryId()).orElseThrow(
                            () -> new InvalidRequestBodyException(List.of("The selected does not exists."))
                    );

                    // Update Thread's category
                    foundThread.setCategory(newCategory);
                }

                // Update the remaining of the request.
                foundThread.setTitle(request.title());
                foundThread.setDescription(request.description());
                foundThread.setUpdatedAt(LocalDateTime.now());

                return new ThreadDTO(threadRepository.save(foundThread));
            }
        }
        throw new ResourceNotFoundException("Thread with Id " + threadId + " cannot be found");
    }

    private boolean isUpdateAllowed(int threadOwnerId, int requestUserId, ThreadStatus status ) {
        if (threadOwnerId == requestUserId) {
            return status == ThreadStatus.ACTIVE || status == ThreadStatus.IDENTIFIED;
        }
        return false;
    }

    @Override
    public void deleteThread(int threadId) {
        Optional<Thread> optional = threadRepository.findById(threadId);

        // Check for status

        optional.ifPresent(threadRepository::delete);
        throw new ResourceNotFoundException("Thread id " + threadId + " could not be found");
    }

    @Override
    public void assessThread(AssessRequest request) {

    }

    @Override
    public void updateThreadStatus(Thread thread) {

    }

    @Override
    public void assignRiskOwner(Thread thread, int newOwnerId) {

    }

    @Override
    public boolean reviewThread(Thread thread) {
        return false;
    }
}
