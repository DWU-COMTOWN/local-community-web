package com.example.backend.post;

import com.example.backend.config.RedisDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    @GetMapping("/post/{postId}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable("postId") Long postId, @RequestParam("userId") Long userId) {
        PostResponse post = postService.getPostById(postId, userId);
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/posts")
    public ResponseEntity<Page<PostListResponse>> getPostList(@RequestParam(value = "categoryId", required = false) Long categoryId, @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC)
    Pageable pageable, @RequestParam(value = "keyword", required = false) String keyword, @RequestParam(value = "best", required = false) String best) {
        Page<PostListResponse> postList = null;
        if (categoryId != null) { // category 안에서
            if (keyword == null) { // 키워드 검색 X
                postList = postService.getPostsByCategoryId(categoryId, pageable);
            } else { // 키워드 검색 O
                postList = postService.searchPostsByCategoryId(categoryId, keyword, pageable);
            }
        } else {
            if (best.equals("조회")) {
                postList = postService.getPostsByView(pageable);
            } else {
                // 홈 화면에서 키워드 검색
                postList = postService.searchPosts(keyword, pageable);
            }
        }
        return ResponseEntity.ok(postList);
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
