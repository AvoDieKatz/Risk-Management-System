package com.example.rms.business.thread.thread;

import com.example.rms.business.thread.assessment.AssessmentRequest;
import com.example.rms.business.thread.assessment.AssessmentDTO;
import com.example.rms.business.thread.thread.dto.ThreadAssessmentResponse;
import com.example.rms.business.thread.thread.dto.ThreadDTO;
import com.example.rms.business.thread.thread.dto.ThreadCompactProjection;
import com.example.rms.business.thread.thread.dto.ThreadRequest;
import com.example.rms.business.thread.feedback.ThreadFeedbackDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/thread")
@RequiredArgsConstructor
public class ThreadController {

    private final ThreadServiceImpl threadService;

    @GetMapping
    public ResponseEntity<Iterable<ThreadCompactProjection>> getAllThreads(
            @RequestParam(required = false, defaultValue = ThreadStatus.Constant.ACTIVE) ThreadStatus status
    ) {
        return ResponseEntity.ok(threadService.getThreads(status));
    }

    @GetMapping("/{threadId}")
    public ResponseEntity<ThreadCompactProjection> getThreadDetail(@PathVariable("threadId") int threadId) {
        return ResponseEntity.ok(threadService.getThreadDetail(threadId));
    }

    @GetMapping("/{threadId}/assess")
    public ResponseEntity<ThreadAssessmentResponse> getThreadAssessments(@PathVariable("threadId") int threadId) {
        return ResponseEntity.ok(threadService.getThreadAssessments(threadId));
    }

    @GetMapping("/personal")
    public ResponseEntity<Iterable<ThreadCompactProjection>> getPersonalThreads() {
        return ResponseEntity.ok(threadService.getPersonalThreads());
    }

    @PostMapping("/{threadId}/assess")
    public ResponseEntity<AssessmentDTO> assessThread(@PathVariable("threadId") int threadId, @RequestBody @Valid AssessmentRequest request) {
        return new ResponseEntity<>(threadService.assessThread(threadId, request), HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<ThreadDTO> createThread(@RequestBody @Valid ThreadRequest request) {
        return new ResponseEntity<>(threadService.createThread(request), HttpStatus.CREATED);
    }

    @PutMapping("/{threadId}")
    public ResponseEntity<ThreadDTO> updateThread(@PathVariable("threadId") int threadId, @RequestBody @Valid ThreadRequest request) {
        return new ResponseEntity<>(threadService.updateThread(threadId, request), HttpStatus.OK);
    }

    @PostMapping("/{threadId}/review")
    public ResponseEntity<HttpStatus> reviewSubmittedThread(
            @PathVariable("threadId") int threadId,
            @RequestBody @Valid ThreadFeedbackDTO request
    ) {
        threadService.reviewThread(threadId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Should let the system update status only to remain consistent.
//    @PutMapping("/{threadId}/status")
//    public ResponseEntity<ThreadDTO> updateThreadStatus(@PathVariable("threadId") int threadId, @RequestParam ThreadStatus status) {
//        return new ResponseEntity<>(threadService.updateThreadStatus(threadId, status), HttpStatus.OK);
//    }

    @PutMapping("/{threadId}/owner")
    public ResponseEntity<ThreadDTO> assignThreadOwner(
            @PathVariable("threadId") int threadId,
            @RequestParam int newOwnerId
    ) {
        return new ResponseEntity<>(threadService.assignRiskOwner(threadId, newOwnerId), HttpStatus.OK);
    }

    @DeleteMapping("{threadId}")
    public ResponseEntity<HttpStatus> deleteThread(@PathVariable("threadId") int threadId) {
        threadService.deleteThread(threadId);
        return ResponseEntity.noContent().build();
    }

}
