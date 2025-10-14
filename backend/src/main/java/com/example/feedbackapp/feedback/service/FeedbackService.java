package com.example.feedbackapp.feedback.service;

import com.example.feedbackapp.feedback.dto.FeedbackRequest;
import com.example.feedbackapp.feedback.dto.FeedbackResponse;
import com.example.feedbackapp.feedback.model.Feedback;
import com.example.feedbackapp.feedback.repo.FeedbackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return new FeedbackResponse(saved.getId(), saved.getName(), saved.getMessage());
    }
}
