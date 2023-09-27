package com.example.rms.business.token;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_token")
public class Token {
    @Id
    @GeneratedValue
    public Integer id;

    @Column(unique = true)
    public String token;


}
