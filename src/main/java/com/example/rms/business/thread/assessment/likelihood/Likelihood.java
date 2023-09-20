package com.example.rms.business.thread.assessment.likelihood;

import com.example.rms.business.thread.thread.Thread;
import com.example.rms.user.User;
import jakarta.persistence.*;
import lombok.*;
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
@Table(name = "tbl_thread_likelihood")
public class Likelihood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thread_id", nullable = false)
    private Thread thread;

//    @Column(nullable = false, columnDefinition = "TINYINT UNSIGNED")
    @Column(nullable = false, columnDefinition = "TINYINT")
    private Byte likelihood;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "assessor_id", nullable = false)
    private User assessor;

    public Likelihood(Thread thread, Byte likelihood, User assessor) {
        this.thread = thread;
        this.likelihood = likelihood;
        this.assessor = assessor;
        this.updatedAt = LocalDateTime.now();
    }
}
