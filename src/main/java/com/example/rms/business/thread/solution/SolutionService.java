package com.example.rms.business.thread.solution;

import com.example.rms.business.thread.solution.dto.SolutionCompact;
import com.example.rms.business.thread.solution.dto.SolutionRequest;

import java.util.List;

public interface SolutionService {
    List<SolutionCompact> showThreadSolution(int threadId);

    SolutionCompact createSolution(SolutionRequest request, int threadId);

    SolutionCompact updateSolution(SolutionRequest request, int threadId, int solutionId);

    void deleteSolution(int threadId, int solutionId);
}
