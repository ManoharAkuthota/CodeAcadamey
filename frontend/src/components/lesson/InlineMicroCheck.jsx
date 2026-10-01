import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InlineMicroCheck({ questionData }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!questionData) return null;

  const isCorrect = selectedIdx === questionData.correctIndex;

  const handleSelect = (idx) => {
    if (submitted) return;
    setSelectedIdx(idx);
    setSubmitted(true);

    if (idx === questionData.correctIndex) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleReset = () => {
    setSelectedIdx(null);
    setSubmitted(false);
  };

  return (
    <div className="my-6 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50/50 via-white to-slate-50 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-brand-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-100 text-brand-700">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
            Instant Knowledge Check
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          Reinforce Your Understanding
        </span>
      </div>

      {/* Question Prompt */}
      <div>
        <p className="text-sm font-bold text-slate-900 leading-snug">
          {questionData.prompt}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {questionData.options.map((option, idx) => {
          let stateStyle = 'bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-slate-50';

          if (submitted) {
            if (idx === questionData.correctIndex) {
              stateStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
            } else if (idx === selectedIdx) {
              stateStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
            } else {
              stateStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${stateStyle}`}
            >
              <span>{option}</span>
              {submitted && idx === questionData.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {submitted && idx === selectedIdx && idx !== questionData.correctIndex && (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {submitted && (
        <div className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1.5 animate-in fade-in duration-200 ${
          isCorrect ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' : 'bg-rose-50/80 border-rose-200 text-rose-900'
        }`}>
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5">
              {isCorrect ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Spot on! You understand this concept.
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Good try! Review the reasoning below:
                </>
              )}
            </span>
            <button
              onClick={handleReset}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Try Again
            </button>
          </div>
          <p className="text-slate-700 text-xs">
            {questionData.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
