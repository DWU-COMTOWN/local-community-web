package com.example.backend.mypage.service;

import com.example.backend.comment.Comment;
import com.example.backend.comment.CommentDto;
import com.example.backend.comment.CommentRepository;
import com.example.backend.comment_like.CommentLike;
import com.example.backend.comment_like.CommentLikeDto;
import com.example.backend.comment_like.CommentLikeRepository;
import com.example.backend.post.Post;
import com.example.backend.post.PostDto;
import com.example.backend.post.PostRepository;
import com.example.backend.post_like.PostLike;
import com.example.backend.post_like.PostLikeDto;
import com.example.backend.post_like.PostLikeRepository;
import com.example.backend.post_scrap.PostScrap;
import com.example.backend.post_scrap.PostScrapDto;
import com.example.backend.post_scrap.PostScrapRepository;
import com.example.backend.user.User;
import com.example.backend.user.UserDto;
import com.example.backend.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MyPageService {

    private final PostLikeRepository postLikeRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final PostScrapRepository postScrapRepository;

    public MyPageService(PostLikeRepository postLikeRepository, CommentLikeRepository commentLikeRepository, UserRepository userRepository, PostRepository postRepository, CommentRepository commentRepository, PostScrapRepository postScrapRepository) {
        this.postLikeRepository = postLikeRepository;
        this.commentLikeRepository = commentLikeRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.postScrapRepository = postScrapRepository;
    }

    //User 정보 불러오기
    public UserDto getUserById(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));
        return convertToDto(user);
    }

    //User 정보 수정하기
    public UserDto updateUser(String userId, UserDto userDto) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));

        user.setUsername(userDto.getUsername());
        user.setAddress(userDto.getAddress());
        user.setPhone(userDto.getPhone());
        user.setEmail(userDto.getEmail());
        user.setNickname(userDto.getNickname());

        userRepository.save(user);
        return convertToDto(user);
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setUsername(user.getUsername());
        userDto.setAddress(user.getAddress());
        userDto.setPhone(user.getPhone());
        userDto.setEmail(user.getEmail());
        userDto.setNickname(user.getNickname());
        return userDto;
    }



    //본인이 작성한 글 불러오기
    public List<PostDto> getPostsByUserId(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));
        return postRepository.findByUser(user)
                .stream()
                .map(post -> new PostDto(
                        post.getId(),
                        post.getTitle(),
                        post.getContent(),
                        post.getCreatedDate(),
                        post.getModifiedDate(),
                        post.getUser().getUsername(),
                        post.getComments().size()
                ))
                .collect(Collectors.toList());
    }

    //본인이 작성한 댓글 불러오기
    public List<CommentDto> getCommentsByUserId(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));
        return commentRepository.findByUser(user)
                .stream()
                .map(comment -> new CommentDto(
                        comment.getId(),
                        comment.getContent(),
                        comment.getCreatedDate(),
                        comment.getUser().getUsername()
                ))
                .collect(Collectors.toList());
    }

    //본인이 작성한 댓글이 달린 글 불러오기
    public List<PostDto> getCommentedPostsByUserId(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));
        List<Comment> comments = commentRepository.findByUser(user);

        return comments.stream()
                .map(comment -> comment.getPost())
                .distinct()
                .map(post -> new PostDto(
                        post.getId(),
                        post.getTitle(),
                        post.getContent(),
                        post.getCreatedDate(),
                        post.getModifiedDate(),
                        post.getUser().getUsername(),
                        post.getComments().size()
                ))
                .collect(Collectors.toList());
    }

    //본인이 스크랩한 글 불러오기
    public List<PostScrapDto> getScrappedPostsByUserId(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));
        return postScrapRepository.findByUser(user)
                .stream()
                .map(postScrap -> new PostScrapDto(
                        postScrap.getPost().getId(),
                        postScrap.getPost().getTitle(),
                        postScrap.getPost().getContent(),
                        postScrap.getPost().getCreatedDate(),
                        postScrap.getPost().getModifiedDate(),
                        postScrap.getPost().getUser().getUsername()
                ))
                .collect(Collectors.toList());
    }
}
