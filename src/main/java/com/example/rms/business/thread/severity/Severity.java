package com.example.rms.business.thread.severity;

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
@Table(name = "tbl_thread_severity")
public class Severity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "thread_id", nullable = false)
    private Thread thread;

    @Column(nullable = false, columnDefinition = "TINYINT")
//    @Column(nullable = false, columnDefinition = "TINYINT UNSIGNED")
    private Byte severity;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // QUESTIONS: What happens when the risk owner changed?
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
