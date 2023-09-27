package com.example.rms.business.thread.feedback;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ThreadFeedbackDTO(
        @NotBlank(message = "Feedback's content must be provided.")
        String content,
        @NotNull(message = "Feedback's approval must be provided")
        Boolean approval
) {
}
