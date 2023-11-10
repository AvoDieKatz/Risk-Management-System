package com.example.rms.business.thread.assessment.likelihood;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface LikelihoodProjection {
    Integer getId();
    @Value("#{target.likelihood}")
    Byte getValue();
    LocalDateTime getUpdatedAt();
    Integer getAssessorId();
    @Value("#{target.assessorFirstName + ' ' + target.assessorLastName}")
    String getAssessorFullName();
}
