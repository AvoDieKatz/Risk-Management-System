package com.example.rms.business.thread.assessment.severity;

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
@Table(name = "tbl_thread_severity")
public class Severity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thread_id", nullable = false)
    private Thread thread;

    @Column(nullable = false, columnDefinition = "TINYINT")
//    @Column(nullable = false, columnDefinition = "TINYINT UNSIGNED")
    private Byte severity;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "assessor_id", nullable = false)
    private User assessor;

    public Severity(Thread thread, Byte severity, User assessor) {
        this.thread = thread;
        this.severity = severity;
        this.assessor = assessor;
        this.updatedAt = LocalDateTime.now();
    }
}
