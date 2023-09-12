package com.example.rms.user.dto;

import com.example.rms.user.Gender;
import com.example.rms.user.Role;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface UserSlim {
    Integer getId();
    @Value("#{target.firstName + ' ' + target.lastName}")
    String getFullName();
    Gender getGender();
    LocalDate getDob();
    String getPhone();
    String getEmail();
    String getUsername();
    LocalDateTime getCreatedAt();
    Role getRole();
}
