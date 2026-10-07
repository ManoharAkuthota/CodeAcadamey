import api from './api';
import { DEFAULT_COURSES } from '../data/curriculumData';

const CORE_LANGUAGES = [
  {
    id: 1,
    name: 'C',
    slug: 'c',
    description: 'The foundational mother of modern computing. Master memory management, pointer arithmetic, structs, and operating system kernels.',
    whyLearn: 'C gives you complete control over CPU registers and system RAM. It forms the backbone of Linux, Windows kernel, embedded robotics, and high-performance computing.',
    prerequisites: 'None – perfect for understanding how computers actually execute machine code.',
    difficulty: 'Intermediate',
    averageSalary: '$115,000 / yr',
    careerRoles: ['Systems Engineer', 'Embedded Firmware Developer', 'OS Kernel Architect', 'Game Engine Developer'],
    keyFeatures: ['Direct RAM memory addressing', 'Zero runtime abstraction overhead', 'Universal C ABI linking with all languages', 'Blazing fast raw CPU execution'],
    projectIdeas: ['High-Performance Calculator', 'Student Record Database System', 'Multi-Account Banking System', 'Custom Memory Allocator'],
    icon: 'Cpu',
    color: '#3b82f6',
    topicCount: 15,
    courseCount: 1
  },
  {
    id: 2,
    name: 'C++',
    slug: 'cpp',
    description: 'High-performance systems language extending C with Object-Oriented Programming, RAII memory safety, templates, and the Standard Template Library (STL).',
    whyLearn: 'Industry gold standard for Unreal Engine game development, browser rendering engines (Chromium), financial trading platforms, and self-driving vehicle systems.',
    prerequisites: 'Basic programming concepts or foundational C syntax.',
    difficulty: 'Advanced',
    averageSalary: '$130,000 / yr',
    careerRoles: ['Game Engine Developer (Unreal Engine)', 'HFT Quant Engineer', 'Graphics/VFX Systems Engineer', 'Autonomous Vehicles Engineer'],
    keyFeatures: ['Zero-overhead abstractions', 'Deterministic RAII memory management', 'Generic metaprogramming with Templates', 'High-performance STL algorithms'],
    projectIdeas: ['Trading Simulation Engine', 'Library Management System', 'Terminal-Based 2D Game', 'Custom String & Vector Container'],
    icon: 'Layers',
    color: '#6366f1',
    topicCount: 15,
    courseCount: 1
  },
  {
    id: 3,
    name: 'Java',
    slug: 'java',
    description: 'Enterprise-grade, object-oriented language running on the JVM. Master robust typing, collections, concurrency, multithreading, and Spring microservices.',
    whyLearn: 'Powers 90% of Fortune 500 enterprise architectures, banking payment gateways, Android apps, and high-throughput cloud microservices.',
    prerequisites: 'Basic programming fundamentals and logical thinking.',
    difficulty: 'Intermediate',
    averageSalary: '$125,000 / yr',
    careerRoles: ['Enterprise Backend Engineer', 'Spring Boot Microservices Architect', 'Android App Developer', 'Cloud Platform Engineer'],
    keyFeatures: ['Write Once, Run Anywhere (WORA) on JVM', 'Garbage Collection & Memory Management', 'Extensive Collections & Concurrency Framework', 'Spring Boot ecosystem standard'],
    projectIdeas: ['Enterprise Banking Backend', 'E-Commerce Microservice API', 'Student Enrollment Platform', 'Real-Time Chat Server'],
    icon: 'Coffee',
    color: '#f97316',
    topicCount: 15,
    courseCount: 2
  },
  {
    id: 4,
    name: 'Python',
    slug: 'python',
    description: 'Elegant, versatile language driving Artificial Intelligence, Data Science, automated scripting, and modern web application development.',
    whyLearn: 'Highest developer productivity and premier ecosystem for machine learning (PyTorch, TensorFlow), data analysis (Pandas), and backend APIs (Django, Flask, FastAPI).',
    prerequisites: 'None – the friendliest and most readable language for aspiring developers.',
    difficulty: 'Beginner',
    averageSalary: '$128,000 / yr',
    careerRoles: ['AI / ML Engineer', 'Data Scientist & Analyst', 'Backend Web Developer', 'DevOps & Automation Specialist'],
    keyFeatures: ['Clean, human-readable syntax', 'Enormous library ecosystem (NumPy, PyTorch)', 'Dynamic typing with optional type hints', 'Rapid prototyping and scripting'],
    projectIdeas: ['Personal Expense & Budget Tracker', 'Real-Time Weather CLI & API Client', 'Automated Web Scraper & Data Pipeline', 'RESTful API with Flask/FastAPI'],
    icon: 'Terminal',
    color: '#eab308',
    topicCount: 15,
    courseCount: 1
  },
  {
    id: 5,
    name: 'JavaScript',
    slug: 'javascript',
    description: 'The universal language of the web. Powers interactive browser frontends with React/Vue and scalable backend web servers with Node.js and Express.',
    whyLearn: 'Every browser on Earth executes JavaScript. Unlocks true full-stack engineering capability by mastering a single versatile language across client and server.',
    prerequisites: 'Basic understanding of HTML and CSS styling.',
    difficulty: 'Beginner',
    averageSalary: '$118,000 / yr',
    careerRoles: ['Full-Stack Software Engineer', 'Frontend React Developer', 'Node.js Backend Developer', 'UI/UX Interactive Engineer'],
    keyFeatures: ['Event-driven asynchronous non-blocking I/O', 'First-class functions and closures', 'Rich modern ES6+ language features', 'NPM ecosystem with over 2 million packages'],
    projectIdeas: ['Interactive React Learning Dashboard', 'Full-Stack Task Manager (MERN)', 'Real-Time WebSocket Chat Application', 'RESTful API with Express & JWT Auth'],
    icon: 'Code',
    color: '#eab308',
    topicCount: 15,
    courseCount: 2
  },
  {
    id: 6,
    name: 'SQL / MySQL',
    slug: 'sql',
    description: 'The standard declarative language for relational database architecture. Master query projection, multi-table joins, B-Tree indexes, and ACID transactions.',
    whyLearn: 'Every production web application requires persistent data storage. Relational database modeling and query optimization are mandatory backend skills.',
    prerequisites: 'None – accessible to anyone managing structured datasets.',
    difficulty: 'Beginner to Intermediate',
    averageSalary: '$110,000 / yr',
    careerRoles: ['Database Administrator (DBA)', 'Backend Database Architect', 'Data Analyst / BI Engineer', 'SQL Performance Tuning Specialist'],
    keyFeatures: ['Declarative query execution model', 'ACID transaction guarantees', 'B-Tree & Hash index optimization', 'Relational schema design and 3NF normalization'],
    projectIdeas: ['E-Commerce Relational Schema Design', 'Complex Multi-Table Reporting Queries', 'Bank Transaction Ledger with ACID Locks', 'Database Index Tuning Benchmark'],
    icon: 'Database',
    color: '#06b6d4',
    topicCount: 15,
    courseCount: 1
  }
];

