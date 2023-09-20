package com.example.rms.business.thread.assessment;

public record AssessmentRequest(
        byte likelihood,
        byte severity
) {
}
