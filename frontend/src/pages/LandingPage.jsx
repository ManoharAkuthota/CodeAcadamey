import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, ArrowRight, Sparkles, CheckCircle2, 
  Terminal, ShieldCheck, Database, Laptop, 
  BookOpen, Award, Flame, Cpu, Layers
} from 'lucide-react';

export default function LandingPage() {
  const floatingSnippets = [
    { text: 'public static void main(String[] args)', lang: 'Java', top: '15%', left: '8%', color: 'border-orange-500/30 text-orange-400' },
    { text: 'def hello(): return "World"', lang: 'Python', top: '25%', right: '10%', color: 'border-yellow-500/30 text-yellow-400' },
    { text: 'console.log("Hello World");', lang: 'JavaScript', top: '65%', left: '6%', color: 'border-emerald-500/30 text-emerald-400' },
    { text: 'SELECT * FROM users WHERE active = 1;', lang: 'SQL', top: '75%', right: '8%', color: 'border-cyan-500/30 text-cyan-400' },
  ];

  const languages = [
    { name: 'C', icon: 'Cpu', color: 'from-blue-600 to-indigo-600', desc: 'Low-level memory & pointers' },
    { name: 'C++', icon: 'Layers', color: 'from-indigo-600 to-purple-600', desc: 'Object-oriented & STL' },
    { name: 'Java', icon: 'Coffee', color: 'from-orange-600 to-amber-600', desc: 'JVM & Enterprise systems' },
    { name: 'Python', icon: 'Terminal', color: 'from-yellow-500 to-amber-500', desc: 'Data structures & AI' },
    { name: 'JavaScript', icon: 'Code', color: 'from-yellow-400 to-emerald-500', desc: 'Web DOM & Full-stack' },
    { name: 'SQL', icon: 'Database', color: 'from-cyan-500 to-blue-500', desc: 'Relational databases & ACID' },
    { name: 'React', icon: 'Laptop', color: 'from-teal-500 to-cyan-600', desc: 'Component architecture' },
    { name: 'Spring Boot', icon: 'ShieldCheck', color: 'from-emerald-500 to-green-600', desc: 'REST APIs & Security' },
  ];

  const highlights = [
    {
      title: 'Interactive 3-Pane Lessons',
      desc: 'Real curriculum on the left, rich concepts & syntax in the center, and live notes & quiz progress on the right.',
      icon: BookOpen,
      color: 'text-brand-400 bg-brand-500/10'
    },
    {
      title: '"Understand This Code" Mode',
      desc: 'Every code snippet broken down across 6 dimensions: purpose, reason, mechanics, memory, real-world usage, and common mistakes.',
      icon: Sparkles,
      color: 'text-cyan-400 bg-cyan-500/10'
    },
    {
      title: 'Full-Stack Architecture Tracer',
      desc: 'The platform teaches you itself: inspect how clicks travel through React, Axios, Spring Boot controllers, JPA, and MySQL.',
      icon: Layers,
      color: 'text-purple-400 bg-purple-500/10'
    },
    {
      title: 'Monaco Editor & Coding Challenges',
      desc: 'Solve programming problems directly in the browser with VS Code Monaco editor and instant test case evaluation.',
      icon: Terminal,
      color: 'text-amber-400 bg-amber-500/10'
    },
    {
      title: 'Adaptive Quizzes with Explanations',
      desc: 'MCQ, Code Output, and Find the Error quizzes with instant rationales explaining why other options are wrong.',
      icon: Award,
      color: 'text-emerald-400 bg-emerald-500/10'
    },
    {
      title: 'Gamified Developer XP & Streaks',
      desc: 'Earn XP, unlock level milestones (Beginner to Software Engineer), collect badges, and maintain your learning streak.',
      icon: Flame,
      color: 'text-rose-400 bg-rose-500/10'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-50 w-full max-w-full">
      
      {/* Decorative Gradients & Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-100/50 via-emerald-50/30 to-transparent pointer-events-none blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        
        {/* Floating Code Snippets around Hero */}
        {floatingSnippets.map((snip, idx) => (
          <div
            key={idx}
            style={{ top: snip.top, left: snip.left, right: snip.right }}
            className={`hidden xl:block absolute p-2.5 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-lg font-mono text-[11px] ${snip.color} animate-bounce duration-1000`}
          >
            <span className="text-slate-500 mr-2 text-[9px] uppercase font-bold">{snip.lang}</span>
            <code className="text-slate-800 font-semibold">{snip.text}</code>
          </div>
        ))}

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-[10px] sm:text-xs font-semibold max-w-[90vw]">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Interactive Computer Science & Full-Stack Platform</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Learn. Practice. Build. <br />
            <span className="bg-gradient-to-r from-brand-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Become a Software Engineer.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-600 leading-relaxed font-normal px-2">
            Master programming languages, frameworks, databases and real-world development through an interactive learning journey with live code execution, adaptive quizzes, and architecture tracers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-sm sm:max-w-none mx-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              Start Learning Free <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/courses"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              Explore Courses
            </Link>
          </div>

          {/* Technology Badges Carousel */}
          <div className="pt-8 sm:pt-10">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-mono mb-4 px-2">
              Comprehensive Curriculum Across 8 Core Stacks
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-700 transition-all shadow-sm"
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${lang.color}`}></div>
                  {lang.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Designed as a Real Learning Platform
          </h2>
          <p className="text-sm text-slate-600">
            Not just a static tutorial website. Built with real enterprise practices to ensure concepts click deeply.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between space-y-4 hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8-Level Roadmap CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12 rounded-3xl bg-gradient-to-b from-brand-50/60 to-white border border-brand-200 text-center space-y-6 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-brand-100 text-brand-800 border border-brand-200">
            The Complete Developer Roadmap
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            From C Fundamentals to Microservices & Docker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Follow our structured 8-level roadmap with automatic prerequisite locking. You cannot skip straight to Spring Data JPA without mastering Java OOP and relational SQL.
          </p>
          <div className="pt-2">
            <Link
              to="/learning-path"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-transform hover:scale-105 shadow-md"
            >
              Open Interactive Roadmap <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
