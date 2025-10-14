# Feedback App — Quick Guide

Full‑stack app for submitting feedback.
- Backend: Java 17, Spring Boot 3, H2 (in‑memory)
- Frontend: React + TypeScript + Vite

## Prerequisites
- Java 17+, Node.js 18+ (npm 9+)
- Maven wrapper is included (no global Maven needed)

## Run (development)
- Backend:
  ```
  cd backend
  .\mvnw.cmd spring-boot:run
  ```
  Runs on http://localhost:8080
- Frontend (in a new terminal):
  ```
  cd frontend
  npm ci
  npm run dev
  ```
  App on http://localhost:5173

## Build (production)
- Backend:
  ```
  cd backend
  .\mvnw.cmd -DskipTests package
  java -jar target\feedback-app-0.0.1-SNAPSHOT.jar
  ```
- Frontend:
  ```
  cd frontend
  npm run build
  npm run preview
  ```

## Automated tests
- Backend:
  ```
  cd backend
  .\mvnw.cmd test
  ```
- Frontend:
  ```
  cd frontend
  npm test
  ```

## API
- POST http://localhost:8080/api/feedback
  ```
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Your platform looks great!"
  }
  ```
  Response:
  ```
  { "id": 1, "name": "John Doe", "message": "Your platform looks great!" }
  ```

## Assumptions / Notes
- H2 in‑memory DB; data resets on restart.
- Validation and global error handling in backend; sensitive data not logged.
- CORS enabled for localhost:5173 (adjust in backend config if ports change).
- Frontend API URL configurable in frontend/src/api/feedbackApi.ts.