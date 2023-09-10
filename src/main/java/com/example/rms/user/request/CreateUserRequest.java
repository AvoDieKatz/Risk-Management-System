package com.example.rms.user.request;

import com.example.rms.user.Gender;
import com.example.rms.user.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Date;

public record CreateUserRequest(
        @NotBlank(message = "First Name is required.")
        String firstName,
        @NotBlank(message = "First Name is required.")
        String lastName,
        @NotNull(message = "First Name is required.")
        Gender gender,
        @NotNull(message = "First Name is required.")
        LocalDate dob,
        @NotBlank(message = "First Name is required.")
        String email,
        @NotBlank(message = "First Name is required.")
        String phone,
        @NotNull(message = "First Name is required.")
        Role role
) {
}
