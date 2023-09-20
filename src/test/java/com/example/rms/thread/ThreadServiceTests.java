package com.example.rms.thread;

import com.example.rms.auth.AuthenticationService;
import com.example.rms.business.thread.category.Category;
import com.example.rms.business.thread.thread.Thread;
import com.example.rms.business.thread.thread.ThreadRepository;
import com.example.rms.business.thread.thread.ThreadServiceImpl;
import com.example.rms.business.thread.thread.ThreadStatus;
import com.example.rms.business.thread.thread.dto.ThreadCompactProjection;
import com.example.rms.business.thread.thread.dto.ThreadDTO;
import com.example.rms.business.thread.thread.dto.ThreadRequest;
import com.example.rms.user.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//@SuppressWarnings("unchecked")
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class ThreadServiceTests {
    @Mock
    private ThreadRepository repository;
    
    @InjectMocks
    private ThreadServiceImpl service;

    @InjectMocks
    private AuthenticationService authenticationService;

    private final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    interface ThreadCompactTest extends ThreadCompactProjection {
        void setId(int id);
        void setTitle(String title);
        void setDescription(String description);
        void setStatus(ThreadStatus status);
        void setCategory(Category category);
        void setAuthor(User author);
        void setRiskOwner(User riskOwner);
        void setCreatedAt(LocalDateTime createdAt);
        void setUpdatedAt(LocalDateTime updatedAt);
    }

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

    @Test
    @WithUserDetails("tungdoe")
    void givenRequest_createThread_returnCreatedThread() {
        ThreadRequest request = mock(ThreadRequest.class);
        Thread expectedNewThread = mock(Thread.class);

        given(repository.save(any(Thread.class))).willReturn(expectedNewThread);

        ThreadDTO returnedThread = service.createThread(request);

        Assertions.assertThat(returnedThread).isNotNull();
    }
}
