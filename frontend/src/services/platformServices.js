import api from './api';

export const progressService = {
  getDashboardAnalytics: () => api.get('/progress'),
  getAllAchievements: () => api.get('/progress/achievements'),
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
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
  updateUserRole: (userId, role) => api.put(`/admin/users/${userId}/role`, { role }),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  createCourse: (data) => api.post('/admin/courses', data),
  deleteCourse: (courseId) => api.delete(`/admin/courses/${courseId}`),
  togglePublishCourse: (courseId) => api.patch(`/admin/courses/${courseId}/toggle-publish`),
};
