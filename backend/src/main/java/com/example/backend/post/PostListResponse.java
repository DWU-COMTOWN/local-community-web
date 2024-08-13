package com.example.backend.post;

public class PostListResponse {
    private Long postId;
    private String nickname;
    private String title;
    private String content;
    private int likeCount;
    private int commentCount;

    public PostListResponse(Long postId, String title, String nickname, String content, int likeCount, int commentCount) {
        this.postId = postId;
        this.title = title;
        this.nickname = nickname;
        this.content = content;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
    }

    public static PostListResponse toDto(Post post) {
        return new PostListResponse(
                post.getId(),
                post.getTitle(),
                post.getUser().getNickname(),
                post.getContent(),
                post.getPostLikes().size(),
                post.getComments().size()
        );
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
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
}
