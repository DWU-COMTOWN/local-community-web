package com.example.backend.post_image;

public class PostImageResponse {
    private String url;

    public PostImageResponse(String url) {
        this.url = url;
    }

    public PostImageResponse(PostImage postImage) {
        this.url = postImage.getUrl();
    }


    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}