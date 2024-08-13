package com.example.backend.post;

import com.example.backend.comment.CommentResponse;
import com.example.backend.post_image.PostImageResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PostResponse {
    private Long postId;
    private Long userId;
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

    public PostResponse(Long postId, Long userId, String nickname, String title, String content, int likeCount, int commentCount, int scrapCount, boolean isEdited, boolean isScrapped, boolean isLiked, LocalDateTime createdDate, LocalDateTime modifiedDate, List<CommentResponse> comments, List<PostImageResponse> images) {
        this.postId = postId;
        this.userId = userId;
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
    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public int getScrapCount() {
        return scrapCount;
    }

    public void setScrapCount(int scrapCount) {
        this.scrapCount = scrapCount;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public List<CommentResponse> getComments() {
        return comments;
    }

    public void setComments(List<CommentResponse> comments) {
        this.comments = comments;
    }

    public List<PostImageResponse> getImages() {
        return images;
    }

    public void setImages(List<PostImageResponse> images) {
        this.images = images;
    }

    public boolean isEdited() { return isEdited; }

    public void setEdited(boolean edited) { isEdited = edited; }
}
