package com.example.rms.business.thread.comment.dto;

import com.example.rms.user.Role;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface CommentResponse {
    Integer getId();
    String getContent();
    CommentAuthor getAuthor();
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();

    interface CommentAuthor {
        Integer getId();
        String getLastName();
        String getFirstName();
        Role getRole();
    }
}
