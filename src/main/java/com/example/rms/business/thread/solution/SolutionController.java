package com.example.rms.business.thread.solution;

import com.example.rms.business.thread.solution.dto.SolutionCompact;
import com.example.rms.business.thread.solution.dto.SolutionRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/thread/{threadId}/solution")
@RequiredArgsConstructor
public class SolutionController {

    private final SolutionServiceImpl solutionService;

    @GetMapping
    public ResponseEntity<List<SolutionCompact>> getThreadSolution(
            @PathVariable("threadId") int threadId
    ) {
        return new ResponseEntity<>(solutionService.showThreadSolution(threadId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SolutionCompact> createThreadSolution(
            @PathVariable("threadId") int threadId,
            @RequestBody @Valid SolutionRequest request
            ) {
        return new ResponseEntity<>(solutionService.createSolution(request, threadId), HttpStatus.CREATED);
    }

    @PutMapping("/choice")
    public ResponseEntity<SolutionCompact> acceptProposedSolution(
            @PathVariable("threadId") int threadId,
            @RequestParam int solutionId
    ) {
        return new ResponseEntity<>(solutionService.acceptSolution(threadId, solutionId), HttpStatus.OK);
    }
}
