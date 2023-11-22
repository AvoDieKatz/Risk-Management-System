package com.example.rms.business.thread.comment;

import com.example.rms.business.thread.comment.dto.CommentRequest;
import com.example.rms.business.thread.comment.dto.CommentResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{
    @Override
    public List<CommentResponse> getComments(int threadId) {
        return null;
    }

    @Override
    public CommentResponse createComment(CommentRequest request) {
        return null;
    }

    @Override
    public void deleteComment(int threadID, int commentId) {

    }
}
