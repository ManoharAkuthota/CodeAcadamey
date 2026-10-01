import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Coffee, Terminal, Code, Database, 
  Layers, ArrowRight, CheckCircle2, BookOpen 
} from 'lucide-react';
import { courseService } from '../services/courseService';

export default function LanguagesPage() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService.getAllLanguages()
      .then((res) => setLanguages(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getLanguageIcon = (name) => {
    switch (name?.toLowerCase()) {
      case 'c': return Cpu;
      case 'c++': return Layers;
      case 'java': return Coffee;
      case 'python': return Terminal;
      case 'javascript': return Code;
      case 'sql / mysql': return Database;
      default: return Terminal;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
          Core Languages Catalog
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Master 6 Foundational Languages
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          From hardware-level C pointers to high-performance C++, enterprise Java, Python scripting, dynamic JavaScript, and relational SQL.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading programming curriculum...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang) => {
            const Icon = getLanguageIcon(lang.name);
            return (
              <div 
                key={lang.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-5 group hover:shadow-2xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: `${lang.color}20`, border: `1px solid ${lang.color}40`, color: lang.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {lang.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
                      {lang.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1 line-clamp-3">
                      {lang.description}
                    </p>
                  </div>

                  {lang.userProgressPercentage > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-slate-400">
                        <span>Progress</span>
                        <span>{lang.userProgressPercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-500 rounded-full" 
                          style={{ width: `${lang.userProgressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    {lang.courseCount} {lang.courseCount === 1 ? 'Course' : 'Courses'}
                  </span>
                  <Link
                    to={`/languages/${lang.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    View Curriculum <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
