package com.example.rms.business.thread.assessment.severity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SeverityRepository extends JpaRepository<Severity, Integer> {

    @Query(value = "SELECT a1.id as id, a1.severity AS severity, a1.updated_at AS updatedAt, " +
                "u1.id AS assessorId, u1.last_name AS assessorLastName, u1.first_name AS assessorFirstName " +
            "FROM ((tbl_thread_severity a1 " +
            "INNER JOIN (SELECT MAX(updated_at) as max " +
            "FROM tbl_thread_severity " +
            "WHERE updated_at >= CURRENT_DATE - INTERVAL 7 DAY " +
            "AND tbl_thread_severity.thread_id = ?1 " +
            "GROUP BY DATE(updated_at)) a2 " +
            "ON a1.updated_at = a2.max) " +
            "INNER JOIN tbl_user u1 ON a1.assessor_id = u1.id);",
            nativeQuery = true
    )
    List<SeverityProjection> findThreadSeverityInLast7Days(int threadId);
}