export const courseService = {
  getAllLanguages: async () => {
    try {
      const res = await api.get('/languages');
      if (res?.data && res.data.length > 0) return res;
    } catch (e) {
      console.warn('Backend unavailable, using comprehensive language catalog:', e?.message);
    }
    return {
      success: true,
      data: CORE_LANGUAGES
    };
  },

  getLanguageBySlug: async (slug) => {
    try {
      const res = await api.get(`/languages/${slug}`);
      if (res?.data) return res;
    } catch (e) {
      console.warn('Backend unavailable, using fallback language detail:', e?.message);
    }
    const cleanSlug = String(slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const found = CORE_LANGUAGES.find(l => {
      const lSlug = l.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
      const lName = l.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return lSlug === cleanSlug || lName === cleanSlug;
    }) || CORE_LANGUAGES[0];
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

  getCoursesByLanguage: async (identifier) => {
    try {
      const res = await api.get(`/courses/by-language/${identifier}`);
      if (res?.data && res.data.length > 0) return res;
    } catch (e) {
      console.warn('Backend unavailable, filtering fallback courses:', e?.message);
    }

    // Resolve identifier: can be number (1..6) or string ('c', 'cpp', 'java', 'python', 'javascript', 'sql')
    let targetLang = String(identifier || '').toLowerCase();
    const idMap = { '1': 'c', '2': 'c++', '3': 'java', '4': 'python', '5': 'javascript', '6': 'sql' };
    if (idMap[targetLang]) {
      targetLang = idMap[targetLang];
    }

    const filtered = DEFAULT_COURSES.filter(c => {
      const cLang = (c.languageName || '').toLowerCase();
      if (targetLang === 'c' && cLang === 'c') return true;
      if ((targetLang === 'cpp' || targetLang === 'c++') && (cLang === 'c++' || cLang === 'cpp')) return true;
      if (targetLang === 'java' && cLang === 'java') return true;
      if (targetLang === 'python' && cLang === 'python') return true;
      if ((targetLang === 'javascript' || targetLang === 'js') && (cLang === 'javascript' || cLang === 'js')) return true;
      if (targetLang === 'sql' && (cLang.includes('sql') || cLang.includes('mysql'))) return true;
      return cLang.includes(targetLang);
    });

    return { success: true, data: filtered.length > 0 ? filtered : DEFAULT_COURSES.slice(0, 2) };
  },
};
