import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight, RotateCcw, Cpu, Terminal, Layers } from 'lucide-react';

export default function InteractiveExecutionStepper({ steps, codeSnippet, language = 'java' }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  if (!steps || steps.length === 0) return null;

  const currentStep = steps[currentStepIdx] || steps[0];
  const lines = (codeSnippet || '').trim().split('\n');

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Step-by-Step Code Execution Visualizer</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold">
                Interactive
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Watch how the runtime engine processes this code line by line
            </p>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIdx(0)}
            disabled={currentStepIdx === 0}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
            title="Reset to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}
            disabled={currentStepIdx === 0}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev
          </button>
          <span className="text-xs font-mono text-slate-600 px-1">
            {currentStepIdx + 1} / {steps.length}
          </span>
          <button
            onClick={() => setCurrentStepIdx(Math.min(steps.length - 1, currentStepIdx + 1))}
            disabled={currentStepIdx === steps.length - 1}
            className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1 disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Stepper Body: Code View on Left, Memory & Explanation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Code with Line Highlight */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden font-mono text-xs">
          <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 text-[11px] text-slate-600 font-sans flex items-center justify-between">
            <span className="font-mono">Execution Flow</span>
            <span className="text-[10px] text-brand-700 font-semibold font-mono">
              Line {currentStep.activeLine || 1} active
            </span>
          </div>
          <div className="p-3 overflow-x-auto bg-white">
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isActive = lineNum === currentStep.activeLine;
              return (
                <div
                  key={idx}
                  className={`flex items-center py-0.5 px-2 rounded font-mono transition-colors ${
                    isActive
                      ? 'bg-amber-100 border-l-4 border-amber-500 font-bold text-slate-900'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="select-none text-slate-400 w-6 text-right mr-3 font-mono text-[11px]">
                    {lineNum}
                  </span>
                  <span className="truncate">{line}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Explanation & Memory State */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          {/* Plain English What Happens Now */}
          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-purple-900 font-bold text-xs uppercase tracking-wider">
              <span>Step {currentStepIdx + 1}: {currentStep.title}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentStep.explanation}
            </p>
          </div>

          {/* Virtual Stack Frame / Memory Tracker */}
          {currentStep.memoryState && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Memory Stack Frame</span>
              </div>
              <div className="space-y-1 font-mono text-[11px]">
                {Object.entries(currentStep.memoryState).map(([variable, val], i) => (
                  <div key={i} className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200">
                    <span className="text-blue-700 font-bold">{variable}</span>
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terminal Output Snapshot */}
          <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans border-b border-slate-800 pb-1">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-emerald-400" /> Console Stdout
              </span>
              <span>exit 0</span>
            </div>
            <div className="text-emerald-400 pt-1">
              {currentStep.consoleOutput || '(no output produced yet)'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
