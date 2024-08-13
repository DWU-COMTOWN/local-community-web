package com.example.backend.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping("/post/create")
    public ResponseEntity<PostResponse> createPost(@RequestPart(value = "postRequest") PostRequest postRequest,
                                           @RequestPart(value = "imageFiles", required = false) List<MultipartFile> imageFiles) {
        try {
            PostResponse createdPost = postService.createPost(postRequest, imageFiles);
            return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @GetMapping("/post/{postId}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable("postId") Long postId, @RequestParam("userId") Long userId) {
        PostResponse post = postService.getPostById(postId, userId);
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 카테고리에 해당하는 포스트 목록
    @GetMapping("/posts/{categoryId}")
    public ResponseEntity<Page<PostListResponse>> getPostsByCategoryId(@PathVariable("categoryId") Long categoryId, @RequestParam(name = "page", defaultValue = "0") int page) {
        int size = 5; // 페이지 당 포스트 수
        Pageable pageable = PageRequest.of(page, size);
        Page<PostListResponse> posts = postService.getPostsByCategoryId(categoryId, pageable);
        return ResponseEntity.ok(posts);
    }

    @PutMapping("/post/{postId}/edit")
    public Long editPostById(@PathVariable("postId") Long postId, @RequestPart(value = "postEditRequest") PostEditRequest postEditRequest, @RequestPart(value = "imageFiles", required = false) List<MultipartFile> imageFiles) throws Exception {
        return postService.update(postId, postEditRequest, imageFiles);
    }

    @DeleteMapping("/post/{postId}/delete")
    public void deletePostById(@PathVariable("postId") Long postId) throws Exception {
        postService.delete(postId);
    }
}
