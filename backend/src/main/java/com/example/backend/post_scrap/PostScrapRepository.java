package com.example.backend.post_scrap;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostScrapRepository extends JpaRepository<PostScrap, Long> {
    List<PostScrap> findByPostId(Long postId);

    Optional<PostScrap> findByUserIdAndPostId(Long userId, Long postId);
    @Transactional
    void deleteByUserIdAndPostId(Long userId, Long postId);
}
