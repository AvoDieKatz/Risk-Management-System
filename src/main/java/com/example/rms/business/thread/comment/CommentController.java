package com.example.rms.business.thread.comment;

import com.example.rms.business.thread.comment.dto.CommentRequest;
import com.example.rms.business.thread.comment.dto.CommentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/thread/{threadId}/comment")
public class CommentController {

    private final CommentServiceImpl commentService;

    @GetMapping
    public ResponseEntity<Iterable<CommentResponse>> getThreadComments(
            @PathVariable("threadId") int threadId
    ) {
        return ResponseEntity.ok(commentService.getComments(threadId));
    }

    @PostMapping
    public ResponseEntity<CommentResponse> createComment(
            @RequestBody CommentRequest request
    ) {
        return new ResponseEntity<>(commentService.createComment(request), HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<HttpStatus> deleteComment(
            @PathVariable("threadId") int threadId,
            @PathVariable("commentId") int commentId
    ) {
        commentService.deleteComment(threadId, commentId);
        return ResponseEntity.noContent().build();
    }
}
