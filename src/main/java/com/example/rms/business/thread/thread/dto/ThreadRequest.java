package com.example.rms.business.thread.thread.dto;

import jakarta.validation.constraints.*;

public record ThreadRequest(
        @NotBlank(message = "Title is required.")
        String title,
        @NotNull(message = "Category id is required.")
        Integer categoryId,
        @NotBlank(message = "Description is required.")
        String description,
        @Max(value = 5, message = "Likelihood value must be equal or smaller than 5.")
        @Min(value = 1, message = "Likelihood value must be equal or bigger than 1.")
        @NotNull(message = "Initial likelihood value is required.")
        Byte likelihoodValue,
        @Max(value = 5, message = "Severity value must be equal or smaller than 5.")
        @Min(value = 1, message = "Severity value must be equal or bigger than 1.")
        @NotNull(message = "Initial severity value is required.")
        Byte severityValue
) {
}
