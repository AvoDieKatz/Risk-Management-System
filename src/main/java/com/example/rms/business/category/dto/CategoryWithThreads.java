package com.example.rms.business.category.dto;

import com.example.rms.business.thread.ThreadStatus;

import java.time.LocalDateTime;

public interface CategoryWithThreads {
    Integer getId();
    String getName();
    SimpleThreadList getThreads();
    interface SimpleThreadList {
        Integer getId();
        String getTitle();
        AuthorUsernameOnly getAuthor();
        OwnerUsernameOnly getRiskOwner();
        ThreadStatus getStatus();
        LocalDateTime getCreatedAt();
        LocalDateTime getUpdatedAt();
        interface AuthorUsernameOnly {
            String getUsername();
        }
        interface OwnerUsernameOnly {
            String getUsername();
        }
    }

}
