import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, Clock, CheckCircle2, Lock, 
  Play, ArrowRight, Award, ChevronDown, ChevronUp 
} from 'lucide-react';
import { courseService } from '../services/courseService';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      courseService.getCourseById(courseId)
        .then((res) => {
          setCourse(res.data);
          // Expand all modules by default
          const exp = {};
          res.data?.modules?.forEach(m => exp[m.id] = true);
          setExpandedModules(exp);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [courseId]);

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <p className="text-slate-400 mb-4">Course not found.</p>
        <Link to="/courses" className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold">
          All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Course Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded border border-brand-500/20">
              {course.level}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {course.estimatedHours} Hours
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {course.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {course.description}
          </p>

          {/* Progress Indicator */}
          <div className="pt-2 max-w-md space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>{course.completedTopics} of {course.totalTopics} Topics Completed</span>
              <span>{course.progressPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 rounded-full transition-all duration-500"
                style={{ width: `${course.progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Start / Resume Action */}
        <div className="shrink-0 w-full md:w-auto">
          {course.modules?.[0]?.topics?.[0]?.lessonId && (
            <Link
              to={`/lesson/${course.modules[0].topics[0].lessonId}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-xl shadow-brand-600/25 flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" /> Start First Lesson
            </Link>
          )}
        </div>
      </div>

      {/* Curriculum Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Course Curriculum & Modules</h2>

        <div className="space-y-4">
          {course.modules?.map((module, mIdx) => {
            const isExpanded = expandedModules[module.id];
            return (
              <div 
                key={module.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
              >
                {/* Module Accordion Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-850 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-brand-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {mIdx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-white">{module.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{module.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="text-xs font-mono">{module.topics?.length || 0} topics</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Topics List */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 divide-y divide-slate-800/50 bg-slate-950/40">
                    {module.topics?.map((topic) => (
                      <div 
                        key={topic.id}
                        className="p-4 sm:px-6 flex items-center justify-between gap-4 text-xs hover:bg-slate-900/60 transition-colors"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          {topic.isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : topic.isLocked ? (
                            <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0 mt-0.5" />
                          )}

                          <div>
                            <p className={`font-semibold ${topic.isLocked ? 'text-slate-400' : 'text-slate-200'}`}>
                              {topic.title}
                            </p>
                            {topic.summary && (
                              <p className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">
                                {topic.summary}
                              </p>
                            )}
                            {topic.isLocked && topic.prerequisiteTopicTitle && (
                              <p className="text-[10px] text-amber-400 font-mono mt-0.5">
                                Locked: Complete "{topic.prerequisiteTopicTitle}" first
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Navigation link if unlocked */}
                        <div className="shrink-0">
                          {topic.isLocked ? (
                            <span className="text-[11px] text-slate-500 font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800">
                              Locked
                            </span>
                          ) : (
                            <Link
                              to={topic.lessonId ? `/lesson/${topic.lessonId}` : '#'}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 text-xs font-semibold border border-brand-500/20 transition-colors"
                            >
                              <span>{topic.isCompleted ? 'Review' : 'Start'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
