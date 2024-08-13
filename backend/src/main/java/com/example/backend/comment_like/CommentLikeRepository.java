package com.example.backend.comment_like;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    List<CommentLike> findByCommentId(Long postId);
    Optional<CommentLike> findByUserIdAndCommentId(Long userId, Long commentId);
}
