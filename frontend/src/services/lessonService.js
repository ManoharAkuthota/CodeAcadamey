import api from './api';

export const lessonService = {
  getLessonById: (id) => api.get(`/lessons/${id}`),
  getLessonByTopicId: (topicId) => api.get(`/lessons/topic/${topicId}`),
  completeTopic: (topicId) => api.post(`/lessons/topic/${topicId}/complete`),
  completeLesson: (lessonId) => api.post(`/lessons/${lessonId}/complete`),
};
