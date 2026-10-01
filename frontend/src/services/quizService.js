import api from './api';

export const quizService = {
  getQuizById: (id) => api.get(`/quizzes/${id}`),
  getQuizByTopicId: (topicId) => api.get(`/quizzes/topic/${topicId}`),
  submitQuiz: (id, answers) => api.post(`/quizzes/${id}/submit`, { answers }),
};
