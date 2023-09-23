package com.example.rms.business.thread.solution.dto;

import com.example.rms.business.thread.solution.SolutionStatus;
import com.example.rms.business.thread.solution.SolutionType;

public record SolutionRequest(
        String content,
        SolutionType type
) {
}
