package com.example.rms.business.thread.comment.dto;

import java.time.LocalDateTime;

public interface CommentResponse {
    Integer getId();
    String getContent();
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();

}
