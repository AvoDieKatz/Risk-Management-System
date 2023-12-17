package com.example.rms.business.thread.comment.dto;

import jakarta.validation.constraints.NotBlank;

public record CommentRequest(
        @NotBlank(message = "Content must be provided.")
        String content
) {
}
