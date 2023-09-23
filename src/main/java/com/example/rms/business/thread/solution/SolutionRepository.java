package com.example.rms.business.thread.solution;

import com.example.rms.business.thread.solution.dto.SolutionCompact;
import com.example.rms.business.thread.thread.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolutionRepository extends JpaRepository<Solution, Integer> {
    List<SolutionCompact> findByThread(Thread thread);
}
