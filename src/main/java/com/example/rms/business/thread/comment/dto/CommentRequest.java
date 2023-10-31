package com.example.rms.business.thread.comment.dto;

public record CommentRequest(
        int threadId,
        String content
) {
}
