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

    // 인증 메서드: 유저 ID와 비밀번호로 인증
    public boolean authenticate(String userId, String password) {
        Optional<User> optionalUser = userRepository.findByuserId(userId);
        if (optionalUser.isEmpty()) {
            return false;
        }
        User user = optionalUser.get();
        return encoder.matches(password, user.getPassword());
    }

    // 유저 ID로 사용자 찾기
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // 유저 ID 중복 체크
    public boolean checkuserIdDuplicate(String userId) {
        return userRepository.existsByuserId(userId);
    }

    // 회원 가입 - 비밀번호 인코딩 없이
    public void join(JoinRequest req) {
        userRepository.save(req.toEntity());
    }

    // 회원 가입 - 비밀번호 인코딩 후 저장
    public void join2(JoinRequest req) {
        userRepository.save(req.toEntity(encoder.encode(req.getPassword())));
    }

    // 로그인 메서드
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

    // 유저 ID로 로그인한 사용자 정보 반환
    public User getLoginUser(Long userId) {
        return getLoginUserById(userId);
    }

    // 유저 ID로 로그인한 사용자 정보 반환 (Long 타입)
    public User getLoginUserById(Long userId) {
        if (userId == null) return null;
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElse(null);
    }

    // 유저 ID로 로그인한 사용자 정보 반환 (String 타입)
    public User getLoginUserByuserId(String userId) {
        if (userId == null) return null;
        Optional<User> optionalUser = userRepository.findByuserId(userId);
        return optionalUser.orElse(null);
    }
}
