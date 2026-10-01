import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('codepath_token');
    const savedUser = localStorage.getItem('codepath_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        // Verify with server in background
        authService.getCurrentUser()
          .then((res) => {
            if (res.data) {
              setUser(res.data);
              localStorage.setItem('codepath_user', JSON.stringify(res.data));
            }
          })
          .catch(() => {
            // Token might be expired, handled by axios interceptor
          })
          .finally(() => setLoading(false));
      } catch (e) {
        localStorage.clear();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (usernameOrEmail, password) => {
    const res = await authService.login({ usernameOrEmail, password });
    if (res.data) {
      const { accessToken, refreshToken, user: userData } = res.data;
      localStorage.setItem('codepath_token', accessToken);
      localStorage.setItem('codepath_refresh_token', refreshToken);
      localStorage.setItem('codepath_user', JSON.stringify(userData));
      setToken(accessToken);
      setUser(userData);
      return userData;
    }
    throw new Error('Authentication failed');
  };

  const register = async (data) => {
    const res = await authService.register(data);
    if (res.data) {
      const { accessToken, refreshToken, user: userData } = res.data;
      localStorage.setItem('codepath_token', accessToken);
      localStorage.setItem('codepath_refresh_token', refreshToken);
      localStorage.setItem('codepath_user', JSON.stringify(userData));
      setToken(accessToken);
      setUser(userData);
      return userData;
    }
    throw new Error('Registration failed');
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const refreshUserProfile = async () => {
    try {
      const res = await authService.getCurrentUser();
      if (res.data) {
        setUser(res.data);
        localStorage.setItem('codepath_user', JSON.stringify(res.data));
      }
    } catch (e) {
      console.error('Failed to refresh profile', e);
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'ROLE_ADMIN',
    login,
    register,
    logout,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
