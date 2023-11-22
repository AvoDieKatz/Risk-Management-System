package com.example.rms.business.thread.assessment.severity;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface SeverityProjection {
    Integer getId();
    @Value("#{target.severity}")
    Byte getValue();
    LocalDateTime getUpdatedAt();
    Integer getAssessorId();
    @Value("#{target.assessorFirstName + ' ' + target.assessorLastName}")
    String getAssessorFullName();
}
