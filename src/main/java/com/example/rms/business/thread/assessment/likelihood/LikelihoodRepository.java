package com.example.rms.business.thread.assessment.likelihood;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikelihoodRepository extends JpaRepository<Likelihood, Integer> {
    @Query(value = "SELECT a1.id AS id, a1.likelihood AS likelihood, a1.updated_at AS updatedAt, " +
                "u1.id AS assessorId, u1.first_name AS assessorFirstName, u1.last_name AS assessorLastName " +
            "FROM ((tbl_thread_likelihood a1 " +
            "INNER JOIN (SELECT MAX(updated_at) AS max " +
            "FROM tbl_thread_likelihood " +
            "WHERE updated_at >= CURRENT_DATE - INTERVAL 7 DAY " +
            "AND tbl_thread_likelihood.thread_id = ?1 " +
            "GROUP BY DATE(updated_at)) a2 " +
            "ON a1.updated_at = a2.max) " +
            "INNER JOIN tbl_user u1 ON a1.assessor_id = u1.id);",
            nativeQuery = true
    )
    List<LikelihoodProjection> findThreadLikelihoodInLast7Days(int threadId);
}
