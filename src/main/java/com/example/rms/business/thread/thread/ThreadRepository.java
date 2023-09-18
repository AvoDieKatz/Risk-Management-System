package com.example.rms.business.thread.thread;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ThreadRepository extends JpaRepository<Thread, Integer> {
    <T> List<T> findAllByStatus(ThreadStatus status, Class<T> classType);
    <T> Optional<T> findById(Integer threadId, Class<T> classType);

}
