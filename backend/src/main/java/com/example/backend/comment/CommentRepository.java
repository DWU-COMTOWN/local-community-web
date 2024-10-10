package com.example.backend.comment;

import com.example.backend.post.Post;
import com.example.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdAndParentCommentIsNull(Long postId);
    List<Comment> findByParentCommentId(Long parentCommentId);
    List<Comment> findByPostId(Long postId);
    List<Comment> findByUser(User user);
    List<Comment> findByUserId(Long userId);
}
