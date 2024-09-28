package com.example.backend.user;
import com.example.backend.signLogin.JoinRequest;
import com.example.backend.signLogin.LoginRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public boolean authenticate(String userId, String password) {
        User user = userRepository.findByUserId(userId);
        return user != null && encoder.matches(password, user.getPassword());
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public boolean checkuserIdDuplicate(String userId) {
        return userRepository.existsByuserId(userId);
    }

    public boolean checkKakaoUserExists(String kakaoUserId) {
        return userRepository.existsByuserId(kakaoUserId);
    }

    public boolean checkUserPhoneExists(String phone) {
        return userRepository.existsByPhone(phone);
    }

    public void join(JoinRequest req) {
        userRepository.save(req.toEntity());
    }

    public void join2(JoinRequest req) {
        userRepository.save(req.toEntity(encoder.encode(req.getPassword())));
    }

    public User login(LoginRequest req) {
        Optional<User> optionalUser = userRepository.findByuserId(req.getUserId());

        if (optionalUser.isEmpty()) {
            System.out.println("Login ID not found");
            return null;
        }

        User user = optionalUser.get();
        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            System.out.println("Password does not match");
            return null;
        }

        return user;
    }

    public User getLoginUser(Long userId) {
        return getLoginUserById(userId);
    }

    public User getLoginUserById(Long userId) {
        if (userId == null) return null;
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElse(null);
    }

    public User getLoginUserByuserId(String userId) {
        if (userId == null) return null;
        Optional<User> optionalUser = userRepository.findByuserId(userId);
        return optionalUser.orElse(null);
    }
}