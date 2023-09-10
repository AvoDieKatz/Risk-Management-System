package com.example.rms.business.thread;

import com.example.rms.business.thread.request.CreateThreadRequest;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/thread")
@RequiredArgsConstructor
public class ThreadController {

    private final ThreadService threadService;

    @GetMapping("/all")
    public ResponseEntity<Iterable<Thread>> getAllThreads() {
        return null;
    }

    @GetMapping("/{threadId}")
    public ResponseEntity<Thread> getThreadDetail(@PathVariable("threadId") Integer threadId) {
        return null;
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Thread> createThread(@RequestBody CreateThreadRequest request) {
        return new ResponseEntity<>(threadService.createThread(request), HttpStatus.CREATED);
    }


}
