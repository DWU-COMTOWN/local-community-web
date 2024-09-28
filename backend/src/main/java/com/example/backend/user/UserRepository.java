package com.example.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);
    User findByPhone(String phone);

    boolean existsByuserId(String userId);
    boolean existsByKakaoUser(String kakaoUser);
    boolean existsByPhone(String phone);
    Optional<User> findByuserId(String userId);
}