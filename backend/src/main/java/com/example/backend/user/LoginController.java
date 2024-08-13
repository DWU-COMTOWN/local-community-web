package com.example.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {
//login 연결 contorller html과 연결되게 작성
    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @PostMapping("/login")
    public String processLogin(String userId, String password, Model model) {
        if (userService.authenticate(userId, password)) {
            // 로그인 성공 시
            return "redirect:/home";
        } else {
            // 로그인 실패 시
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }
}
