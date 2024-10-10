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
        if(userService.checkuserIdDuplicate(joinRequest.getUserId())) {
            bindingResult.addError(new FieldError("joinRequest", "userId", "로그인 아이디가 중복됩니다."));
        }

        // password와 passwordCheck가 같은지 체크
        if(!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            bindingResult.addError(new FieldError("joinRequest", "passwordCheck", "비밀번호가 일치하지 않습니다."));
        }

        if(bindingResult.hasErrors()) {
            return "회원가입 실패";
        }

        userService.join2(joinRequest);
        return "회원가입 성공";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "Jwt Token 화면 로그인";
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, BindingResult bindingResult,
//                                        HttpServletResponse response) {
//
//        User user = userService.login(loginRequest);
//
//        if (user == null) {
//            bindingResult.reject("loginFail", "로그인 아이디 또는 비밀번호가 틀렸습니다.");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .header("Content-Type", "text/plain; charset=UTF-8")
//                    .body("로그인 실패");
//        }
//
//        long expireTimeMs = 1000 * 60 * 60; // Token 유효 시간 = 60분
//        String jwtToken = JwtTokenUtil.createToken(user.getUserId(), expireTimeMs);
//
//        Cookie cookie = new Cookie("jwtToken", jwtToken);
//        cookie.setHttpOnly(true);
//        cookie.setMaxAge((int) (expireTimeMs / 1000));
//        cookie.setPath("/");
//        response.addCookie(cookie);
//
//        return ResponseEntity.ok()
//                .header("Content-Type", "text/plain; charset=UTF-8")
//                .body("로그인 성공");
//    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        User user = userService.login(loginRequest);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }

        long expireTimeMs = 1000 * 60 * 60; // 60분 유효
        String jwtToken = JwtTokenUtil.createToken(user.getUserId(), user.getId(), expireTimeMs);  // userId 기반으로 토큰 생성

        // 로그 추가 - 로그인된 사용자 userId 확인
        System.out.println("Logged in userId: " + user.getUserId());

        // 쿠키에 JWT 토큰 저장
        Cookie cookie = new Cookie("jwtToken", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setMaxAge((int) (expireTimeMs / 1000)); // 쿠키 만료 시간 설정
        cookie.setPath("/");
        response.addCookie(cookie);

        // 캐시 비활성화 헤더 설정
        response.addCookie(cookie);
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);

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