import api from './api';

export const courseService = {
  getAllLanguages: () => api.get('/languages'),
  getLanguageBySlug: (slug) => api.get(`/languages/${slug}`),
  getAllFrameworks: () => api.get('/frameworks'),
  getFrameworkBySlug: (slug) => api.get(`/frameworks/${slug}`),
  getAllCourses: () => api.get('/courses'),
  getCourseById: (id) => api.get(`/courses/${id}`),
  getCourseBySlug: (slug) => api.get(`/courses/slug/${slug}`),
  getCoursesByLanguage: (languageId) => api.get(`/courses/by-language/${languageId}`),
};
