# Feedback App Frontend

A clean, modern React + TypeScript frontend application for collecting user feedback, specifically designed to work with the provided backend API.

## 🚀 Features

- **Focused Form**: Simple 3-field form (name, email, message) matching backend requirements
- **Modern Stack**: React 19, TypeScript, Vite, and Tailwind CSS
- **Form Validation**: Zod schema validation with react-hook-form
- **Real-time Validation**: Client-side validation with user-friendly error messages
- **API Integration**: Direct integration with backend API at `http://localhost:8080/api/feedback`
- **Success/Error Messages**: Toast notifications for user feedback
- **Responsive Design**: Mobile-first design with modern UI components
- **TypeScript**: Full type safety throughout the application

## 📋 Requirements

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:8080`

## 🛠️ Installation

1. **Navigate to the project:**

   ```bash
   cd "c:\feedback app\frontend"
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📱 Form Fields

The form includes exactly the fields required by the backend API:

1. **Name** - Required, non-empty text field
2. **Email** - Required, valid email address
3. **Message** - Required, non-empty text area

## 🔧 API Integration

The application integrates with the backend API:

### POST /api/feedback

Submits new feedback with proper error handling for:

- 201 Created (success)
- 400 Bad Request (validation errors)
- 500 Internal Server Error

### GET /api/feedback (Bonus)

Retrieves all submitted feedback entries if implemented by the backend.

## � Key Components

- **ModernFeedbackForm**: Main form component with validation and submission
- **Modern UI Components**: Clean, accessible form inputs and buttons
- **Toast Notifications**: Success and error messages
- **API Service**: Centralized API communication with proper error handling

## 🧪 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── api/              # API integration
│   └── feedbackApi.ts
├── components/       # React components
│   ├── ModernFeedbackForm.tsx
│   └── ui/          # Reusable UI components
├── lib/             # Utilities and validation
│   ├── utils.ts
│   └── validations.ts
└── App.tsx          # Main application component
```

## ✨ Clean Architecture

This refactored version:

- Removes unused dependencies and components
- Focuses solely on the feedback form requirements
- Uses modern React patterns with hooks
- Implements proper TypeScript typing
- Provides clean separation of concerns
