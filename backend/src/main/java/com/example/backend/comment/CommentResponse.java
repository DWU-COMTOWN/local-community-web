package com.example.backend.comment;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.List;
public class CommentResponse {
    private Long commentId;
    private Long userId;
    private Long postId;
    private Long parentId;
    private List<CommentResponse> children;
    private String nickname;
    private String content;
    private int likeCount;
    @JsonProperty("isDeleted")
    private boolean isDeleted;
    @JsonProperty("isEdited")
    private boolean isEdited;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime createdDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime  modifiedDate;

    public CommentResponse(Long commentId, Long userId, Long postId, Long parentId, List<CommentResponse> children, String nickname, String content, int likeCount, boolean isDeleted, boolean isEdited, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.commentId = commentId;
        this.userId = userId;
        this.postId = postId;
        this.parentId = parentId;
        this.children = children;
        this.nickname = nickname;
        this.content = content;
        this.likeCount = likeCount;
        this.isDeleted = isDeleted;
        this.isEdited = isEdited;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public static CommentResponse toDto(Comment comment, List<CommentResponse> children) {
        return new CommentResponse(
                comment.getId(),
                comment.getUser().getId(),
                comment.getPost().getId(),
                comment.getParentComment() != null ? comment.getParentComment().getId() : null,
                children,
                comment.getUser().getNickname(),
                comment.getContent(),
                comment.getCommentLikes().size(),
                comment.isDeleted(),
                comment.isEdited(),
                comment.getCreatedDate(),
                comment.getModifiedDate()
        );
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public List<CommentResponse> getChildren() {
        return children;
    }

    public void setChildren(List<CommentResponse> children) {
        this.children = children;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
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

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public boolean isEdited() {
        return isEdited;
    }

    public void setEdited(boolean edited) {
        isEdited = edited;
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
}
