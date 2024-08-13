package com.example.backend.post_scrap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostScrapController {
    @Autowired
    private PostScrapService postScrapService;

    @GetMapping("post/{postId}/scraps")
    public int getScrapCountByPostId(@PathVariable("postId") Long postId) {
        return postScrapService.getScrapCountByPostId(postId);
    }

    @PostMapping("/post/scrap")
    public ResponseEntity<String> scrapPost(@RequestBody PostScrapRequest request) {
        try {
            postScrapService.scrapPost(request.getUserId(), request.getPostId());
            return ResponseEntity.ok("스크랩 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("스크랩 실패: " + e.getMessage());
        }
    }

    @PostMapping("/post/unscrap")
    public ResponseEntity<String> unscrapPost(@RequestBody PostScrapRequest request) {
        try {
            postScrapService.unscrapPost(request.getUserId(), request.getPostId());
            return ResponseEntity.ok("스크랩 취소 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("스크랩 취소 실패: " + e.getMessage());
        }
    }
}
