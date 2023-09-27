package com.example.rms.user.request;

import com.example.rms.annotations.Adult;
import com.example.rms.user.Gender;
import com.example.rms.user.Role;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UserRequest(
        @Pattern(regexp = "^[a-zA-Z]+[',\"]?[a-zA-Z]$")
        @NotBlank(message = "First Name is required.")
        String firstName,
        @Pattern(regexp = "^[a-zA-Z]+[',\"]?[a-zA-Z]$")
        @NotBlank(message = "Last Name is required.")
        String lastName,
        @NotNull(message = "Gender is required.")
        Gender gender,
        @NotNull(message = "Date of Birth is required.")
        @Adult
        LocalDate dob,
        @Email(message = "Email is invalid.")
        @NotBlank(message = "Email is required.")
        String email,
        @Pattern(regexp = "^\\d{10}$",
                message = "Phone number must contain only digits and must be exactly 10 digits")
        @NotBlank(message = "Phone Number is required.")
        String phone,
        @NotNull(message = "Role is required.")
        Role role
) {
}
