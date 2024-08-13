package com.example.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);

    boolean existsByuserId(String userId);
    Optional<User> findByuserId(String userId);
}