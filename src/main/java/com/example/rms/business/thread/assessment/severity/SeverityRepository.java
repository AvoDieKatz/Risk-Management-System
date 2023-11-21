package com.example.rms.business.thread.assessment.severity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SeverityRepository extends JpaRepository<Severity, Integer> {

    // GET MAXIMUM 7 NEWEST ROWS OF LATEST ENTRY OF A DAY
    @Query(value = "SELECT a1.id AS id, a1.severity AS severity, a1.updated_at AS updatedAt, " +
            "u1.id AS assessorId, u1.first_name AS assessorFirstName, u1.last_name AS assessorLastName " +
            "FROM ((SELECT * from tbl_thread_severity WHERE thread_id = ?1) a1 " +
            "INNER JOIN (SELECT MAX(updated_at) AS max " +
            "FROM tbl_thread_severity WHERE tbl_thread_severity.thread_id = ?1 " +
            "GROUP BY DATE(updated_at)) a2 ON a1.updated_at = a2.max) " +
            "INNER JOIN tbl_user u1 ON a1.assessor_id = u1.id " +
            "ORDER BY a1.id DESC LIMIT 7;",
            nativeQuery = true)
    List<SeverityProjection> findThreadSeverityInLast7Days(int threadId);
}
