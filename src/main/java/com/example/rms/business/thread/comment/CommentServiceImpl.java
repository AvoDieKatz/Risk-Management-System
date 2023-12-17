package com.example.rms.business.thread.comment;

import com.example.rms.business.auth.AuthenticationService;
import com.example.rms.business.thread.comment.dto.CommentRequest;
import com.example.rms.business.thread.comment.dto.CommentResponse;
import com.example.rms.business.thread.thread.Thread;
import com.example.rms.business.thread.thread.ThreadRepository;
import com.example.rms.exceptions.ResourceNotFoundException;
import com.example.rms.user.User;
import lombok.AllArgsConstructor;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CommentServiceImpl implements CommentService{

    private CommentRepository commentRepository;
    private ThreadRepository threadRepository;

    private AuthenticationService authService;

    @Override
    public List<CommentResponse> getComments(int threadId) {
        Thread currentThread = threadRepository.findById(threadId).orElseThrow(() -> new ResourceNotFoundException("Thread "+threadId+ " cannot be found"));
        return commentRepository.findByThread(currentThread);
    }

    @Override
    public CommentResponse createComment(CommentRequest request, int threadId) {
        Thread currentThread = threadRepository.findById(threadId).orElseThrow(
                () -> new ResourceNotFoundException("Thread "+threadId+ " cannot be found")
        );

        User requestingUser = authService.getAuthenticatedUser();

        Comment newComment = Comment.builder()
                .content(request.content())
                .author(requestingUser)
                .thread(currentThread)
                .build();

        Comment savedComment = commentRepository.save(newComment);

        ProjectionFactory projectionFactory = new SpelAwareProxyProjectionFactory();
        return projectionFactory.createProjection(CommentResponse.class, savedComment);
    }

    @Override
    public void deleteComment(int threadID, int commentId) {

    }
}
