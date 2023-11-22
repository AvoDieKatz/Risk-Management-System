package com.example.rms.business.thread.feedback;

import com.example.rms.business.thread.thread.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ThreadFeedbackRepository extends JpaRepository<ThreadFeedback, Integer> {
    Optional<ThreadFeedbackProjection> findByThread(Thread thread);
}
