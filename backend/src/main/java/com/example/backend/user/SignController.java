package com.example.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class SignController {
 //signup html과 연결
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/signup")
    public String showSignupForm(Model model) {
        model.addAttribute("user", new User());
        return "signup";
    }

    @PostMapping("/signup")
    public String processSignup(User user) {
        // 사용자 정보 저장
        userRepository.save(user);
        return "redirect:/signup-success";
    }

    @GetMapping("/signup-success")
    public String showSignupSuccessPage() {
        return "signup-success";
    }
}
