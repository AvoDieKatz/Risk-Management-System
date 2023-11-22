package com.example.rms.business.thread.thread;

import com.example.rms.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ThreadRepository extends JpaRepository<Thread, Integer> {
    <T> List<T> findAllByStatus(ThreadStatus status, Class<T> classType);
    <T> List<T> findByAuthorOrRiskOwnerOrderByCreatedAtDesc(User author, User owner, Class<T> classType);
    <T> List<T> findByAuthorOrderByCreatedAtDesc(User author, Class<T> classType);
    <T> List<T> findByRiskOwnerOrderByCreatedAtDesc(User riskOwner, Class<T> classType);
    <T> Optional<T> findById(Integer threadId, Class<T> classType);
}
