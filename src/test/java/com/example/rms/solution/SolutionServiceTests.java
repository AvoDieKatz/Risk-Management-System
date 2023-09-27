package com.example.rms.solution;

import com.example.rms.business.auth.AuthenticationService;
import com.example.rms.business.thread.solution.Solution;
import com.example.rms.business.thread.solution.SolutionRepository;
import com.example.rms.business.thread.solution.SolutionServiceImpl;
import com.example.rms.business.thread.solution.SolutionType;
import com.example.rms.business.thread.solution.dto.SolutionCompact;
import com.example.rms.business.thread.solution.dto.SolutionRequest;
import com.example.rms.business.thread.thread.Thread;
import com.example.rms.business.thread.thread.ThreadRepository;
import com.example.rms.exceptions.InvalidRequestBodyException;
import com.example.rms.exceptions.ResourceNotFoundException;
import com.example.rms.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class SolutionServiceTests {
    @Mock
    private SolutionRepository solutionRepository;
    @Mock
    private ThreadRepository threadRepository;
    @Mock
    private AuthenticationService authenticationService;
    @InjectMocks
    private SolutionServiceImpl service;

    @Test
    void GetThreadSolutions_ThreadExist_ReturnSolutionList() {
        Thread validThread = mock(Thread.class);
        List<SolutionCompact> mockedSolutionList = new ArrayList<>();

        for (int i=0; i<5; i++)
            mockedSolutionList.add(mock(SolutionCompact.class));

        given(threadRepository.findById(anyInt())).willReturn(Optional.ofNullable(validThread));
        given(solutionRepository.findByThread(validThread)).willReturn(mockedSolutionList);

        List<SolutionCompact> queriedSolutions = service.showThreadSolution(anyInt());

        assertThat(queriedSolutions).isNotNull();
        assertThat(queriedSolutions.size()).isEqualTo(5);
    }

    @Test
    void GetThreadSolution_ThreadNotExist_ThrowNotFoundException() {
        given(threadRepository.findById(anyInt())).willReturn(Optional.empty());
        assertThatThrownBy(
                () -> service.showThreadSolution(anyInt())
        ).isInstanceOf(ResourceNotFoundException.class);
        verify(threadRepository, times(1)).findById(anyInt());
    }

    @Test
    void CreateThreadSolution_ThreadNotExist_ThrowNotFoundException() {
        SolutionRequest mockedRequest = new SolutionRequest(
                "My ACCEPT solution for this thread.",
                SolutionType.ACCEPT
        );

        given(threadRepository.findById(anyInt())).willReturn(Optional.empty());

        assertThatThrownBy(
                () -> service.createSolution(mockedRequest, anyInt())
        ).isInstanceOf(ResourceNotFoundException.class);

        verify(threadRepository, times(1)).findById(anyInt());
        verify(solutionRepository, never()).save(any(Solution.class));
    }

    @Test
    void CreateThreadSolution_ThreadExist_SolutionTypeNotBeenProvided_ReturnCreatedSolution() {
        Thread validThread = mock(Thread.class);
        SolutionRequest mockedRequest = new SolutionRequest(
                "My ACCEPT solution for this thread.",
                SolutionType.ACCEPT
        );

        Solution expectedSolution = new Solution();
        expectedSolution.setContent("My ACCEPT solution for this thread.");
        expectedSolution.setType(SolutionType.ACCEPT);

        given(authenticationService.getAuthenticatedUser()).willReturn(mock(User.class));

        given(threadRepository.findById(anyInt())).willReturn(Optional.of(validThread));
        given(solutionRepository.save(any(Solution.class))).willReturn(expectedSolution);

        SolutionCompact returnedSolution = service.createSolution(mockedRequest, anyInt());

        assertThat(returnedSolution).isNotNull();
        assertThat(returnedSolution.getType()).isEqualTo(SolutionType.ACCEPT);

        verify(threadRepository, times(1)).findById(anyInt());
        verify(solutionRepository, times(1)).save(any(Solution.class));
    }

    @Test
    void CreateThreadSolution_ThreadExist_SolutionTypeAlreadyProvided_ThrowInvalidRequestException() {
        Thread validThread = mock(Thread.class);

        SolutionRequest mockedRequest = new SolutionRequest(
                "My ACCEPT solution for this thread.",
                SolutionType.ACCEPT
        );

        List<Solution> threadSolutionList = new ArrayList<>();
        Solution s1 = new Solution();
        s1.setType(SolutionType.ACCEPT);
        threadSolutionList.add(s1);

        given(threadRepository.findById(anyInt())).willReturn(Optional.of(validThread));
        given(validThread.getSolutions()).willReturn(threadSolutionList);

        assertThatThrownBy(
                () -> service.createSolution(mockedRequest, anyInt())
        ).isInstanceOf(InvalidRequestBodyException.class);

        verify(threadRepository, times(1)).findById(anyInt());
        verify(solutionRepository, never()).save(any(Solution.class));
    }

    @Test
    void ChooseSolution_ThreadExist_SolutionExist_ReturnChoseSolution() {
        Thread validThread = mock(Thread.class);
        Solution validSolution = mock(Solution.class);

        given(threadRepository.findById(anyInt())).willReturn(Optional.ofNullable(validThread));
        given(solutionRepository.findById(anyInt())).willReturn(Optional.ofNullable(validSolution));

        assert validSolution != null;
        assert validThread != null;

        given(validSolution.isAccepted()).willReturn(true);

        given(solutionRepository.save(eq(validSolution))).willReturn(validSolution);
        given(threadRepository.save(eq(validThread))).willReturn(validThread);

        var choseSolution = service.acceptSolution(1,1);

        System.out.println(choseSolution);

        assertThat(choseSolution).isNotNull();
        assertThat(choseSolution.isAccepted()).isEqualTo(true);

        verify(threadRepository).findById(anyInt());
        verify(solutionRepository).findById(anyInt());

        verify(threadRepository).save(validThread);
        verify(solutionRepository).save(validSolution);

    }
}
