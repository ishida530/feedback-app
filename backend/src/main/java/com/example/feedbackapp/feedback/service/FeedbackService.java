package com.example.feedbackapp.feedback.service;

import com.example.feedbackapp.feedback.dto.FeedbackRequest;
import com.example.feedbackapp.feedback.dto.FeedbackResponse;
import com.example.feedbackapp.feedback.model.Feedback;
import com.example.feedbackapp.feedback.repo.FeedbackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private final FeedbackRepository repository;

    public FeedbackService(FeedbackRepository repository) { this.repository = repository; }

    @Transactional
    public FeedbackResponse createFeedback(FeedbackRequest request) {
        Feedback feedback = new Feedback();
        feedback.setName(request.getName());
        feedback.setEmail(request.getEmail());
        feedback.setMessage(request.getMessage());
        Feedback saved = repository.save(feedback);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<FeedbackResponse> getAllFeedbacks() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FeedbackResponse getFeedbackById(Long id) {
        Feedback fb = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Feedback not found"));
        return toResponse(fb);
    }

    private FeedbackResponse toResponse(Feedback saved) {
        return new FeedbackResponse(saved.getId(), saved.getName(), saved.getMessage(), saved.getCreatedAt());
    }
}
