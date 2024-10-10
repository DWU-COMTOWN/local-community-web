package com.example.backend.post;

import com.example.backend.config.RedisDao;
import com.example.backend.signLogin.JwtTokenUtil;
import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
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
import java.util.Optional;

@RestController
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;
//원본 코드
//    @PostMapping("/post/create")
//    public ResponseEntity<PostResponse> createPost(@RequestPart(value = "postRequest") PostRequest postRequest,
//                                           @RequestPart(value = "imageFiles", required = false) List<MultipartFile> imageFiles) {
//        try {
//            PostResponse createdPost = postService.createPost(postRequest, imageFiles);
//            return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
//        } catch (IllegalArgumentException e) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        } catch (IOException e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


    // token값 반영, postMapping성공
    // 게시글 생성 메서드
    @PostMapping("/post/create")
    public ResponseEntity<PostResponse> createPost(HttpServletRequest request,
                                                   @RequestPart(value = "postRequest") String postRequestString,
                                                   @RequestPart(value = "imageFiles", required = false) List<MultipartFile> imageFiles) {
        try {
            //jwtToken으로부터 id(PK)를 뽑아내기
            Long id = getUserIdFromCookie(request);

            // 이건 postman에서 작동하도록 추가한 코드입니다.
            ObjectMapper objectMapper = new ObjectMapper();
            PostRequest postRequest = objectMapper.readValue(postRequestString, PostRequest.class);

            // Set the userTableId in the post request
            postRequest.setUserId(id); // This sets the userTableId (e.g., 8)

            // all the PostService to create the post
            PostResponse createdPost = postService.createPost(postRequest, imageFiles);

            // Success response
            return new ResponseEntity<>(createdPost, HttpStatus.CREATED);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/post/{postId}")
    public ResponseEntity<PostResponse> getPostById(HttpServletRequest request, @PathVariable("postId") Long postId) {
        Long id = getUserIdFromCookie(request);
        PostResponse post = postService.getPostById(postId, id);
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/posts")
    public ResponseEntity<Page<PostListResponse>> getPostList(@RequestParam(value = "categoryId", required = false) Long categoryId, @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC)
    Pageable pageable, @RequestParam(value = "keyword", required = false) String keyword) {
        Page<PostListResponse> postList = null;
        if (categoryId != null) { // category 안에서
            if (keyword == null) { // 키워드 검색 X
                postList = postService.getPostsByCategoryId(categoryId, pageable);
            } else { // 키워드 검색 O
                postList = postService.searchPostsByCategoryId(categoryId, keyword, pageable);
            }
        } else {
            // 홈 화면에서 키워드 검색
            postList = postService.searchPosts(keyword, pageable);
        }
        return ResponseEntity.ok(postList);
    }
    @GetMapping("/posts/best")
    public ResponseEntity<List<PostListResponse>> getPostList(@RequestParam(value = "name") String name) {
        List<PostListResponse> postList = null;
        if (name.equals("조회")) {
            postList = postService.getPostsByView();
        } else if (name.equals("추천")) {
            postList = postService.getPostsByLikeCount();
        } else if (name.equals("댓글")) {
            postList = postService.getPostsByCommentCount();
        }
        return ResponseEntity.ok(postList);
    }
    @PutMapping("/post/{postId}")
    public Long editPostById(@PathVariable("postId") Long postId, @RequestPart(value = "postEditRequest") String postEditRequestString, @RequestPart(value = "imageFiles", required = false) List<MultipartFile> imageFiles) throws Exception {
        // 이건 postman에서 작동하도록 추가한 코드입니다.
        ObjectMapper objectMapper = new ObjectMapper();
        PostEditRequest postEditRequest = objectMapper.readValue(postEditRequestString, PostEditRequest.class);
        return postService.update(postId, postEditRequest, imageFiles);
    }
    @DeleteMapping(value="/post/{postId}", produces="application/json; charset=utf-8")
    public ResponseEntity<String> deletePostById(@PathVariable("postId") Long postId) throws Exception {
        postService.delete(postId);
        return ResponseEntity.ok("게시글 삭제 성공");
    }

    // JWT 토큰을 통해 userId를 쿠키에서 추출하는 메서드
    private Long getUserIdFromCookie(HttpServletRequest request) {
        Optional<Cookie> jwtCookie = getJwtTokenFromCookies(request.getCookies());
        if (jwtCookie.isPresent()) {
            String token = jwtCookie.get().getValue();
            return JwtTokenUtil.getId(token); // JWT 토큰에서 loginId 추출 (e.g., "user777")
        } else {
            throw new IllegalArgumentException("JWT 토큰이 없습니다.");
        }
    }

    // 쿠키 배열에서 JWT 토큰 쿠키를 찾아 반환하는 메서드
    private Optional<Cookie> getJwtTokenFromCookies(Cookie[] cookies) {
        if (cookies == null) return Optional.empty();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("jwtToken")) {
                return Optional.of(cookie);
            }
        }
        return Optional.empty();
    }
}
