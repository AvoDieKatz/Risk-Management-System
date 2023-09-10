package com.example.rms.user.request;

import com.example.rms.user.Gender;
import com.example.rms.user.Role;

import java.time.LocalDate;
import java.util.Date;

public record UpdateUserRequest (
    String firstName,
    String lastName,
    Gender gender,
    LocalDate dob,
    String email,
    String phone
) {

}