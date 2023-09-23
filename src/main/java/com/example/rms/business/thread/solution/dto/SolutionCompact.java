package com.example.rms.business.thread.solution.dto;

import com.example.rms.business.thread.solution.SolutionStatus;
import com.example.rms.business.thread.solution.SolutionType;

import java.time.LocalDateTime;

public interface SolutionCompact {
    Integer getId();
    String getContent();
    SolutionType getType();
    SolutionStatus getStatus();
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();
    SolutionProvider getAuthor();

    interface SolutionProvider {
        Integer getId();
        String getLastName();
        String getFirstName();
    }
}
