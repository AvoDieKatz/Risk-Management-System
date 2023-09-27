package com.example.rms.business.thread.assessment;

import lombok.Data;

@Data
public class AssessmentDTO {
    private byte likelihoodValue;
    private byte severityValue;

    public AssessmentDTO(byte likelihood, byte severity) {
        this.likelihoodValue = likelihood;
        this.severityValue = severity;
    }
}
