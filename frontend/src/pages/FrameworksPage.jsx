import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Layers, Server, Cpu, 
  ArrowRight, BookOpen, Terminal, CheckCircle2 
} from 'lucide-react';
import { courseService } from '../services/courseService';

export default function FrameworksPage() {
  const [frameworks, setFrameworks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService.getAllFrameworks()
      .then((res) => setFrameworks(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['ALL', 'Java', 'JavaScript', 'Python'];

  const filtered = selectedCategory === 'ALL'
    ? frameworks
    : frameworks.filter(f => f.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
          Enterprise Frameworks & Tooling
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Modern Frameworks & Cloud Stacks
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Master industry standards: Spring Boot microservices, React single page applications, Node.js non-blocking backends, and Django rapid prototyping.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat} {cat !== 'ALL' && 'Ecosystem'}
          </button>
        ))}
      </div>

      {/* Frameworks Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading framework specifications...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((fw) => (
            <div 
              key={fw.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                    {fw.category} Ecosystem
                  </span>
                  <h3 className="text-2xl font-bold text-white">{fw.name}</h3>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-brand-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <h4 className="font-semibold text-slate-300">What is it?</h4>
                  <p className="text-slate-400 mt-0.5">{fw.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-300">Why use it?</h4>
                  <p className="text-slate-400 mt-0.5">{fw.whyUseIt}</p>
                </div>

                {fw.architecture && (
                  <div>
                    <h4 className="font-semibold text-slate-300">Architecture Pipeline</h4>
                    <div className="mt-1 p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                      {fw.architecture}
                    </div>
                  </div>
                )}

                {fw.coreConcepts && (
                  <div>
                    <h4 className="font-semibold text-slate-300">Core Concepts</h4>
                    <p className="text-slate-400 mt-0.5 font-mono text-[11px]">{fw.coreConcepts}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Prerequisites: {fw.prerequisites}</span>
                <Link
                  to="/courses"
                  className="flex items-center gap-1.5 font-semibold text-brand-400 hover:text-brand-300"
                >
                  Explore Course Track <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
