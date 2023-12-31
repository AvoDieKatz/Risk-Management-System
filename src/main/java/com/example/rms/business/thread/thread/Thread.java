package com.example.rms.business.thread.thread;

import com.example.rms.business.thread.solution.Solution;
import com.example.rms.business.thread.category.Category;
import com.example.rms.business.thread.comment.Comment;
import com.example.rms.business.thread.feedback.ThreadFeedback;
import com.example.rms.business.thread.assessment.likelihood.Likelihood;
import com.example.rms.business.thread.assessment.severity.Severity;
import com.example.rms.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "author_id")
    private User author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "risk_owner_id")
    private User riskOwner;


    // Review needed
    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
    private List<Likelihood> likelihoods;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
    private List<Severity> severities;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "thread")
    private List<Comment> comments;

    @OneToMany(mappedBy = "thread")
    private List<Solution> solutions;

    @OneToOne(mappedBy = "thread")
    private ThreadFeedback feedback;

}
