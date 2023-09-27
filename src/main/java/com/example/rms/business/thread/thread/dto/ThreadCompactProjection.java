package com.example.rms.business.thread.thread.dto;

import com.example.rms.business.thread.thread.ThreadStatus;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface ThreadCompactProjection {
    Integer getId();
    String getTitle();
    String getDescription();
    ThreadStatus getStatus();
    CategorySlim getCategory();
    Author getAuthor();
    RiskOwner getRiskOwner();
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();

    interface CategorySlim {
        Integer getId();
        String getName();
    }
    interface Author {
        Integer getId();
        @Value("#{target.firstName + ' ' + target.lastName}")
        String getFullName();
    }
    interface RiskOwner {
        Integer getId();
        @Value("#{target.firstName + ' ' + target.lastName}")
        String getFullName();
    }

}
