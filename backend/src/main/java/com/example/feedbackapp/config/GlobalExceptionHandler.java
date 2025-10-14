package com.example.feedbackapp.config;

import com.example.feedbackapp.feedback.dto.ErrorResponse;
import com.example.feedbackapp.feedback.dto.FieldErrorDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.converter.HttpMessageNotReadableException;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        List<FieldErrorDetail> details = ex.getBindingResult().getFieldErrors().stream()
                .map(this::mapField)
                .collect(Collectors.toList());
        log.warn("Validation failed: {} error(s)", details.size());
        ErrorResponse body = new ErrorResponse("Validation failed", details);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleMalformed(HttpMessageNotReadableException ex) {
        log.warn("Malformed JSON: {}", ex.getMessage());
        ErrorResponse body = new ErrorResponse("Malformed JSON", null);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    private FieldErrorDetail mapField(FieldError fe) {
        return new FieldErrorDetail(fe.getField(), fe.getDefaultMessage());
    }
}
