import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => {
    localStorage.removeItem('codepath_token');
    localStorage.removeItem('codepath_refresh_token');
    localStorage.removeItem('codepath_user');
    return api.post('/auth/logout').catch(() => {});
  },
  getCurrentUser: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
};
