package com.example.rms.user;

import com.example.rms.business.solution.Solution;
import com.example.rms.business.thread.Thread;
import com.example.rms.business.thread.comment.Comment;
import com.example.rms.business.thread.feedback.ThreadFeedback;
import com.example.rms.business.thread.likelihood.Likelihood;
import com.example.rms.business.thread.severity.Severity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(unique = true, nullable = false)
    private String phone;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean removed;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "author")
    private List<Thread> createdThreads;

    @OneToMany(mappedBy = "riskOwner")
    private List<Thread> ownedThreads;

    @OneToMany(mappedBy = "assessor")
//    @OneToMany
    private List<Likelihood> assessedLikelihood;

    @OneToMany(mappedBy = "assessor")
//    @OneToMany
    private List<Severity> assessedSeverity;

    @OneToMany(mappedBy = "author")
//    @OneToMany
    private List<Comment> comments;

    @OneToMany(mappedBy = "author")
    private List<Solution> solutions;

    // Feedback to approve threads, ONLY Manager can provide feedback
    // Consider separate to a "Manager" entity
    @OneToMany(mappedBy = "reviewer")
    private List<ThreadFeedback> feedbacks;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
