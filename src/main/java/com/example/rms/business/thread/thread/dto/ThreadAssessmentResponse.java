package com.example.rms.business.thread.thread.dto;

import com.example.rms.business.thread.assessment.likelihood.LikelihoodProjection;
import com.example.rms.business.thread.assessment.severity.SeverityProjection;

import java.util.List;

public record ThreadAssessmentResponse(
        List<LikelihoodProjection> likelihoodList,
        List<SeverityProjection> severityList
) {
}
