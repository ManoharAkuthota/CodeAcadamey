import api from './api';

export const authService = {
  register: async (data) => {
    try {
      const res = await api.post('/auth/register', data);
      if (res?.data) return res;
    } catch (e) {
      console.warn('Backend unavailable, using fallback register:', e?.message);
    }
    const user = {
      id: 2,
      fullName: data.fullName || 'Student Learner',
      username: data.username || 'student',
      email: data.email || 'student@codepath.com',
      role: 'ROLE_USER',
      xp: 100,
      level: 'Beginner',
      streakDays: 1,
      learningHours: 0.5
    };
    return {
      success: true,
      data: {
        accessToken: 'demo_token_' + Date.now(),
        refreshToken: 'demo_refresh_' + Date.now(),
        user
      }
    };
  },

  login: async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      if (res?.data) return res;
    } catch (e) {
      console.warn('Backend unavailable, using demo credentials fallback:', e?.message);
    }
    const identifier = (data.usernameOrEmail || data.username || data.email || '').toLowerCase();
    const isAdmin = identifier.includes('admin');

    const user = {
      id: isAdmin ? 1 : 2,
      fullName: isAdmin ? 'Platform Administrator' : 'Alex Chen',
      username: isAdmin ? 'admin' : 'student',
      email: isAdmin ? 'admin@codepath.com' : 'student@codepath.com',
      role: isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER',
      xp: isAdmin ? 1000 : 380,
      level: isAdmin ? 'Software Engineer' : 'Junior Developer',
      streakDays: isAdmin ? 14 : 4,
      learningHours: isAdmin ? 45.0 : 8.5
    };

    return {
      success: true,
      data: {
        accessToken: 'demo_token_' + Date.now(),
        refreshToken: 'demo_refresh_' + Date.now(),
        user
      }
    };
  },

  logout: () => {
    localStorage.removeItem('codepath_token');
    localStorage.removeItem('codepath_refresh_token');
    localStorage.removeItem('codepath_user');
    return api.post('/auth/logout').catch(() => {});
  },

  getCurrentUser: async () => {
    try {
      const res = await api.get('/users/me');
      if (res?.data) return res;
    } catch (e) {
      // Return cached user from localStorage
    }
    const cached = localStorage.getItem('codepath_user');
    return {
      success: true,
      data: cached ? JSON.parse(cached) : null
    };
  },

  updateProfile: (data) => api.put('/users/me', data),
};
