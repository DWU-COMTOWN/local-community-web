package com.example.backend.post_like;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostLikeController {
    @Autowired
    private PostLikeService postLikeService;

    @PostMapping("/post/like")
    public void likePost(@RequestBody PostLikeRequest postLikeRequest) {
        postLikeService.likePost(postLikeRequest.getUserId(), postLikeRequest.getPostId());
    }
}
