package com.example.rms.business.thread.assessment;

import jakarta.validation.constraints.*;

public record AssessmentRequest(
        @Max(value = 5, message = "Likelihood value must be equal or smaller than 5.")
        @Min(value = 1, message = "Likelihood value must be equal or bigger than 1.")
        @NotNull(message = "Likelihood value is required.")
        Byte likelihood,
        @Max(value = 5, message = "Severity value must be equal or smaller than 5.")
        @Min(value = 1, message = "Severity value must be equal or bigger than 1.")
        @NotNull(message = "Severity value is required.")
        Byte severity
) {
}
