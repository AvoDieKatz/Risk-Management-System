package com.example.rms.business.solution;

import com.example.rms.business.thread.Thread;
import com.example.rms.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SolutionStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(nullable = false, name = "thread_id")
    private Thread thread;

    @ManyToOne
    @JoinColumn(nullable = false, name = "author_id")
    private User author;
}
