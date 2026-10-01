import React from 'react';
import { Sparkles, BookOpen, Lightbulb, Compass } from 'lucide-react';

export default function AnalogyModeCard({ mode, onToggleMode, analogyData, technicalSummary }) {
  const isAnalogy = mode === 'analogy';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Mode Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl border ${isAnalogy ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-brand-50 border-brand-200 text-brand-700'}`}>
            {isAnalogy ? <Lightbulb className="w-5 h-5" /> : <Compass className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {isAnalogy ? 'Simple Analogy Mode (ELI5)' : 'Engineering Deep-Dive Mode'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAnalogy ? 'Understood through intuitive everyday life metaphors' : 'Formal technical mechanics and runtime architecture'}
            </p>
          </div>
        </div>

        {/* Toggle Pills */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => onToggleMode('technical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              !isAnalogy 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Technical
          </button>
          <button
            onClick={() => onToggleMode('analogy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isAnalogy 
                ? 'bg-amber-500 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Simple Analogy
          </button>
        </div>
      </div>

      {/* Content Area */}
      {isAnalogy ? (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <span>{analogyData?.title || '💡 The Everyday Metaphor'}</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-800">
              {analogyData?.story || 'Think of this concept like an international airport terminal where everyone speaks different languages, but the universal translator allows all flight crews to coordinate seamlessly without retraining.'}
            </p>
          </div>

          {/* Analogy Breakdown Grid */}
          {analogyData?.comparisons && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {analogyData.comparisons.map((c, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="text-amber-600 font-mono">✦</span> {c.realWorld}
                  </div>
                  <div className="text-slate-600 text-[11px] leading-relaxed">
                    <span className="font-semibold text-brand-700">Code Equivalent: </span>
                    {c.programming}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
          {technicalSummary || 'This topic focuses on JVM specification execution, memory allocation frames, type safety constraints, and compiled bytecode operations.'}
        </div>
      )}
    </div>
  );
}
