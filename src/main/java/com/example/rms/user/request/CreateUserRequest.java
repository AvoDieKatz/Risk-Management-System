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
        @NotBlank(message = "Last Name is required.")
        String lastName,
        @NotNull(message = "Gender is required.")
        Gender gender,
        @NotNull(message = "Date of Birth is required.")
        LocalDate dob,
        @NotBlank(message = "Email is required.")
        String email,
        @NotBlank(message = "Phone Number is required.")
        String phone,
        @NotNull(message = "Role is required.")
        Role role
) {
}
