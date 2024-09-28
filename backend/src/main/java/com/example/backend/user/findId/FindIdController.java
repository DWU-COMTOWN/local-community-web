package com.example.backend.user.findId;

import com.example.backend.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/jwt-login")
public class FindIdController {
    private final UserService userService;

    public FindIdController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/check-phone")
    public Map<String, Object> checkPhoneNumber(@RequestParam(name = "phone") String phone) {
        Map<String, Object> response = new HashMap<>();

        if(userService.checkUserPhoneExists(phone)) {
            response.put("success", true);
            response.put("message", "인증번호가 카카오톡으로 전송되었습니다.");
        } else {
            response.put("success", false);
            response.put("message", "존재하지 않는 휴대폰 번호입니다.");
        }

        return response;
    }

}
