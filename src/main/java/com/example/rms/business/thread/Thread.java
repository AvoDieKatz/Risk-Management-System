package com.example.rms.business.thread;

import com.example.rms.business.solution.Solution;
import com.example.rms.business.category.Category;
import com.example.rms.business.thread.comment.Comment;
import com.example.rms.business.thread.feedback.ThreadFeedback;
import com.example.rms.business.thread.likelihood.Likelihood;
import com.example.rms.business.thread.severity.Severity;
import com.example.rms.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_thread")
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ThreadStatus status = ThreadStatus.IDENTIFIED;

    @ManyToOne
    @JoinColumn(nullable = false, name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(nullable = false, name = "author_id")
    private User author;

    @ManyToOne
    @JoinColumn(nullable = false, name = "risk_owner_id")
    private User riskOwner;


    // Review needed
    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
    private List<Likelihood> likelihoods;

    @OneToMany(mappedBy = "thread")
    private List<Severity> severities;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "thread")
    private List<Comment> comments;

    @OneToMany(mappedBy = "thread")
    private List<Solution> solutions;

    @OneToOne(mappedBy = "thread", fetch = FetchType.LAZY)
    private ThreadFeedback feedback;

}
