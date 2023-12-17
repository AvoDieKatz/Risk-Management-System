package com.example.rms.business.thread.comment;

import com.example.rms.business.thread.comment.dto.CommentRequest;
import com.example.rms.business.thread.comment.dto.CommentResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/thread/{threadId}/comment")
@RestController
public class CommentController {

    private final SimpMessagingTemplate messagingTemplate;

    private final CommentServiceImpl commentService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

//    @MessageMapping("/hello")
//    public void greeting(CommentRequest request) throws Exception {
//        Thread.sleep(1000); // simulated delay
////        messagingTemplate.convertAndSend("/topic/greetings", "You said " + request.content());
//        logger.info("GREET RUN");
//        messagingTemplate.convertAndSend("/topic/greetings", "HELLO");
//    }
//
//    @MessageMapping("/ws/thread/{threadId}/comment/submit")
//    public void handleComments(@DestinationVariable int threadId, CommentRequest request) {
//        CommentResponse savedComment = commentService.createComment(request, threadId);
//        messagingTemplate.convertAndSend("/ws/thread/"+ threadId + "/comment", savedComment);
//    }

    @GetMapping
    public ResponseEntity<Iterable<CommentResponse>> getThreadComments(
            @PathVariable("threadId") int threadId
    ) {
        return ResponseEntity.ok(commentService.getComments(threadId));
    }

    @PostMapping
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable("threadId") int threadId,
            @RequestBody @Valid CommentRequest request
    ) {
        return new ResponseEntity<>(commentService.createComment(request, threadId), HttpStatus.CREATED);
    }
}
