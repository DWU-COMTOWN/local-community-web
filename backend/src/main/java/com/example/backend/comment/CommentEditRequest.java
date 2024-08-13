package com.example.backend.comment;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CommentEditRequest {
    private String content;
    @JsonProperty("isEdited")
    private boolean isEdited;

    public CommentEditRequest() {
    }

    public CommentEditRequest(String content, boolean isEdited) {
        this.content = content;
        this.isEdited = isEdited;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isEdited() {
        return isEdited;
    }

    public void setEdited(boolean isEdited) {
        this.isEdited = isEdited;
    }
}
