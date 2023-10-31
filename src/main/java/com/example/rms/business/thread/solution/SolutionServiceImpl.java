package com.example.rms.business.thread.solution;

import com.example.rms.business.auth.AuthenticationService;
import com.example.rms.business.thread.solution.dto.SolutionCompact;
import com.example.rms.business.thread.solution.dto.SolutionRequest;
import com.example.rms.business.thread.thread.Thread;
import com.example.rms.business.thread.thread.ThreadRepository;
import com.example.rms.business.thread.thread.ThreadStatus;
import com.example.rms.exceptions.InvalidRequestBodyException;
import com.example.rms.exceptions.ResourceNotFoundException;
import com.example.rms.exceptions.UnsatisfiedConditionException;
import com.example.rms.user.User;
import lombok.AllArgsConstructor;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Service
public class SolutionServiceImpl implements SolutionService {

    private SolutionRepository solutionRepository;
    private ThreadRepository threadRepository;

    private AuthenticationService authService;

    @Override
    public List<SolutionCompact> showThreadSolution(int threadId) {
        Thread thread = threadRepository.findById(threadId).orElseThrow(
                () -> new ResourceNotFoundException("Thread "+threadId+" cannot be found.")
        );
        return solutionRepository.findByThread(thread);
    }

    @Override
    public SolutionCompact createSolution(SolutionRequest request, int threadId) {
        Thread thread = threadRepository.findById(threadId).orElseThrow(
                () -> new ResourceNotFoundException("Thread "+threadId+" cannot be found.")
        );

        List<Solution> currentSolutions = thread.getSolutions();
        for (Solution existedSolution : currentSolutions) {
            if (existedSolution.getType() == request.type()) {
//                throw new InvalidRequestBodyException(List.of("This type of solution has already been provided."));
                throw new InvalidRequestBodyException((HashMap<String, String>) Map.of("value", "This type of solution has already been provided."));
            }
        }

        User requestingUser = authService.getAuthenticatedUser();
        Solution newSolution =  Solution.builder()
                .content(request.content())
                .type(request.type())
                .content(request.content())
                .author(requestingUser)
                .thread(thread)
                .build();

        Solution savedSolution = solutionRepository.save(newSolution);

        ProjectionFactory projectionFactory = new SpelAwareProxyProjectionFactory();
        return projectionFactory.createProjection(SolutionCompact.class, savedSolution);
    }

    @Override
    public SolutionCompact updateSolution(SolutionRequest request, int threadId, int solutionId) {
        return null;
    }

    @Override
    public void deleteSolution(int threadId, int solutionId) {

    }

    @Override
    public SolutionCompact acceptSolution(int threadId, int solutionId) {
        Thread thread = threadRepository.findById(threadId).orElseThrow(
                () -> new ResourceNotFoundException("Cannot find selected Thread. (Id: "+threadId+")")
        );

        if (thread.getStatus() == ThreadStatus.RESOLVED) {
            throw new UnsatisfiedConditionException("A solution has been chosen for this thread. (Thread ID: " + threadId + ")");
        }

        Solution solution = solutionRepository.findById(solutionId).orElseThrow(
                () -> new ResourceNotFoundException("Cannot find the choosing solution. (Id: " + solutionId + ")" )
        );

        solution.setAccepted(true);
        Solution savedSolution = solutionRepository.save(solution);

        thread.setStatus(ThreadStatus.RESOLVED);
        threadRepository.save(thread);

        ProjectionFactory projectionFactory = new SpelAwareProxyProjectionFactory();
        return projectionFactory.createProjection(SolutionCompact.class, savedSolution);
    }
}
