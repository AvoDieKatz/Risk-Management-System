package com.example.rms.business.thread.comment;

import com.example.rms.business.thread.comment.dto.CommentResponse;
import com.example.rms.business.thread.thread.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<CommentResponse> findByThread(Thread thread);
}
