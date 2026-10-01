import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Cpu, Coffee, Terminal, Code, Database, 
  Layers, ArrowRight, Award, Play, BookOpen, 
  HelpCircle, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { courseService } from '../services/courseService';

export default function LanguageDetailPage() {
  const { language } = useParams();
  const [langData, setLangData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (language) {
      setLoading(true);
      courseService.getLanguageBySlug(language)
        .then((res) => {
          setLangData(res.data);
          if (res.data?.id) {
            return courseService.getCoursesByLanguage(res.data.id);
          }
          return { data: [] };
        })
        .then((cRes) => setCourses(cRes.data || []))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!langData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <p className="text-slate-400 mb-4">Language specification not found.</p>
        <Link to="/languages" className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold">
          All Languages
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Language Hero Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {langData.difficulty} Tier
            </span>
            <span className="text-xs text-slate-400">Prerequisites: {langData.prerequisites}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {langData.name} Programming Track
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            {langData.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            to="/coding-practice"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4" /> Practice Problems
          </Link>
          <Link
            to="/interview-prep"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4" /> Interview Prep
          </Link>
        </div>
      </div>

      {/* Why Learn It Section */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand-400">
          Why Learn {langData.name}?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {langData.whyLearn}
        </p>
      </div>

      {/* Courses in this Language */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Available Courses & Roadmaps</h3>
        
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                    {course.level}
                  </span>
                  <h4 className="font-bold text-base text-white">{course.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">{course.estimatedHours} hrs</span>
                  <Link
                    to={`/course/${course.id}`}
                    className="flex items-center gap-1.5 font-semibold text-brand-400 hover:text-brand-300"
                  >
                    Start Course <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
            <p className="text-sm text-slate-400">
              Interactive coding challenges and interview questions are active for {langData.name}.
            </p>
            <Link
              to="/coding-practice"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
            >
              Open Monaco Coding Lab <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
