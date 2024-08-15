package com.example.backend.post;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    //게시글 관련 repository
    Page<Post> findByCategoryIdOrderByIdDesc(Long categoryId, Pageable pageable);
    Page<Post> findByCategoryId(Long categoryId, Pageable pageable);
    //Page<Post> findByCategoryIdAndTitleContainingAndContentContaining(Long categoryId, String keyword, Pageable pageable);
}
