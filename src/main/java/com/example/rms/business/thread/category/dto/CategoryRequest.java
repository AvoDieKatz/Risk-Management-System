package com.example.rms.business.thread.category.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CategoryRequest(
        @Pattern(regexp = "^[A-Za-z]+( [A-Za-z]+)*$", message = "Invalid name")
        @NotBlank(message = "A category name is required.")
        String name
) {
}
