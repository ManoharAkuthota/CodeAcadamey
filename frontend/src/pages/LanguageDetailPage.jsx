import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Cpu, Coffee, Terminal, Code, Database, 
  Layers, ArrowRight, Award, Play, BookOpen, 
  HelpCircle, CheckCircle2, ShieldAlert, DollarSign,
  Briefcase, Sparkles, FolderGit2
} from 'lucide-react';
import { courseService } from '../services/courseService';

export default function LanguageDetailPage() {
  const { language, slug } = useParams();
  const targetSlug = language || slug || 'java';
  const [langData, setLangData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (targetSlug) {
      setLoading(true);
      courseService.getLanguageBySlug(targetSlug)
        .then((res) => {
          setLangData(res.data);
          if (res.data?.slug || res.data?.id) {
            return courseService.getCoursesByLanguage(res.data.slug || res.data.id);
          }
          return { data: [] };
        })
        .then((cRes) => setCourses(cRes.data || []))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [targetSlug]);

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
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
              {langData.difficulty} Tier
            </span>
            {langData.averageSalary && (
              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> {langData.averageSalary}
              </span>
            )}
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
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Terminal className="w-4 h-4" /> Practice in Code Lab
          </Link>
          <Link
            to="/interview-prep"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> Interview Prep
          </Link>
        </div>
      </div>

      {/* Why Learn It & Career Outcomes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Why Master {langData.name}?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {langData.whyLearn}
          </p>

          {/* Key Architectural Highlights */}
          {langData.keyFeatures && (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                Key Technical Strengths:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {langData.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Target Career Roles */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>Target Career Roles</span>
          </div>
          <p className="text-xs text-slate-500">
            Industry positions that prioritize deep mastery of {langData.name}:
          </p>
          <div className="space-y-2 pt-1">
            {(langData.careerRoles || ['Software Engineer', 'Backend Developer', 'Systems Architect']).map((role, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between">
                <span>{role}</span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-World Projects You Will Build */}
      {langData.projectIdeas && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider">
              <FolderGit2 className="w-4 h-4" />
              <span>Real-World Projects in this Track</span>
            </div>
            <span className="text-xs font-mono text-slate-500">Resume-Ready</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {langData.projectIdeas.map((project, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-brand-300 transition-colors">
                <span className="text-[10px] font-mono text-slate-400 block">Project 0{idx + 1}</span>
                <h4 className="font-bold text-xs text-slate-900">{project}</h4>
                <p className="text-[11px] text-slate-500">Hands-on application synthesizing core patterns.</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Courses & Curriculum in this Language */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Curriculum & Course Tracks</h3>
          <span className="text-xs font-mono text-slate-500">
            {courses.length} {courses.length === 1 ? 'Track' : 'Tracks'} Available
          </span>
        </div>
        
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      {course.level}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{course.estimatedHours} hrs</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{course.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="text-[11px] text-slate-500 font-mono pt-1">
                    {course.modules?.length || course.moduleCount || 4} Modules • {course.topicCount || 15} Topics
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Interactive
                  </span>
                  <Link
                    to={`/course/${course.id}`}
                    className="flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Start Curriculum <ArrowRight className="w-4 h-4" />
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
