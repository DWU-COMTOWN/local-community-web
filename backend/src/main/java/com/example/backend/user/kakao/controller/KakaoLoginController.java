package com.example.backend.user.kakao.controller;

import com.example.backend.user.UserService;
import com.example.backend.user.kakao.dto.KakaoUserInfoResponseDto;
import com.example.backend.user.kakao.service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class KakaoLoginController {
    private final KakaoService kakaoService;
    private final UserService userService;

    @GetMapping("/callback")
    public ResponseEntity<?> callback(@RequestParam("code") String code) throws IOException {
        String accessToken = kakaoService.getAccessTokenFromKakao(code);
        KakaoUserInfoResponseDto userInfo = kakaoService.getUserInfo(accessToken);

        if(!userService.checkKakaoUserExists(String.valueOf(userInfo.getId()))) {
            URI redirectUri = URI.create("/jwt-login/join");
            return ResponseEntity.status(HttpStatus.FOUND).location(redirectUri).build();
        }

        //System.out.println("유저 아이디: " + userInfo.getId());
        //System.out.println("카카오 계정: " + userInfo.getKakaoAccount());
        //System.out.println("연결시점: " + userInfo.getConnectedAt());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
