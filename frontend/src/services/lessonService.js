import api from './api';
import { DEFAULT_LESSONS } from '../data/curriculumData';

export const lessonService = {
  getLessonById: async (id) => {
    try {
      const res = await api.get(`/lessons/${id}`);
      if (res?.data) return res;
    } catch (e) {
      console.warn(`Backend unavailable for lesson ${id}, using fallback:`, e?.message);
    }
    const found = DEFAULT_LESSONS[id] || DEFAULT_LESSONS[1001];
    return { success: true, data: found };
  },

  getLessonByTopicId: async (topicId) => {
    try {
      const res = await api.get(`/lessons/topic/${topicId}`);
      if (res?.data) return res;
    } catch (e) {
      console.warn(`Backend unavailable for topic lesson ${topicId}, using fallback:`, e?.message);
    }
    const found = DEFAULT_LESSONS[topicId] || DEFAULT_LESSONS[1001];
    return { success: true, data: found };
  },

  completeTopic: async (topicId) => {
    try {
      return await api.post(`/lessons/topic/${topicId}/complete`);
    } catch (e) {
      return { success: true, data: { topicId, completed: true, xpEarned: 50 } };
    }
  },

  completeLesson: async (lessonId) => {
    try {
      return await api.post(`/lessons/${lessonId}/complete`);
    } catch (e) {
      return { success: true, data: { lessonId, completed: true, xpEarned: 25 } };
    }
  },
};
