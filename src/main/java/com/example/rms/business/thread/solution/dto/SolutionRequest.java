package com.example.rms.business.thread.solution.dto;

import com.example.rms.business.thread.solution.SolutionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SolutionRequest(
        @NotBlank(message = "Solution's content must be provided.")
        String content,
        @NotNull(message = "Solution's type must be provided.")
        SolutionType type
) {
}
