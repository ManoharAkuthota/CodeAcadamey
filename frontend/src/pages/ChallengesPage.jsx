import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, CheckCircle2, Search, ArrowRight, 
  Terminal, Sparkles, Trophy, Zap, Filter
} from 'lucide-react';
import { codingService } from '../services/codingService';

export default function ChallengesPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const res = await codingService.getAllProblems();
      setProblems(res.data || []);
    } catch (err) {
      console.error('Failed to load problems:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['ALL', ...new Set(problems.map((p) => p.category).filter(Boolean))];

  const filteredProblems = problems.filter((p) => {
    const matchesDiff = difficultyFilter === 'ALL' || p.difficulty === difficultyFilter;
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    const matchesSearch = !searchQuery.trim() || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesCat && matchesSearch;
  });

  const solvedCount = problems.filter((p) => p.isSolved).length;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Hero */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>Algorithmic & System Challenges</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Coding Challenges Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Solve real-world programming problems across Java, Python, C++, JavaScript, and SQL. Run your code against verified automated test cases in Monaco Editor.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-4 shrink-0 shadow-xs">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500">Solved Status</span>
              <div className="text-base font-bold text-slate-900">
                {solvedCount} / {problems.length} Solved
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {/* Difficulty Tabs */}
            {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  difficultyFilter === diff
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs'
                }`}
              >
                {diff === 'ALL' ? 'All Difficulties' : diff}
              </button>
            ))}

            {/* Category Dropdown */}
            {categories.length > 1 && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-medium text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-500 shadow-2xs"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'ALL' ? 'All Categories' : c}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Challenge Cards Grid */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-white border border-slate-200 animate-pulse"></div>
            ))}
          </div>
        ) : filteredProblems.length > 0 ? (
          <div className="space-y-3">
            {filteredProblems.map((prob) => (
              <div
                key={prob.id}
                className="group bg-white hover:border-brand-300 border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-xs hover:shadow-md"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      prob.difficulty === 'EASY'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : prob.difficulty === 'MEDIUM'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {prob.difficulty}
                    </span>

                    <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {prob.category}
                    </span>

                    {prob.isSolved && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {prob.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-1">
                    {prob.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-mono text-amber-600 font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> +50 XP
                  </span>

                  <Link
                    to={`/practice?problem=${prob.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer"
                  >
                    Solve Challenge <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-200 bg-white">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">No challenges found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
              Try adjusting your difficulty or category filters.
            </p>
            <button
              onClick={() => { setDifficultyFilter('ALL'); setCategoryFilter('ALL'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
