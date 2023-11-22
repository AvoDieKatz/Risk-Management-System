package com.example.rms.business.thread.feedback;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface ThreadFeedbackProjection {
    Integer getId();
    String getContent();
    boolean isApproval();
    LocalDateTime getCreatedAt();
    Reviewer getReviewer();

    interface Reviewer {
        Integer getId();
        @Value("#{target.firstName + ' ' + target.lastName}")
        String getFullName();
    }
}
