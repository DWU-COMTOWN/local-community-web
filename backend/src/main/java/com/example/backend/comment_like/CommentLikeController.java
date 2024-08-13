package com.example.backend.comment_like;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentLikeController {
    @Autowired
    private CommentLikeService commentLikeService;

    @GetMapping("/comment/{commentId}/isLiked")
    public boolean getLikeCountByPostId(@PathVariable("commentId") Long commentId, @RequestParam("userId") Long userId) {
        return commentLikeService.isLiked(userId, commentId);
    }

    @GetMapping("/comment/{commentId}/likes")
    public int getLikeCountByPostId(@PathVariable("commentId") Long commentId) {
        return commentLikeService.getLikeCountByCommentId(commentId).size();
    }

    @PostMapping("/comment/like")
    public void likeComment(@RequestBody CommentLikeRequest commentLikeRequest) {
        commentLikeService.likeComment(commentLikeRequest.getUserId(), commentLikeRequest.getCommentId());
    }
}
