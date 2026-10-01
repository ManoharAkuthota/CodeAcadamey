import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, CheckCircle2, Circle, ArrowDown, 
  Sparkles, Terminal, Code, Database, 
  Layers, Shield, Cpu, GitBranch
} from 'lucide-react';

export default function RoadmapGraph({ userProgressTopicIds = [] }) {
  const levels = [
    {
      levelNumber: 1,
      title: 'Level 1 – Programming Fundamentals',
      subtitle: 'Understand low-level memory, pointers, and algorithmic logic.',
      icon: Terminal,
      color: 'from-blue-600 to-cyan-500',
      nodes: [
        { name: 'C Language', slug: 'c', path: '/languages/c', desc: 'Syntax, Pointers, Memory' },
        { name: 'C++', slug: 'cpp', path: '/languages/cpp', desc: 'STL, Templates, OOP' },
        { name: 'Data Structures', slug: 'dsa', path: '/coding-practice', desc: 'Arrays, Stacks, Queues, Trees' },
        { name: 'Algorithms', slug: 'algorithms', path: '/challenges', desc: 'Sorting, Searching, Two Pointers' },
      ],
      isUnlocked: true,
    },
    {
      levelNumber: 2,
      title: 'Level 2 – Object-Oriented Programming (OOP)',
      subtitle: 'Enterprise design with strongly typed, object-oriented systems.',
      icon: Cpu,
      color: 'from-amber-500 to-orange-600',
      nodes: [
        { name: 'Java 21', slug: 'java', path: '/course/1', desc: 'JVM, Bytecode, Syntax' },
        { name: 'Core OOP', slug: 'java-oop', path: '/course/1', desc: 'Encapsulation, Polymorphism, Abstraction' },
        { name: 'Collections', slug: 'java-collections', path: '/course/1', desc: 'List, Set, Map, Iterators' },
        { name: 'Multithreading', slug: 'java-threads', path: '/course/1', desc: 'Threads, Synchronization, Virtual Threads' },
      ],
      isUnlocked: true,
    },
    {
      levelNumber: 3,
      title: 'Level 3 – Python Ecosystem & AI Scripting',
      subtitle: 'Modern readable scripting, data processing, and automation.',
      icon: Code,
      color: 'from-yellow-500 to-emerald-500',
      nodes: [
        { name: 'Python Basics', slug: 'python', path: '/languages/python', desc: 'Types, Loops, Dicts, Lists' },
        { name: 'Pythonic OOP', slug: 'python-oop', path: '/languages/python', desc: 'Classes, Dunder Methods' },
        { name: 'Virtual Envs', slug: 'python-modules', path: '/languages/python', desc: 'Pip, Venv, Package Ecosystem' },
        { name: 'Backend APIs', slug: 'django', path: '/frameworks/django', desc: 'Django & Flask APIs' },
      ],
      isUnlocked: true,
    },
    {
      levelNumber: 4,
      title: 'Level 4 – Modern Web Development',
      subtitle: 'Build reactive, stateful, and component-based user interfaces.',
      icon: Layers,
      color: 'from-emerald-500 to-teal-500',
      nodes: [
        { name: 'HTML & CSS', slug: 'web-foundations', path: '/languages/javascript', desc: 'Semantic Layouts & Styling' },
        { name: 'JavaScript ES6+', slug: 'javascript', path: '/languages/javascript', desc: 'Promises, Async/Await, Closures' },
        { name: 'React 18', slug: 'react', path: '/course/3', desc: 'Components, Hooks, State' },
        { name: 'Frontend State', slug: 'react-state', path: '/course/3', desc: 'Context API, React Router, Axios' },
      ],
      isUnlocked: true,
    },
    {
      levelNumber: 5,
      title: 'Level 5 – Enterprise Backend Development',
      subtitle: 'Scalable cloud backends, microservices, and secure REST APIs.',
      icon: Shield,
      color: 'from-green-600 to-emerald-600',
      nodes: [
        { name: 'Spring Framework', slug: 'spring-core', path: '/course/2', desc: 'IoC Container, Beans, DI' },
        { name: 'Spring Boot 3', slug: 'spring-boot', path: '/course/2', desc: 'Auto-configuration, REST Controllers' },
        { name: 'Spring Security', slug: 'spring-security', path: '/course/2', desc: 'JWT, BCrypt, Filter Chains' },
        { name: 'Spring Data JPA', slug: 'spring-jpa', path: '/course/2', desc: 'Hibernate, Repositories, MySQL' },
      ],
      isUnlocked: true,
    },
    {
      levelNumber: 6,
      title: 'Level 6 – Relational Databases & SQL',
      subtitle: 'Design relational schemas, optimize queries, and master ACID transactions.',
      icon: Database,
      color: 'from-cyan-600 to-blue-600',
      nodes: [
        { name: 'SQL Essentials', slug: 'sql', path: '/course/4', desc: 'SELECT, WHERE, JOINs, Grouping' },
        { name: 'MySQL Server', slug: 'mysql', path: '/course/4', desc: 'InnoDB Storage, Constraints' },
        { name: 'Database Design', slug: 'db-design', path: '/course/4', desc: 'Normalization, Foreign Keys' },
        { name: 'Indexes & Tuning', slug: 'sql-optimization', path: '/course/4', desc: 'B-Tree Indexes, Query Execution Plans' },
      ],
      isUnlocked: true,
    },
    {
      levelNumber: 7,
      title: 'Level 7 – Full Stack Integration',
      subtitle: 'Synthesize React, Spring Boot, and MySQL into full-stack production software.',
      icon: Sparkles,
      color: 'from-purple-600 to-pink-600',
      nodes: [
        { name: 'React SPA', slug: 'fs-frontend', path: '/course/3', desc: 'Vite Client, Tailwind, Axios Interceptor' },
        { name: 'Spring Boot API', slug: 'fs-backend', path: '/course/2', desc: 'Layered REST Endpoints, DTO Validation' },
        { name: 'MySQL Database', slug: 'fs-db', path: '/course/4', desc: 'Relational Persistence Layer' },
        { name: 'Full-Stack Banking App', slug: 'fs-project', path: '/projects', desc: 'Real-world Capstone Architecture' },
      ],
      isUnlocked: true,
    },
    {
      levelNumber: 8,
      title: 'Level 8 – Professional DevOps & Production',
      subtitle: 'Version control, containers, automated tests, and deployment.',
      icon: GitBranch,
      color: 'from-rose-600 to-indigo-600',
      nodes: [
        { name: 'Git & GitHub', slug: 'git', path: '/interview-prep?category=DevOps', desc: 'Commits, Branches, PRs' },
        { name: 'Docker', slug: 'docker', path: '/interview-prep?category=DevOps', desc: 'Containers, Images, Dockerfiles' },
        { name: 'Automated Testing', slug: 'testing', path: '/interview-prep', desc: 'JUnit 5, Mockito, RTL' },
        { name: 'CI/CD & Cloud', slug: 'cicd', path: '/projects', desc: 'GitHub Actions, AWS/Render Deployment' },
      ],
      isUnlocked: true,
    },
  ];

  return (
    <div className="space-y-12 py-6">
      {levels.map((lvl, index) => {
        const Icon = lvl.icon;
        return (
          <div key={index} className="relative group">
            
            {/* Level Header Card */}
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${lvl.color} flex items-center justify-center text-white shadow-sm shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  {lvl.title}
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                    Step {lvl.levelNumber} of 8
                  </span>
                </h3>
                <p className="text-xs text-slate-500">{lvl.subtitle}</p>
              </div>
            </div>

            {/* Grid of Nodes in this Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lvl.nodes.map((node, nodeIdx) => {
                const isCompleted = userProgressTopicIds.includes(node.slug);

                return (
                  <Link
                    key={nodeIdx}
                    to={node.path}
                    className="relative p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-400 hover:bg-brand-50/20 transition-all hover:shadow-md flex flex-col justify-between group/card shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-slate-900 group-hover/card:text-brand-600">
                          {node.name}
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {node.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-brand-600 font-medium">
                      <span>Explore Topics</span>
                      <span className="opacity-0 group-hover/card:opacity-100 transition-opacity">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Down Connector Arrow (except last level) */}
            {index < levels.length - 1 && (
              <div className="flex justify-center my-6">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-xs">
                  <ArrowDown className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
