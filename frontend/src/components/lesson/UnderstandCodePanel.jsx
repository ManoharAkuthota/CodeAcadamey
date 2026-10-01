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
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      content: explanation.whatDoesItDo || 'Executes the core algorithm and handles data manipulation.'
    },
    {
      title: '2. Why Is It Needed?',
      icon: Sparkles,
      color: 'text-brand-700 bg-brand-50 border-brand-200',
      content: explanation.whyNeeded || 'Essential for ensuring type safety, modularity, and maintainable state.'
    },
    {
      title: '3. How Does It Work?',
      icon: CheckCircle2,
      color: 'text-cyan-700 bg-cyan-50 border-cyan-200',
      content: explanation.howItWorks || 'Evaluates expressions sequentially and executes scoped function calls.'
    },
    {
      title: '4. What Happens Internally?',
      icon: Cpu,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      content: explanation.internalMechanics || 'Allocates stack memory frames and updates heap references in runtime memory.'
    },
    {
      title: '5. Real-World Usage',
      icon: Briefcase,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      content: realWorldExample || explanation.realWorldUsage || 'Applied in production microservices and enterprise backend layers.'
    },
    {
      title: '6. Common Mistakes to Avoid',
      icon: AlertTriangle,
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      content: commonMistakes || explanation.commonMistakes || 'Check null pointer references and array bound limits.'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-brand-50 border border-brand-200 text-brand-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Understand This Code</h3>
            <p className="text-xs text-slate-500">Deep structural breakdown across 6 architectural dimensions</p>
          </div>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200 font-bold">
          Concept Deep Dive
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aspects.map((aspect, idx) => {
          const Icon = aspect.icon;
          return (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all shadow-xs space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg border ${aspect.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">{aspect.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-1">
                {aspect.content}
              </p>
            </div>
          );
        })}
      </div>

      {bestPractices && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-emerald-800">Industry Best Practice: </span>
            {bestPractices}
          </div>
        </div>
      )}
    </div>
  );
}
