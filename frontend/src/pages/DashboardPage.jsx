import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, CheckCircle, Award, Terminal, 
  Flame, Clock, Sparkles, ArrowRight, Play, 
  Layers, TrendingUp, BarChart2, Star
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, RadarChart, Radar, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { progressService } from '../services/platformServices';
import { courseService } from '../services/courseService';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      progressService.getDashboardAnalytics().catch(() => ({ data: null })),
      courseService.getAllCourses().catch(() => ({ data: [] }))
    ])
      .then(([progressRes, coursesRes]) => {
        setData(progressRes?.data || null);
        setCourses(coursesRes?.data || []);
      })
      .catch((err) => console.error('Failed to load dashboard data', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'TOTAL COURSES', value: data?.totalCoursesEnrolled || 1, icon: BookOpen, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { label: 'TOPICS COMPLETED', value: data?.topicsCompleted || 0, icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'QUIZ SCORE', value: `${data?.averageQuizScore || 0}%`, icon: Award, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { label: 'CODING PROBLEMS', value: data?.codingProblemsSolved || 0, icon: Terminal, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { label: 'CURRENT STREAK', value: `${data?.currentStreak || 1} Days`, icon: Flame, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { label: 'LEARNING HOURS', value: `${data?.learningHours || 1.5} hrs`, icon: Clock, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome & Resume Hero Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-brand-50/70 via-white to-emerald-50/40 border border-brand-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-brand-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Level: {data?.currentLevel || 'Beginner'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {user?.fullName || 'Developer'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Keep your momentum going. You have accumulated <strong className="text-brand-600 font-semibold">{data?.totalXp || 0} XP</strong>.
            Next milestone at <strong className="text-slate-900 font-semibold">{data?.nextLevelXp || 250} XP</strong>.
          </p>

          {/* XP Progress Bar */}
          <div className="pt-2 w-full max-w-md">
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
              <span>{data?.totalXp || 0} XP</span>
              <span>Target: {data?.nextLevelXp || 250} XP</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-600 to-emerald-500 transition-all duration-500"
                style={{ width: `${Math.min(100, ((data?.totalXp || 0) / (data?.nextLevelXp || 250)) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Quick Resume Learning Action */}
        {data?.resumeTopic && (
          <div className="shrink-0 p-5 rounded-2xl bg-white border border-slate-200 space-y-3 w-full md:w-auto shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Current Active Topic
            </span>
            <p className="text-sm font-bold text-slate-900 max-w-xs truncate">
              {data.resumeTopic.topicTitle}
            </p>
            <p className="text-xs text-brand-600 font-medium">
              {data.resumeTopic.courseTitle}
            </p>
            <Link
              to={data.resumeTopic.lessonId ? `/lesson/${data.resumeTopic.lessonId}` : `/course/${data.resumeTopic.courseId}`}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" /> Resume Learning
            </Link>
          </div>
        )}
      </div>

      {/* 6 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-2 hover:border-brand-300 shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider">
                  {card.label}
                </span>
                <div className={`p-1.5 rounded-lg border ${card.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-xl font-bold text-slate-900">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Enrolled Courses & Active Curriculum Tracks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600" /> Your Courses & Curriculum Tracks
            </h2>
            <p className="text-xs text-slate-500">Resume your active courses and master software engineering concepts</p>
          </div>
          <Link
            to="/courses"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
          >
            Explore All Courses <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.slice(0, 6).map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between space-y-4 hover:shadow-md group shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                    {course.level || 'All Levels'}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {course.estimatedHours || 30}h
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-1">
                    {course.description}
                  </p>
                </div>

                <div className="space-y-1 pt-1">
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

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[11px]">
                  {course.moduleCount || 3} Modules · {course.topicCount || 8} Topics
                </span>
                <Link
                  to={`/courses/${course.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  {course.progressPercentage > 0 ? 'Continue' : 'Start Course'} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section: Weekly Activity & Skill Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Learning Activity Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-brand-600" /> Weekly Learning Activity
              </h3>
              <p className="text-xs text-slate-500">XP points earned and lessons completed over the past 7 days</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.weeklyActivity || []}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                />
                <Bar dataKey="xp" fill="#16a34a" radius={[4, 4, 0, 0]} name="XP Earned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Proficiency Radar Chart */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-600" /> Skill Distribution
            </h3>
            <p className="text-xs text-slate-500">Technical competency map</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data?.skillDistribution || []}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={10} />
                <PolarRadiusAxis stroke="#cbd5e1" fontSize={9} />
                <Radar name="Skill Proficiency" dataKey="proficiency" stroke="#16a34a" fill="#16a34a" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Language Progress & Badges Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Language Progress Bars */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" /> Language Progress
          </h3>

          <div className="space-y-3">
            {data?.languageProgress?.map((lang, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{lang.language}</span>
                  <span className="font-mono text-slate-500">{lang.progressPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${lang.progressPercentage}%`, 
                      backgroundColor: lang.color || '#16a34a' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unlocked Badges Showcase */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Badges & Achievements
            </h3>
            <Link to="/achievements" className="text-xs text-brand-600 font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {data?.recentAchievements?.length > 0 ? (
              data.recentAchievements.map((badge, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 fill-amber-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{badge.title}</p>
                    <p className="text-[11px] text-slate-500 truncate">+{badge.xpReward} XP</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 py-8 text-center text-xs text-slate-500">
                Complete your first lesson or quiz to earn achievements!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
