package com.example.rms.business.thread.solution;

import com.example.rms.business.thread.thread.Thread;
import com.example.rms.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

//@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "tbl_solution")
public class Solution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, columnDefinition = "text")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SolutionType type;

//    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean accepted;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(nullable = false, name = "thread_id")
    private Thread thread;

    @ManyToOne
    @JoinColumn(nullable = false, name = "author_id")
    private User author;
}
