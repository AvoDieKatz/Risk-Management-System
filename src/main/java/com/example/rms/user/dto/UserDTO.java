package com.example.rms.user.dto;

import com.example.rms.user.Gender;
import com.example.rms.user.Role;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class UserDTO {
    private Integer id;
    private String lastName;
    private String firstName;
    private Gender gender;
    private LocalDate dob;
    private String phone;
    private String email;
    private String username;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Role role;
}
