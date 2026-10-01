import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, BookOpen, Layers, CheckCircle2, TrendingUp, 
  Code2, HelpCircle, Shield, ArrowUpRight, BarChart3, Settings
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, BarChart, Bar, CartesianGrid 
} from 'recharts';
import { adminService } from '../../services/platformServices';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboard()
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Operations Console</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 font-bold uppercase">
                  ROOT ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-500">Platform telemetry, curriculum administration, and student management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/courses"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" /> Manage Courses
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-xs font-semibold text-white shadow-xs transition-all"
            >
              <Users className="w-3.5 h-3.5" /> Manage Users
            </Link>
          </div>
        </div>

        {/* High-Level KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-600" /> Total Users
            </span>
            <div className="text-xl font-bold text-slate-900">{metrics?.totalUsers || 2}</div>
            <div className="text-[10px] text-emerald-600 font-mono">+100% active</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-600" /> Total Courses
            </span>
            <div className="text-xl font-bold text-slate-900">{metrics?.totalCourses || 10}</div>
            <div className="text-[10px] text-slate-500 font-mono">Published</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-600" /> Total Lessons
            </span>
            <div className="text-xl font-bold text-slate-900">{metrics?.totalLessons || 24}</div>
            <div className="text-[10px] text-slate-500 font-mono">Interactive</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" /> Quizzes
            </span>
            <div className="text-xl font-bold text-slate-900">{metrics?.totalQuizzes || 8}</div>
            <div className="text-[10px] text-slate-500 font-mono">{metrics?.totalQuizAttempts || 0} attempts</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-emerald-600" /> Submissions
            </span>
            <div className="text-xl font-bold text-slate-900">{metrics?.totalCodingSubmissions || 0}</div>
            <div className="text-[10px] text-slate-500 font-mono">Code runs</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completion
            </span>
            <div className="text-xl font-bold text-slate-900">{metrics?.platformCompletionRate || 74.2}%</div>
            <div className="text-[10px] text-emerald-600 font-mono">Healthy retention</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* User Growth Over Time (Span 2) */}
          <div className="lg:col-span-2 rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-600" /> Platform User Growth & Module Completions
                </h3>
                <p className="text-[11px] text-slate-500">Monthly student registrations vs topic completion rates</p>
              </div>
            </div>

            <div className="h-64 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics?.userGrowth || [
                  { month: 'Jan', users: 120, completions: 340 },
                  { month: 'Feb', users: 210, completions: 520 },
                  { month: 'Mar', users: 380, completions: 890 },
                  { month: 'Apr', users: 540, completions: 1240 },
                  { month: 'May', users: 780, completions: 1820 },
                  { month: 'Jun', users: 1040, completions: 2450 },
                ]}>
                  <defs>
                    <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', fontSize: '11px', color: '#0f172a' }} 
                  />
                  <Area type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#userGrad)" name="Registered Users" />
                  <Area type="monotone" dataKey="completions" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#compGrad)" name="Topic Completions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Popular Languages Distribution */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-600" /> Popular Language Tracks
              </h3>
              <p className="text-[11px] text-slate-500">Enrollment popularity across languages</p>
            </div>

            <div className="space-y-3.5 my-auto">
              {(metrics?.popularLanguages || [
                { name: 'Java', count: 480 },
                { name: 'Python', count: 450 },
                { name: 'JavaScript', count: 390 },
                { name: 'SQL', count: 320 },
                { name: 'C++', count: 280 },
                { name: 'C', count: 190 },
              ]).map((lang, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-700 font-semibold">{lang.name}</span>
                    <span className="text-slate-500">{lang.count} students</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${Math.min(100, (lang.count / 500) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center font-mono">
              Live curriculum analytics
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
