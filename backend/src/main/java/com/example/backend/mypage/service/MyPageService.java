package com.example.backend.mypage.service;

import com.example.backend.comment.Comment;
import com.example.backend.comment.CommentDto;
import com.example.backend.comment.CommentRepository;
import com.example.backend.comment_like.CommentLike;
import com.example.backend.comment_like.CommentLikeDto;
import com.example.backend.comment_like.CommentLikeRepository;
import com.example.backend.config.S3Service;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MyPageService {

    private final PostLikeRepository postLikeRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final PostScrapRepository postScrapRepository;

    private final S3Service s3Service;

    @Value("${default.profile.image.url}")
    private String defaultProfileImageUrl;

    @Autowired
    public MyPageService(PostLikeRepository postLikeRepository, CommentLikeRepository commentLikeRepository, UserRepository userRepository, PostRepository postRepository, CommentRepository commentRepository, PostScrapRepository postScrapRepository, S3Service s3Service) {
        this.postLikeRepository = postLikeRepository;
        this.commentLikeRepository = commentLikeRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.postScrapRepository = postScrapRepository;
        this.s3Service = s3Service;
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
        user.setProfile_url(userDto.getProfile_url());

        userRepository.save(user);
        return convertToDto(user);
    }

    // 프로필 이미지 업데이트
    public String updateProfileImage(String userId, MultipartFile profileImage) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));

        try {

            String existingProfileUrl = user.getProfile_url();

            // 기존 프로필 이미지가 기본 이미지가 아니면 삭제
            if (existingProfileUrl != null && !existingProfileUrl.equals(defaultProfileImageUrl)) {
                try {
                    // 기존 URL에서 전체 파일 경로를 추출하여 S3에서 삭제
                    String existingFilePath = existingProfileUrl.substring(existingProfileUrl.indexOf("mypage/"));
                    s3Service.deleteFile(existingFilePath);
                } catch (Exception e) {
                    System.err.println("Failed to delete previous profile image from S3: " + e.getMessage());
                }
            }

            // 사용자 ID를 포함한 고정된 이미지 파일 이름 생성
            String newFileName = "mypage/" + UUID.randomUUID();
            String imageUrl = s3Service.upload(profileImage, newFileName);

            // 새로운 이미지 URL로 업데이트
            user.setProfile_url(imageUrl);
            userRepository.save(user);
            return imageUrl;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile image", e);
        }
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setUsername(user.getUsername());
        userDto.setAddress(user.getAddress());
        userDto.setPhone(user.getPhone());
        userDto.setEmail(user.getEmail());
        userDto.setNickname(user.getNickname());
        userDto.setProfile_url(user.getProfile_url());
        return userDto;
    }



    //본인이 작성한 글 불러오기
//    public List<PostDto> getPostsByUserId(String userId) {
//        User user = userRepository.findByUserId(userId)
//                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));
//        return postRepository.findByUser(user)
//                .stream()
//                .map(post -> new PostDto(
//                        post.getId(),
//                        post.getTitle(),
//                        post.getContent(),
//                        post.getCreatedDate(),
//                        post.getModifiedDate(),
//                        post.getUser().getUsername(),
//                        post.getComments().size()
//                ))
//                .collect(Collectors.toList());
//    }
    // 본인이 작성한 글 불러오기 (페이징 추가)
    public List<PostDto> getPostsByUserId(String userId, int page, int size) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));

        return postRepository.findByUser(user, PageRequest.of(page, size))
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
    // 본인이 댓글을 단 게시글 가져오기
    public List<PostDto> getCommentedPostsByUserId(String userId, int page, int size) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));

        List<Comment> comments = commentRepository.findByUser(user, PageRequest.of(page, size)).getContent();

        return comments.stream()
                .map(Comment::getPost) // 댓글의 게시글 추출
                .distinct() // 중복 게시글 제거
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
    public List<PostScrapDto> getScrappedPostsByUserId(String userId, int page, int size) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));

        return postScrapRepository.findByUser(user, PageRequest.of(page, size)).getContent()
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
