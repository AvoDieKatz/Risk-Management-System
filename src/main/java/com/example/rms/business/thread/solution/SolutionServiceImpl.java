package com.example.rms.business.thread.solution;

import com.example.rms.auth.AuthenticationService;
import com.example.rms.business.thread.solution.dto.SolutionCompact;
import com.example.rms.business.thread.solution.dto.SolutionRequest;
import com.example.rms.business.thread.thread.Thread;
import com.example.rms.business.thread.thread.ThreadRepository;
import com.example.rms.converter.DTOConverter;
import com.example.rms.exceptions.InvalidRequestBodyException;
import com.example.rms.exceptions.ResourceNotFoundException;
import com.example.rms.user.User;
import lombok.AllArgsConstructor;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.stereotype.Service;

import java.util.List;

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
                throw new InvalidRequestBodyException(List.of("This type of solution has already been provided."));
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

        //        return DTOConverter.convertToDTO(savedSolution, SolutionDTO.class);
    }

    @Override
    public SolutionCompact updateSolution(SolutionRequest request, int threadId, int solutionId) {
        return null;
    }

    @Override
    public void deleteSolution(int threadId, int solutionId) {

    }
}
