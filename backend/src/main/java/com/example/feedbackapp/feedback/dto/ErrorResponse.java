package com.example.feedbackapp.feedback.dto;

import java.util.List;

public class ErrorResponse {
    private String error;
    private List<FieldErrorDetail> details;

    public ErrorResponse() {
    }

    public ErrorResponse(String error, List<FieldErrorDetail> details) {
        this.error = error;
        this.details = details;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<FieldErrorDetail> getDetails() {
        return details;
    }

    public void setDetails(List<FieldErrorDetail> details) {
        this.details = details;
    }
}

