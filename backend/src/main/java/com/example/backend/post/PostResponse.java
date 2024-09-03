package com.example.backend.post;

import com.example.backend.comment.CommentResponse;
import com.example.backend.post_image.PostImageResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PostResponse {
    private Long postId;
    private Long userId;
    private Long categoryId;
    private String nickname;
    private String title;
    private String content;
    private int likeCount;
    private int commentCount;
    private int scrapCount;
    @JsonProperty("isEdited")
    private boolean isEdited;
    @JsonProperty("isScrapped")
    private boolean isScrapped;
    @JsonProperty("isLiked")
    private boolean isLiked;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime createdDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime  modifiedDate;
    private List<CommentResponse> comments = new ArrayList<>();
    private List<PostImageResponse> images = new ArrayList<>();

    public PostResponse(Long postId, Long userId, Long categoryId, String nickname, String title, String content, int likeCount, int commentCount, int scrapCount, boolean isEdited, boolean isScrapped, boolean isLiked, LocalDateTime createdDate, LocalDateTime modifiedDate, List<CommentResponse> comments, List<PostImageResponse> images) {
        this.postId = postId;
        this.userId = userId;
        this.categoryId = categoryId;
        this.nickname = nickname;
        this.title = title;
        this.content = content;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.scrapCount = scrapCount;
        this.isEdited = isEdited;
        this.isScrapped = isScrapped;
        this.isLiked = isLiked;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.comments = comments;
        this.images = images;

    }

    public static PostResponse toDto(Post post, boolean isScrapped, boolean isLiked, List<CommentResponse> comments, List<PostImageResponse> images) {
        return new PostResponse(
                post.getId(),
                post.getUser().getId(),
                post.getCategory().getId(),
                post.getUser().getNickname(),
                post.getTitle(),
                post.getContent(),
                post.getPostLikes().size(),
                post.getComments().size(),
                post.getPostScraps().size(),
                post.isEdited(),
                isScrapped,
                isLiked,
                post.getCreatedDate(),
                post.getModifiedDate(),
                comments,
                images
        );
    }
}
