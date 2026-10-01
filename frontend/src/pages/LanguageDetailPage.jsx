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
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
              {langData.difficulty} Tier
            </span>
            <span className="text-xs text-slate-500">Prerequisites: {langData.prerequisites}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {langData.name} Programming Track
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {langData.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            to="/coding-practice"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Terminal className="w-4 h-4" /> Practice Problems
          </Link>
          <Link
            to="/interview-prep"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <HelpCircle className="w-4 h-4" /> Interview Prep
          </Link>
        </div>
      </div>

      {/* Why Learn It Section */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
        <h3 className="text-sm font-bold text-brand-700 uppercase tracking-wider">
          Why Learn {langData.name}?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {langData.whyLearn}
        </p>
      </div>

      {/* Courses in this Language */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Available Courses & Roadmaps</h3>
        
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {course.level}
                  </span>
                  <h4 className="font-bold text-base text-slate-900">{course.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">{course.estimatedHours} hrs</span>
                  <Link
                    to={`/course/${course.id}`}
                    className="flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Start Course <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs text-center space-y-3">
            <p className="text-sm text-slate-600">
              Interactive coding challenges and interview questions are active for {langData.name}.
            </p>
            <Link
              to="/coding-practice"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs"
            >
              Open Monaco Coding Lab <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
