package com.example.backend.user.kakao.controller;

import com.example.backend.user.UserService;
import com.example.backend.user.kakao.dto.KakaoUserInfoResponseDto;
import com.example.backend.user.kakao.service.KakaoJwtService;
import com.example.backend.user.kakao.service.KakaoService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class KakaoLoginController {
    private final KakaoService kakaoService;
    private final UserService userService;
    private final KakaoJwtService kakaoJwtService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @GetMapping("/callback")
    public ResponseEntity<?> callback(@RequestParam("code") String code) throws IOException {
        String accessToken = kakaoService.getAccessTokenFromKakao(code);
        KakaoUserInfoResponseDto userInfo = kakaoService.getUserInfo(accessToken);

        if(!userService.checkKakaoUserExists(String.valueOf(userInfo.getId()))) {
            String jwtToken = kakaoJwtService.generateToken(String.valueOf(userInfo.getId()));
            URI redirectUri = URI.create(frontendUrl + "/jwt-login/join?token=" + jwtToken);
            return ResponseEntity.status(HttpStatus.FOUND).location(redirectUri).build();
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // jwt 해독 api
    @PostMapping("/jwt-decode")
    public ResponseEntity<?> decodeJwt(@RequestParam Map<String, String> request) {
        String token = request.get("token");
        if(token != null) {
            try {
                Claims claims = kakaoJwtService.decodeToken(token);
                String userId = claims.getSubject();
                return ResponseEntity.ok(Map.of("userId", userId));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token is missing");
        }
    }
}
