package com.example.backend.post;

import com.example.backend.signLogin.JwtTokenUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // 게시물 생성 메서드
    @PostMapping("/post/create")
    public ResponseEntity<PostResponse> createPost(HttpServletRequest request,
                                                   @RequestPart(value = "postRequest") String postRequestString,
                                                   @RequestPart(value = "imageFiles", required = false) List<MultipartFile> imageFiles) {
        try {
            Optional<Long> userIdOptional = getUserIdFromCookie(request);
            if (userIdOptional.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            Long userId = userIdOptional.get();

            ObjectMapper objectMapper = new ObjectMapper();
            PostRequest postRequest = objectMapper.readValue(postRequestString, PostRequest.class);
            postRequest.setUserId(userId);

            PostResponse createdPost = postService.createPost(postRequest, imageFiles);
            return new ResponseEntity<>(createdPost, HttpStatus.CREATED);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 게시물 상세 조회
    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getPostById(HttpServletRequest request, @PathVariable("postId") Long postId) {
        try {
            Optional<Long> userId = getUserIdFromCookie(request);
            PostResponse post = postService.getPostById(postId, userId.orElse(null)); // userId가 없을 경우 null로 처리
            if (post != null) {
                return new ResponseEntity<>(post, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("게시글을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("서버 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 게시물 목록 조회
    @GetMapping("/posts")
    public ResponseEntity<Page<PostListResponse>> getPostList(@RequestParam(value = "categoryId", required = false) Long categoryId,
                                                              @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC)
                                                              Pageable pageable,
                                                              @RequestParam(value = "keyword", required = false) String keyword) {
        Page<PostListResponse> postList;
        if (categoryId != null) { // 특정 카테고리
            postList = (keyword == null)
                    ? postService.getPostsByCategoryId(categoryId, pageable)
                    : postService.searchPostsByCategoryId(categoryId, keyword, pageable);
        } else { // 전체 또는 키워드 검색
            postList = postService.searchPosts(keyword, pageable);
        }
        return ResponseEntity.ok(postList);
    }

    // JWT 토큰에서 userId 추출
    private Optional<Long> getUserIdFromCookie(HttpServletRequest request) {
        Optional<Cookie> jwtCookie = getJwtTokenFromCookies(request.getCookies());
        if (jwtCookie.isPresent()) {
            String token = jwtCookie.get().getValue();
            if (!JwtTokenUtil.isExpired(token)) { // 토큰 유효성 확인
                return Optional.of(JwtTokenUtil.getId(token));
            }
        }
        return Optional.empty();
    }

    // 쿠키에서 JWT 토큰 쿠키 추출
    private Optional<Cookie> getJwtTokenFromCookies(Cookie[] cookies) {
        if (cookies == null) return Optional.empty();
        for (Cookie cookie : cookies) {
            if ("jwtToken".equals(cookie.getName())) {
                return Optional.of(cookie);
            }
        }
        return Optional.empty();
    }
}
