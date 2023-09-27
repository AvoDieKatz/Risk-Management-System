package com.example.rms.thread;

import com.example.rms.business.auth.AuthenticationService;
import com.example.rms.business.thread.category.CategoryRepository;
import com.example.rms.business.thread.thread.Thread;
import com.example.rms.business.thread.thread.ThreadRepository;
import com.example.rms.business.thread.thread.ThreadServiceImpl;
import com.example.rms.business.thread.thread.ThreadStatus;
import com.example.rms.business.thread.thread.dto.ThreadCompactProjection;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//@SuppressWarnings("unchecked")
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class ThreadServiceTests {
    @Mock
    private ThreadRepository repository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private AuthenticationService authService;

    @InjectMocks
    private ThreadServiceImpl service;

    @Test
    void givenStatus_getThreads_returnThreadsByStatus() {
        ThreadStatus status = ThreadStatus.IDENTIFIED;
        List<Thread> expectedThreadList = new ArrayList<>();
        for (int i=0; i<5; i++) {
            expectedThreadList.add(mock(Thread.class));
        }

        given(repository.findAllByStatus(eq(status), any(Class.class))).willReturn(expectedThreadList);

        List<ThreadCompactProjection> threadList = service.getThreads(status);

        System.out.println("THREAD LIST SIZE = " + threadList.size());

        Assertions.assertThat(threadList).isNotNull();
        Assertions.assertThat(threadList.size()).isEqualTo(5);
    }

    @Test
    void givenValidId_getThread_returnThreadDetail() {
        int validId = 1;

        ThreadCompactProjection expectedThread = mock(ThreadCompactProjection.class);

        given(repository.findById(eq(validId), any(Class.class))).willReturn(Optional.ofNullable(expectedThread));

        ThreadCompactProjection thread = service.getThreadDetail(validId);

        Assertions.assertThat(thread).isNotNull();
    }


    // TOO COMPLICATED DUE TO MULTIPLE DEPENDENCY INJECTIONS IN THE IMPLEMENTATION OF THIS METHOD
//    @Test
//    void CreateThread_Normal_ReturnCreatedThread() {
//        ThreadRequest request = mock(ThreadRequest.class);
//        Thread expectedNewThread = mock(Thread.class);
//        Category validCategory = mock(Category.class);
//
//        given(authService.getAuthenticatedUser()).willReturn(mock(User.class));
//
//        given(categoryRepository.findById(anyInt())).willReturn(Optional.ofNullable(validCategory));
//        given(repository.save(any(Thread.class))).willReturn(expectedNewThread);
//
//        ThreadDTO returnedThread = service.createThread(request);
//
//        Assertions.assertThat(returnedThread).isNotNull();
//    }
}
