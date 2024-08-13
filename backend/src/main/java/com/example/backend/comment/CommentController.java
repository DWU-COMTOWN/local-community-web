package com.example.backend.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/comment/create")
    public ResponseEntity<CommentResponse> createComment(@RequestBody CommentRequest commentRequest) {
        try{
            CommentResponse createComment = commentService.createComment(commentRequest);
            return new ResponseEntity<>(createComment, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/comment/{commentId}/edit")
    public Long editComment(@PathVariable("commentId") Long commentId, @RequestBody CommentEditRequest editRequest) {
        return commentService.editComment(commentId, editRequest);
    }

    @DeleteMapping("/comment/{commentId}/delete")
    public void deleteComment(@PathVariable("commentId") Long commentId) {
        commentService.deleteComment(commentId);
    }

}
