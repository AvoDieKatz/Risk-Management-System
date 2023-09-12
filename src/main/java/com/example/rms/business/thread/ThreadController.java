package com.example.rms.business.thread;

import com.example.rms.business.thread.dto.ThreadDTO;
import com.example.rms.business.thread.dto.ThreadCompactProjection;
import com.example.rms.business.thread.dto.ThreadRequest;
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

    @PostMapping
    public ResponseEntity<ThreadDTO> createThread(@RequestBody ThreadRequest request) {
        return new ResponseEntity<>(threadService.createThread(request), HttpStatus.CREATED);
    }

    @PutMapping("{threadId}")
    public ResponseEntity<ThreadDTO> updateThread(@PathVariable("threadId") int threadId, @RequestBody ThreadRequest request) {
        return new ResponseEntity<>(threadService.updateThread(threadId, request), HttpStatus.OK);
    }

//    @DeleteMapping("{threadId}")
//    public ResponseEntity<HttpStatus> deleteThread(@PathVariable("threadId") Integer threadId) {
//        threadService.deleteThread(threadId);
//        return ResponseEntity.noContent().build();
//    }

}
