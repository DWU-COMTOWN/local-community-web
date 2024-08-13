package com.example.backend.post;

import com.example.backend.post_image.PostImage;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PostEditRequest {
    private String title;
    private String content;
    private List<PostImage> postImages;
    private List<String> currentImageUrls;
    @JsonProperty("isEdited")
    private boolean isEdited;
    @JsonProperty("isScrapped")
    private boolean isScrapped;
    @JsonProperty("isLiked")
    private boolean isLiked;


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

    public List<PostImage> getPostImages() {
        return postImages;
    }

    public void setPostImages(List<PostImage> postImages) {
        this.postImages = postImages;
    }

    public List<String> getCurrentImageUrls() {
        return currentImageUrls;
    }

    public void setCurrentImageUrls(List<String> currentImageUrls) {
        this.currentImageUrls = currentImageUrls;
    }

    public boolean isEdited() {
        return isEdited;
    }

    public void setEdited(boolean edited) {
        isEdited = edited;
    }

    public boolean isScrapped() {
        return isScrapped;
    }

    public void setScrapped(boolean scrapped) {
        isScrapped = scrapped;
    }

    public boolean isLiked() {
        return isLiked;
    }

    public void setLiked(boolean liked) {
        isLiked = liked;
    }
}
