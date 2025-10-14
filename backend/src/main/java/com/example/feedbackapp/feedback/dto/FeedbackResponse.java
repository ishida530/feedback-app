package com.example.feedbackapp.feedback.dto;

import java.time.Instant;

public class FeedbackResponse {
    private Long id;
    private String name;
    private String message;
    private Instant createdAt;

    public FeedbackResponse() {
    }

    public FeedbackResponse(Long id, String name, String message) {
        this.id = id;
        this.name = name;
        this.message = message;
    }

    public FeedbackResponse(Long id, String name, String message, Instant createdAt) {
        this.id = id;
        this.name = name;
        this.message = message;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
