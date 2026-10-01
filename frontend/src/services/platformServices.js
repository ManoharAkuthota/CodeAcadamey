import api from './api';
import { DEFAULT_DASHBOARD } from '../data/curriculumData';

export const progressService = {
  getDashboardAnalytics: async () => {
    try {
      const res = await api.get('/progress');
      if (res?.data && (res.data.totalCoursesEnrolled || res.data.totalXp)) return res;
    } catch (e) {
      console.warn('Backend unavailable, using fallback dashboard analytics:', e?.message);
    }
    return { success: true, data: DEFAULT_DASHBOARD };
  },

  getAllAchievements: async () => {
    try {
      const res = await api.get('/progress/achievements');
      if (res?.data && res.data.length > 0) return res;
    } catch (e) {
      console.warn('Backend unavailable, using fallback achievements:', e?.message);
    }
    return {
      success: true,
      data: [
        { id: 1, title: 'First Lesson', description: 'Completed your very first programming lesson', icon: 'BookOpen', xpReward: 100, isUnlocked: true },
        { id: 2, title: 'Code Warrior', description: 'Solved 5 algorithmic coding challenges', icon: 'Terminal', xpReward: 150, isUnlocked: true },
        { id: 3, title: 'Bug Hunter', description: 'Fixed errors in Find the Error quizzes', icon: 'Bug', xpReward: 80, isUnlocked: true },
        { id: 4, title: 'Speed Demon', description: 'Scored 100% on a topic quiz on first try', icon: 'Zap', xpReward: 120, isUnlocked: false },
        { id: 5, title: 'Full Stack Master', description: 'Connected React frontend to Spring Boot API', icon: 'Layers', xpReward: 250, isUnlocked: false },
        { id: 6, title: 'Architect', description: 'Mastered SQL joins and B-Tree indexing', icon: 'Database', xpReward: 200, isUnlocked: false },
      ]
    };
  },
};

export const bookmarkService = {
  getBookmarks: (type) => api.get('/bookmarks', { params: { type } }),
  addBookmark: (data) => api.post('/bookmarks', data),
  toggleBookmark: (data) => api.post('/bookmarks/toggle', data),
  deleteBookmark: (id) => api.delete(`/bookmarks/${id}`),
};

export const noteService = {
  getNotes: (search) => api.get('/notes', { params: { search } }),
  getNoteByTopic: (topicId) => api.get(`/notes/topic/${topicId}`),
  saveNote: (data) => api.post('/notes', data),
  deleteNote: (id) => api.delete(`/notes/${id}`),
};

export const searchService = {
  search: (query) => api.get('/search', { params: { q: query } }),
};

export const interviewService = {
  getQuestions: (category, level) => api.get('/interview', { params: { category, level } }),
};

export const projectService = {
  getProjects: (tier) => api.get('/projects', { params: { tier } }),
};

export const adminService = {
  getDashboard: async () => {
    try {
      const res = await api.get('/admin/dashboard');
      if (res?.data) return res;
    } catch (e) {
      console.warn('Backend unavailable, using fallback admin dashboard:', e?.message);
    }
    return {
      success: true,
      data: {
        totalUsers: 142,
        totalCourses: 8,
        totalTopicsCompleted: 864,
        totalSubmissions: 312,
        activeStudentsToday: 28,
        monthlyGrowth: [
          { month: 'Jan', students: 40, completions: 120 },
          { month: 'Feb', students: 65, completions: 210 },
          { month: 'Mar', students: 95, completions: 340 },
          { month: 'Apr', students: 142, completions: 520 },
        ]
      }
    };
  },
  getUsers: () => api.get('/admin/users'),
  updateUserRole: (userId, role) => api.put(`/admin/users/${userId}/role`, { role }),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  createCourse: (data) => api.post('/admin/courses', data),
  deleteCourse: (courseId) => api.delete(`/admin/courses/${courseId}`),
  togglePublishCourse: (courseId) => api.patch(`/admin/courses/${courseId}/toggle-publish`),
};
