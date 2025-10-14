package com.example.feedbackapp.feedback.repo;

import com.example.feedbackapp.feedback.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}

