package com.example.backend.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
//home으로 가는 controller html파일 간단히 작성
    @GetMapping("/home")
    public String home() {
        return "home";
    }
}
