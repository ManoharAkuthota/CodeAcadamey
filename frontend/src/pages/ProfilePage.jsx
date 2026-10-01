import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Calendar, Shield, Award, Flame, 
  BookOpen, Code2, CheckCircle2, Zap, Clock, ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { progressService } from '../services/platformServices';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressService.getDashboardAnalytics()
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header Banner */}
        <div className="relative rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-600 flex items-center justify-center text-3xl font-bold text-white shadow-xs shrink-0">
              {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
            </div>

            {/* Info */}
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {user?.fullName || user?.username}
                </h1>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                  user?.role === 'ROLE_ADMIN' 
                    ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                    : 'bg-brand-50 text-brand-700 border border-brand-200'
                }`}>
                  {user?.role === 'ROLE_ADMIN' ? 'Platform Administrator' : 'Software Engineering Student'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {user?.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2026'}
                </span>
              </div>
            </div>

            {/* Level / Streak Quick Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] font-mono uppercase text-slate-500">Current Level</div>
                <div className="text-lg font-bold text-amber-600 flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4 fill-amber-500 text-amber-500" /> {user?.level || 1}
                </div>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] font-mono uppercase text-slate-500">Streak</div>
                <div className="text-lg font-bold text-rose-600 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 fill-rose-500 text-rose-500" /> {user?.streakDays || 1}d
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium">Total Experience</span>
            <div className="text-xl font-bold text-brand-600">{user?.xp || analytics?.totalXp || 0} XP</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium">Topics Mastered</span>
            <div className="text-xl font-bold text-emerald-600">{analytics?.topicsCompleted || 0}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium">Problems Solved</span>
            <div className="text-xl font-bold text-purple-600">{analytics?.codingProblemsSolved || 0}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium">Avg Quiz Accuracy</span>
            <div className="text-xl font-bold text-teal-600">{analytics?.averageQuizScore || 100}%</div>
          </div>
        </div>

        {/* Language Mastery & Progress Breakdown */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-brand-600" /> Language Mastery Breakdown
          </h3>

          <div className="space-y-4 pt-2">
            {analytics?.languageProgress && analytics.languageProgress.length > 0 ? (
              analytics.languageProgress.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-slate-800">{item.language}</span>
                    <span className="text-slate-500">{item.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.progressPercentage}%`,
                        backgroundColor: item.color || '#16a34a',
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">Start learning a language course to track mastery percentages.</p>
            )}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Recent Trophies & Badges
            </h3>
            <Link
              to="/achievements"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              View All <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {analytics?.recentAchievements && analytics.recentAchievements.length > 0 ? (
              analytics.recentAchievements.map((ach) => (
                <div key={ach.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="text-2xl">{ach.icon || '🏆'}</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{ach.title}</h4>
                    <p className="text-[10px] text-slate-500">{ach.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 col-span-3">No badges unlocked yet. Complete lessons and quizzes to earn badges!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
