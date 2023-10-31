package com.example.rms.business.thread.comment;

import com.example.rms.business.thread.comment.dto.CommentRequest;
import com.example.rms.business.thread.comment.dto.CommentResponse;

import java.util.List;

public interface CommentService {
    List<CommentResponse> getComments(int threadId);
    CommentResponse createComment(CommentRequest request);
    void deleteComment(int threadID, int commentId);
}
