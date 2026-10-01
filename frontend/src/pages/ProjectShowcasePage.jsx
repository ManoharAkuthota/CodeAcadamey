import React, { useState, useEffect } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, Layers, 
  Terminal, ShieldCheck, Database, Laptop, Star 
} from 'lucide-react';
import { projectService } from '../services/platformServices';

export default function ProjectShowcasePage() {
  const [projects, setProjects] = useState([]);
  const [tier, setTier] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    projectService.getProjects(tier)
      .then((res) => setProjects(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [tier]);

  const tiers = ['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
          Portfolio & Capstone Projects
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Project Recommendation Engine
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Synthesize your learned languages and frameworks into production-grade portfolio projects. Blueprints with required skills, architecture design, and features.
        </p>
      </div>

      {/* Tier Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {tiers.map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              tier === t 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading project blueprints...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div 
              key={proj.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-5 hover:shadow-2xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    proj.tier === 'BEGINNER' 
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                      : proj.tier === 'INTERMEDIATE' 
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                      : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                  }`}>
                    {proj.tier}
                  </span>

                  {proj.isRecommendedForUser && (
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-emerald-400" /> Recommended For You
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mt-1">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Tech Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack?.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Core Features</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {proj.features?.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-brand-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">~{proj.estimatedHours} Hours</span>
                <span className="text-brand-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Blueprint Ready <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
