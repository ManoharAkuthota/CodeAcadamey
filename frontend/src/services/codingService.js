import api from './api';

export const codingService = {
  getAllProblems: (params) => api.get('/problems', { params }),
  getProblemById: (id) => api.get(`/problems/${id}`),
  getProblemBySlug: (slug) => api.get(`/problems/slug/${slug}`),
  runCode: (id, code, language) => api.post(`/problems/${id}/run`, { code, language }),
  submitCode: (id, code, language) => api.post(`/problems/${id}/submit`, { code, language }),
};
