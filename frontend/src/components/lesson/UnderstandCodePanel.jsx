import React from 'react';
import { 
  HelpCircle, Sparkles, Cpu, AlertTriangle, 
  Lightbulb, Briefcase, CheckCircle2 
} from 'lucide-react';

export default function UnderstandCodePanel({ codeExplanationJson, realWorldExample, commonMistakes, bestPractices }) {
  let explanation = {};
  try {
    if (codeExplanationJson) {
      explanation = typeof codeExplanationJson === 'string' 
        ? JSON.parse(codeExplanationJson) 
        : codeExplanationJson;
    }
  } catch (e) {
    explanation = {};
  }

  const aspects = [
    {
      title: '1. What Does This Code Do?',
      icon: Lightbulb,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      content: explanation.whatDoesItDo || 'Executes the core algorithm and handles data manipulation.'
    },
    {
      title: '2. Why Is It Needed?',
      icon: Sparkles,
      color: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
      content: explanation.whyNeeded || 'Essential for ensuring type safety, modularity, and maintainable state.'
    },
    {
      title: '3. How Does It Work?',
      icon: CheckCircle2,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      content: explanation.howItWorks || 'Evaluates expressions sequentially and executes scoped function calls.'
    },
    {
      title: '4. What Happens Internally?',
      icon: Cpu,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      content: explanation.internalMechanics || 'Allocates stack memory frames and updates heap references in runtime memory.'
    },
    {
      title: '5. Real-World Usage',
      icon: Briefcase,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      content: realWorldExample || explanation.realWorldUsage || 'Applied in production microservices and enterprise backend layers.'
    },
    {
      title: '6. Common Mistakes to Avoid',
      icon: AlertTriangle,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      content: commonMistakes || explanation.commonMistakes || 'Check null pointer references and array bound limits.'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Understand This Code</h3>
            <p className="text-xs text-slate-400">Deep structural breakdown across 6 architectural dimensions</p>
          </div>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
          Concept Deep Dive
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aspects.map((aspect, idx) => {
          const Icon = aspect.icon;
          return (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg border ${aspect.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-xs text-slate-200">{aspect.title}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-1">
                {aspect.content}
              </p>
            </div>
          );
        })}
      </div>

      {bestPractices && (
        <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-emerald-200">Industry Best Practice: </span>
            {bestPractices}
          </div>
        </div>
      )}
    </div>
  );
}
