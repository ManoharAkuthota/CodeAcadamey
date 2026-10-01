import api from './api';
import { DEFAULT_COURSES } from '../data/curriculumData';

export const courseService = {
  getAllLanguages: async () => {
    try {
      const res = await api.get('/languages');
      if (res?.data && res.data.length > 0) return res;
    } catch (e) {
      console.warn('Backend unavailable, using fallback languages:', e?.message);
    }
    return {
      success: true,
      data: [
        { id: 1, name: 'C', slug: 'c', description: 'Foundational mother of modern programming languages. Master memory management and pointers.', difficulty: 'Intermediate', icon: 'Cpu', color: '#3b82f6', topicCount: 8 },
        { id: 2, name: 'C++', slug: 'cpp', description: 'High-performance language expanding C with OOP, templates, and STL.', difficulty: 'Advanced', icon: 'Layers', color: '#6366f1', topicCount: 10 },
        { id: 3, name: 'Java', slug: 'java', description: 'Enterprise-grade OOP running on the JVM. Master architectures and multithreading.', difficulty: 'Intermediate', icon: 'Coffee', color: '#f97316', topicCount: 12 },
        { id: 4, name: 'Python', slug: 'python', description: 'Elegant and versatile language driving AI, data science, and automation.', difficulty: 'Beginner', icon: 'Terminal', color: '#eab308', topicCount: 10 },
        { id: 5, name: 'JavaScript', slug: 'javascript', description: 'The universal language of the web. Powers frontend React and backend Node.js.', difficulty: 'Beginner', icon: 'Code', color: '#eab308', topicCount: 10 },
        { id: 6, name: 'SQL / MySQL', slug: 'sql', description: 'Relational database querying, joins, indexing, and schema design.', difficulty: 'Beginner', icon: 'Database', color: '#06b6d4', topicCount: 8 },
      ]
    };
  },

  getLanguageBySlug: async (slug) => {
    try {
      const res = await api.get(`/languages/${slug}`);
      if (res?.data) return res;
    } catch (e) {
      console.warn('Backend unavailable, using fallback language detail:', e?.message);
    }
    const langs = await courseService.getAllLanguages();
    const found = langs.data.find(l => l.slug === slug || l.name?.toLowerCase() === slug?.toLowerCase()) || langs.data[0];
    return { success: true, data: found };
  },

  getAllFrameworks: async () => {
    try {
      const res = await api.get('/frameworks');
      if (res?.data && res.data.length > 0) return res;
    } catch (e) {
      console.warn('Backend unavailable, using fallback frameworks:', e?.message);
    }
    return {
      success: true,
      data: [
        { id: 1, name: 'Spring Boot', slug: 'spring-boot', language: 'Java', description: 'Production-ready enterprise framework for microservices, REST APIs, and JPA.', difficulty: 'Intermediate', icon: 'ShieldCheck', color: '#16a34a' },
        { id: 2, name: 'React', slug: 'react', language: 'JavaScript', description: 'Component-driven declarative frontend library for responsive web applications.', difficulty: 'Beginner', icon: 'Laptop', color: '#06b6d4' },
        { id: 3, name: 'Django', slug: 'django', language: 'Python', description: 'Batteries-included high-level Python web framework with built-in ORM.', difficulty: 'Intermediate', icon: 'Terminal', color: '#10b981' },
        { id: 4, name: 'Node.js & Express', slug: 'nodejs-express', language: 'JavaScript', description: 'Fast, unopinionated, minimalist backend web framework for Node.js.', difficulty: 'Intermediate', icon: 'Cpu', color: '#84cc16' },
      ]
    };
  },

  getFrameworkBySlug: async (slug) => {
    try {
      const res = await api.get(`/frameworks/${slug}`);
      if (res?.data) return res;
    } catch (e) {
      console.warn('Backend unavailable, using fallback framework detail:', e?.message);
    }
    const fws = await courseService.getAllFrameworks();
    const found = fws.data.find(f => f.slug === slug) || fws.data[0];
    return { success: true, data: found };
  },

  getAllCourses: async () => {
    try {
      const res = await api.get('/courses');
      if (res?.data && res.data.length > 0) return res;
    } catch (e) {
      console.warn('Backend unavailable, using fallback courses:', e?.message);
    }
    return { success: true, data: DEFAULT_COURSES };
  },

  getCourseById: async (id) => {
    try {
      const res = await api.get(`/courses/${id}`);
      if (res?.data && res.data.modules?.length > 0) return res;
    } catch (e) {
      console.warn(`Backend unavailable for course ${id}, using fallback:`, e?.message);
    }
    const found = DEFAULT_COURSES.find(c => c.id === Number(id) || c.slug === id) || DEFAULT_COURSES[0];
    return { success: true, data: found };
  },

  getCourseBySlug: async (slug) => {
    try {
      const res = await api.get(`/courses/slug/${slug}`);
      if (res?.data && res.data.modules?.length > 0) return res;
    } catch (e) {
      console.warn(`Backend unavailable for course slug ${slug}, using fallback:`, e?.message);
    }
    const found = DEFAULT_COURSES.find(c => c.slug === slug || c.id === Number(slug)) || DEFAULT_COURSES[0];
    return { success: true, data: found };
  },

  getCoursesByLanguage: async (languageId) => {
    try {
      const res = await api.get(`/courses/by-language/${languageId}`);
      if (res?.data && res.data.length > 0) return res;
    } catch (e) {
      console.warn('Backend unavailable, filtering fallback courses:', e?.message);
    }
    const filtered = DEFAULT_COURSES.filter(c => c.languageName?.toLowerCase().includes(String(languageId).toLowerCase()));
    return { success: true, data: filtered.length > 0 ? filtered : DEFAULT_COURSES };
  },
};
