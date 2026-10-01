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
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-brand-50 text-brand-700 border border-brand-200">
          Portfolio & Capstone Projects
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Project Recommendation Engine
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Synthesize your learned languages and frameworks into production-grade portfolio projects. Blueprints with required skills, architecture design, and features.
        </p>
      </div>

      {/* Tier Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {tiers.map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              tier === t 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs'
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
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between space-y-5 hover:shadow-md group shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    proj.tier === 'BEGINNER' 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : proj.tier === 'INTERMEDIATE' 
                      ? 'bg-amber-50 text-amber-700 border-amber-200' 
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                  }`}>
                    {proj.tier}
                  </span>

                  {proj.isRecommendedForUser && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" /> Recommended For You
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-1">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Tech Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack?.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Core Features</span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {proj.features?.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3 h-3 text-brand-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">~{proj.estimatedHours} Hours</span>
                <span className="text-brand-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
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
