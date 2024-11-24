package com.example.backend.mypage.controller;

import com.example.backend.comment.CommentDto;
import com.example.backend.comment_like.CommentLikeDto;
import com.example.backend.mypage.service.MyPageService;
import com.example.backend.post.PostDto;
import com.example.backend.post_like.PostLikeDto;
import com.example.backend.post_scrap.PostScrapDto;
import com.example.backend.signLogin.JwtTokenUtil;
import com.example.backend.user.UserDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mypage")
public class MyPageController {

    private final MyPageService myPageService;

    public MyPageController(MyPageService myPageService) {
        this.myPageService = myPageService;
    }

    // 쿠키에서 JWT 토큰을 추출하는 헬퍼 메서드
    private String getUserIdFromCookie(HttpServletRequest request) {
        Optional<Cookie> jwtCookie = getJwtTokenFromCookies(request.getCookies());
        if (jwtCookie.isPresent()) {
            String token = jwtCookie.get().getValue();
            System.out.println("JWT Token: " + token); // 토큰이 제대로 넘어오는지 확인
            return JwtTokenUtil.getuserId(token); // userId를 String으로 반환
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

    @GetMapping("/user")
    public UserDto getUserInfo(HttpServletRequest request) {
        String userId = getUserIdFromCookie(request); // userId를 String으로 처리
        return myPageService.getUserById(userId);
    }

//    @GetMapping("/posts")
//    public List<PostDto> getPostsByUserId(HttpServletRequest request) {
//        String userId = getUserIdFromCookie(request); // userId를 String으로 처리
//        return myPageService.getPostsByUserId(userId);
//    }

    @GetMapping("/posts")
    public List<PostDto> getPostsByUserId(HttpServletRequest request,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "3") int size) {
    String userId = getUserIdFromCookie(request); // userId를 String으로 처리
    return myPageService.getPostsByUserId(userId, page, size);
    }

    @GetMapping("/comments")
    public List<PostDto> getCommentedPostsByUserId(HttpServletRequest request,
                                                   @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "3") int size) {
        String userId = getUserIdFromCookie(request); // userId를 String으로 처리
        return myPageService.getCommentedPostsByUserId(userId, page, size);
    }

    @GetMapping("/scraps")
    public List<PostScrapDto> getScrappedPostsByUserId(HttpServletRequest request,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "3") int size) {
        String userId = getUserIdFromCookie(request); // userId를 String으로 처리
        return myPageService.getScrappedPostsByUserId(userId, page, size);
    }

    @PutMapping("/user")
    public UserDto updateUser(HttpServletRequest request, @RequestBody UserDto userDto) {
        String userId = getUserIdFromCookie(request); // userId를 String으로 처리
        return myPageService.updateUser(userId, userDto);
    }

    @PutMapping("/user/profile-image")
    public ResponseEntity<String> updateProfileImage(HttpServletRequest request, @RequestPart(value = "profileImage") MultipartFile profileImage) {
        String userId = getUserIdFromCookie(request);
        String imageUrl = myPageService.updateProfileImage(userId, profileImage);
        return new ResponseEntity<>(imageUrl, HttpStatus.OK);
    }
}
