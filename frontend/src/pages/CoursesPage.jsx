import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, Layers, Sparkles } from 'lucide-react';
import { courseService } from '../services/courseService';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService.getAllCourses()
      .then((res) => setCourses(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
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

      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading course curriculum...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between space-y-5 hover:shadow-md group shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                    {course.level}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {course.estimatedHours} hrs
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

                {course.progressPercentage > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-slate-500">
                      <span>Progress</span>
                      <span>{course.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-600 rounded-full" 
                        style={{ width: `${course.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">
                  {course.moduleCount} Modules · {course.topicCount} Topics
                </span>
                <Link
                  to={`/course/${course.id}`}
                  className="flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  Start Course <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
