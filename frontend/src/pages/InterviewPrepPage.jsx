import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, Terminal, 
  Sparkles, CheckCircle2, Bookmark 
} from 'lucide-react';
import { interviewService } from '../services/platformServices';

export default function InterviewPrepPage() {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState('ALL');
  const [level, setLevel] = useState('ALL');
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    interviewService.getQuestions(category, level)
      .then((res) => {
        setQuestions(res.data || []);
        // Expand first 2 questions by default
        const exp = {};
        if (res.data?.length > 0) exp[0] = true;
        if (res.data?.length > 1) exp[1] = true;
        setExpandedItems(exp);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category, level]);

  const toggleExpand = (idx) => {
    setExpandedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const categories = ['ALL', 'Java', 'Spring Boot', 'SQL', 'React', 'Python', 'C / C++'];
  const levels = ['ALL', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-brand-50 text-brand-700 border border-brand-200">
          Interview Preparation Hub
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Technical Interview Questions & Architecture Answers
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          High-yield conceptual and coding questions for software engineering interviews. Master JVM memory, Spring IoC, React reconciliation, and database indexing.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                category === cat 
                  ? 'bg-brand-600 text-white shadow-xs' 
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Level Selector */}
        <div className="flex items-center gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                level === lvl ? 'bg-slate-100 text-brand-700 font-bold border border-slate-200' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Question Accordion List */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading interview questions...</div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const isExp = expandedItems[idx];
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-brand-300 transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                        {q.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {q.level}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {q.question}
                    </h3>
                  </div>

                  <div className="p-1 text-slate-400 shrink-0">
                    {isExp ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExp && (
                  <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs leading-relaxed">
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Architectural Answer:</h4>
                      <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                        {q.answer}
                      </p>
                    </div>

                    {q.codeSnippet && (
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] uppercase text-slate-500 font-bold">Illustrative Snippet</span>
                        <pre className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-mono text-xs overflow-x-auto shadow-2xs">
                          <code>{q.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {q.keyPoints?.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="font-semibold text-slate-800">Key Takeaways:</span>
                        <ul className="space-y-1 pl-1">
                          {q.keyPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
