import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, Layers, Sparkles, Search } from 'lucide-react';
import { courseService } from '../services/courseService';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [search, setSearch] = useState('');

  const categories = ['ALL', 'Java', 'Spring Boot', 'React', 'SQL', 'C', 'C++', 'Python', 'JavaScript'];

  useEffect(() => {
    courseService.getAllCourses()
      .then((res) => setCourses(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = 
      selectedCategory === 'ALL' ||
      course.languageName?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      course.frameworkName?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      course.title?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch = 
      !search.trim() ||
      course.title?.toLowerCase().includes(search.toLowerCase()) ||
      course.description?.toLowerCase().includes(search.toLowerCase()) ||
      course.languageName?.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-brand-50 text-brand-700 border border-brand-200">
            Curated Curriculum
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Developer Courses
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Step-by-step masterclasses with modular topics, interactive coding examples, quizzes, and hands-on projects.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 shadow-2xs transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading course curriculum...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No courses match your criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try selecting "ALL" or adjusting your search keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between space-y-5 hover:shadow-md group shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                    {course.level || 'All Levels'}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {course.estimatedHours || 30} hrs
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-2">
                    {course.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Progress</span>
                    <span>{course.progressPercentage || 0}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-600 rounded-full transition-all duration-300" 
                      style={{ width: `${course.progressPercentage || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">
                  {course.moduleCount || 3} Modules · {course.topicCount || 8} Topics
                </span>
                <Link
                  to={`/courses/${course.id}`}
                  className="flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  {course.progressPercentage > 0 ? 'Continue' : 'Start Course'} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
