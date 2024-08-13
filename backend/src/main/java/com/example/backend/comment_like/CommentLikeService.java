package com.example.backend.comment_like;

import com.example.backend.comment.Comment;
import com.example.backend.comment.CommentRepository;

import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentLikeService {
    @Autowired
    private CommentLikeRepository commentLikeRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;


    public List<CommentLike> getLikeCountByCommentId(Long commentId) {
        return commentLikeRepository.findByCommentId(commentId);
    }
    public void likeComment(Long userId, Long commentId) {
        //임시 설정
        User user = userRepository.findById(1L).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("Invalid comment ID"));

        CommentLike commentLike = new CommentLike(user, comment);
        commentLikeRepository.save(commentLike);
    }
    public boolean isLiked(Long userId, Long commentId) {
        return commentLikeRepository.findByUserIdAndCommentId(userId, commentId).isPresent();
    }
}
