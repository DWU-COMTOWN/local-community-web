package com.example.backend.signLogin;
import com.example.backend.user.User;
import com.example.backend.user.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/jwt-login")
public class JwtLoginController {

    private final UserService userService;

    @GetMapping("/")
    public String home(Authentication auth) {
        if(auth != null) {
            User loginUser = userService.getLoginUserByuserId(auth.getName());
        }
        return "Jwt Token 화면 로그인";
    }

    @GetMapping("/join")
    public String joinPage() {
        return "Jwt Token 화면 로그인";
    }

    @PostMapping("/join")
    public String join(@Valid @RequestBody JoinRequest joinRequest, BindingResult bindingResult) {
        // userId 중복 체크
        if(!isKakaoLogin(joinRequest) && userService.checkuserIdDuplicate(joinRequest.getUserId())) {
            bindingResult.addError(new FieldError("joinRequest", "userId", "로그인 아이디가 중복됩니다.")); // 여기선 빼도 될것같은데??
        }

        // password와 passwordCheck가 같은지 체크
        if(!isKakaoLogin(joinRequest) && !joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            bindingResult.addError(new FieldError("joinRequest", "passwordCheck", "비밀번호가 일치하지 않습니다."));
        }

        if (bindingResult.hasErrors()) {
            System.out.println("회원가입 실패. 에러 목록:");
            bindingResult.getAllErrors().forEach(error -> {
                System.out.println(error.toString());
            });
            return "회원가입 실패";
        }

        userService.join2(joinRequest);
        return "회원가입 성공";
    }

    private boolean isKakaoLogin(JoinRequest joinRequest) {
        return joinRequest.getKakaoUser() != null && !joinRequest.getKakaoUser().isEmpty();
    }

    @GetMapping("/check-id")
    public Map<String, Object> checkId(@RequestParam(name = "userId") String userId) {
        Map<String, Object> response = new HashMap<>();

        if(userService.checkuserIdDuplicate(userId)) {
            response.put("success", false);
            response.put("message", "이미 존재하는 아이디입니다.");
        } else {
            response.put("success", true);
            response.put("message", "사용 가능한 아이디입니다.");
        }

        return response;
    }

    @GetMapping("/check-kakaouser")
    public Map<String, Object> checkKakaoUser(@RequestParam(name = "kakaoUser") String kakaoUser) {
        Map<String, Object> response = new HashMap<>();

        if(userService.checkKakaoUserExists(kakaoUser)) {
            response.put("success", true);
            response.put("message", "존재하지 않는 회원입니다.");
        } else {
            response.put("success", false);
            response.put("message", "로그인 성공");
        }

        return response;
    }

    @GetMapping("/login")
    public String loginPage() {
        return "Jwt Token 화면 로그인";
    }

    @PostMapping("/login")public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, BindingResult bindingResult,
                                                              HttpServletResponse response) {

        User user = userService.login(loginRequest);

        if (user == null) {
            bindingResult.reject("loginFail", "로그인 아이디 또는 비밀번호가 틀렸습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }

        long expireTimeMs = 1000 * 60 * 60; // Token 유효 시간 = 60분
        String jwtToken = JwtTokenUtil.createToken(user.getUserId(), expireTimeMs);

        Cookie cookie = new Cookie("jwtToken", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setMaxAge((int) (expireTimeMs / 1000));
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok("로그인 성공");
    }

    @GetMapping("/logout")
    public String logout(HttpServletResponse response) {
        // 쿠키 파기
        Cookie cookie = new Cookie("jwtToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);

        return "로그아웃 성공";
    }

    @GetMapping("/info")
    public User userInfo(Authentication auth) {
        return userService.getLoginUserByuserId(auth.getName());
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "Jwt Token 화면 로그인";
    }

    @GetMapping("/authentication-fail")
    public String authenticationFail() {
        return "인증 실패";
    }

    @GetMapping("/authorization-fail")
    public String authorizationFail() {
        return "권한 실패";
    }
}