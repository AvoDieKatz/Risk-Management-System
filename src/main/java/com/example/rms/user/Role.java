package com.example.rms.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Getter
@AllArgsConstructor
public enum Role {
    ANALYST("ANALYST"),
    MANAGER("MANAGER"),
    ADMIN("ADMIN"),
    OFFICER("OFFICER");

    private final String value;

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>(Collections.emptyList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}