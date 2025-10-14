package com.example.feedbackapp.feedback.controller;

import com.example.feedbackapp.feedback.dto.FeedbackRequest;
import com.example.feedbackapp.feedback.dto.FeedbackResponse;
import com.example.feedbackapp.feedback.service.FeedbackService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private static final Logger log = LoggerFactory.getLogger(FeedbackController.class);
    private final FeedbackService service;

    public FeedbackController(FeedbackService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<FeedbackResponse> submit(@Valid @RequestBody FeedbackRequest request) {
        log.debug("Handling feedback submission for name={}", request.getName());
        FeedbackResponse response = service.createFeedback(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<FeedbackResponse>> getAll() {
        log.debug("Fetching all feedbacks");
        return ResponseEntity.ok(service.getAllFeedbacks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedbackResponse> getById(@PathVariable Long id) {
        log.debug("Fetching feedback id={}", id);
        return ResponseEntity.ok(service.getFeedbackById(id));
    }
}
