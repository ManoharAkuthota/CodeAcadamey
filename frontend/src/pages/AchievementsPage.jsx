import React, { useState, useEffect } from 'react';
import { 
  Award, Trophy, Star, ShieldCheck, Lock, 
  Flame, Sparkles, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';
import { progressService } from '../services/platformServices';
import { useAuth } from '../context/AuthContext';

export default function AchievementsPage() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'UNLOCKED' | 'LOCKED'

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const res = await progressService.getAllAchievements();
      setAchievements(res.data || []);
    } catch (err) {
      console.error('Failed to load achievements:', err);
    } finally {
      setLoading(false);
    }
  };

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const totalCount = achievements.length;
  const progressPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  const currentLevel = user?.level || 1;
  const currentXp = user?.xp || 0;
  const xpForNextLevel = currentLevel * 250;
  const xpCurrentTier = currentXp % 250;
  const levelProgress = Math.min(100, Math.round((xpCurrentTier / 250) * 100));

  const filteredList = achievements.filter((a) => {
    if (filter === 'UNLOCKED') return a.isUnlocked;
    if (filter === 'LOCKED') return !a.isUnlocked;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Hero */}
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-50/70 via-white to-purple-50/40 border border-brand-200 p-6 md:p-8 overflow-hidden shadow-xs">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Gamification & Trophies</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Badges & Achievements
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Earn experience points, maintain daily coding streaks, and unlock specialized engineering badges by mastering topics and shipping test cases.
              </p>
            </div>

            {/* Level & XP Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full md:w-72 shrink-0 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Rank</span>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-1.5">
                    Level {currentLevel}
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Experience</span>
                  <h3 className="text-xl font-bold text-brand-600">{currentXp} XP</h3>
                </div>
              </div>

              {/* Progress bar to next level */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>Level {currentLevel}</span>
                  <span>{xpCurrentTier} / 250 XP</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-600 to-purple-600 transition-all duration-500"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{user?.streakDays || 1} Day Streak</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {unlockedCount}/{totalCount} Badges
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'ALL', label: 'All Badges' },
              { id: 'UNLOCKED', label: `Unlocked (${unlockedCount})` },
              { id: 'LOCKED', label: `Locked (${totalCount - unlockedCount})` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === t.id
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-mono hidden sm:block">
            {progressPercent}% Complete
          </div>
        </div>

        {/* Badges Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 rounded-2xl bg-white border border-slate-200 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredList.map((badge) => (
              <div
                key={badge.id}
                className={`relative rounded-2xl p-6 border transition-all flex flex-col justify-between shadow-xs ${
                  badge.isUnlocked
                    ? 'bg-white border-brand-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-70'
                }`}
              >
                <div className="space-y-4">
                  {/* Icon & Unlocked Status */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border text-xl ${
                      badge.isUnlocked
                        ? 'bg-brand-50 border-brand-200 text-brand-700'
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}>
                      {badge.icon || '🏆'}
                    </div>

                    {badge.isUnlocked ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold uppercase">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Unlocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-mono font-bold uppercase">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{badge.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{badge.description}</p>
                  </div>
                </div>

                {/* Footer with XP & Earned Date */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> +{badge.xpReward || 50} XP
                  </span>

                  {badge.isUnlocked && badge.earnedAt ? (
                    <span className="text-[10px] font-mono text-slate-500">
                      Earned {new Date(badge.earnedAt).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">Complete tasks to unlock</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
