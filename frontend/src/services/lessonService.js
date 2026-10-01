import api from './api';
import { getOrGenerateLesson } from '../data/curriculumData';

export const lessonService = {
  getLessonById: async (id) => {
    try {
      const res = await api.get(`/lessons/${id}`);
      if (res?.data) return res;
    } catch (e) {
      console.warn(`Backend unavailable for lesson ${id}, using universal curriculum resolver:`, e?.message);
    }
    const found = getOrGenerateLesson(id);
    return { success: true, data: found };
  },

  getLessonByTopicId: async (topicId) => {
    try {
      const res = await api.get(`/lessons/topic/${topicId}`);
      if (res?.data) return res;
    } catch (e) {
      console.warn(`Backend unavailable for topic lesson ${topicId}, using universal curriculum resolver:`, e?.message);
    }
    const found = getOrGenerateLesson(topicId);
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
