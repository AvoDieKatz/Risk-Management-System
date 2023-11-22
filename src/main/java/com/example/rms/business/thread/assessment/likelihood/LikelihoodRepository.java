package com.example.rms.business.thread.assessment.likelihood;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikelihoodRepository extends JpaRepository<Likelihood, Integer> {

    // GET MAXIMUM 7 NEWEST ROWS OF LATEST ENTRY OF A DAY
    @Query(value = "SELECT a1.id AS id, a1.likelihood AS likelihood, a1.updated_at AS updatedAt, " +
            "u1.id AS assessorId, u1.first_name AS assessorFirstName, u1.last_name AS assessorLastName " +
            "FROM ((SELECT * from tbl_thread_likelihood WHERE thread_id = ?1) a1 " +
            "INNER JOIN (SELECT MAX(updated_at) AS max " +
            "FROM tbl_thread_likelihood WHERE tbl_thread_likelihood.thread_id = ?1 " +
            "GROUP BY DATE(updated_at)) a2 ON a1.updated_at = a2.max) " +
            "INNER JOIN tbl_user u1 ON a1.assessor_id = u1.id " +
            "ORDER BY a1.updated_at ASC LIMIT 7;",
            nativeQuery = true)
    List<LikelihoodProjection> findThreadLikelihoodInLast7Days(int threadId);
}
