import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';

interface FeedbackFormLayoutProps {
  children: React.ReactNode;
}

export const FeedbackFormLayout: React.FC<FeedbackFormLayoutProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Share Your Feedback
              </CardTitle>
            </motion.div>
            <CardDescription className="text-lg text-gray-600">
              Help us improve by sharing your thoughts and experiences
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {children}
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          <p>Your feedback is valuable to us and helps improve our services.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
