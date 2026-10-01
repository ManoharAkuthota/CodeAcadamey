import React, { useState } from 'react';
import { Copy, Check, Terminal, Play, RotateCcw, Edit3, Eye } from 'lucide-react';

export default function CodeSnippetBlock({ code, language = 'java', title, onCodeChange }) {
  const [copied, setCopied] = useState(false);
  const [editableCode, setEditableCode] = useState(code || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(null);

  const handleCopy = () => {
    if (!editableCode) return;
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      // Generate realistic simulated output based on language and code content
      let simulatedOutput = '';
      if (editableCode.includes('println') || editableCode.includes('print')) {
        const matches = editableCode.match(/(?:println|print|console\.log)\(([^)]+)\)/g);
        if (matches && matches.length > 0) {
          simulatedOutput = matches
            .map(m => {
              const inside = m.replace(/^(println|print|console\.log)\(/, '').replace(/\)$/, '');
              // Clean quotes and simple concatenation
              return inside.replace(/"/g, '').replace(/'/g, '').replace(/\s*\+\s*/g, ' ');
            })
            .join('\n');
        } else {
          simulatedOutput = 'Hello, CodePath Academy!\nLearning Java 21 LTS in 2026';
        }
      } else if (editableCode.includes('SELECT')) {
        simulatedOutput = '+----+-------------------+------------+\n| id | name              | role       |\n+----+-------------------+------------+\n|  1 | Alex Developer    | Lead Dev   |\n|  2 | Maria Engineer    | Architect  |\n+----+-------------------+------------+\n2 rows in set (0.02 sec)';
      } else {
        simulatedOutput = `[${language.toUpperCase()} RUNTIME] Code executed successfully.\nProcess finished with exit code 0`;
      }

      setOutput({
        stdout: simulatedOutput,
        executionTime: '0.14s',
        status: 'SUCCESS'
      });
    }, 600);
  };

  const handleReset = () => {
    setEditableCode(code || '');
    setOutput(null);
  };

  const lines = editableCode ? editableCode.trim().split('\n') : [];

  return (
    <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
      {/* Code Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 text-xs gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          </div>
          <Terminal className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-mono text-slate-700 font-medium">
            {title || `Example.${language === 'c' ? 'c' : language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'sql' ? 'sql' : 'java'}`}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 text-[11px] font-semibold transition-colors cursor-pointer"
            title="Edit code in sandbox"
          >
            {isEditing ? <Eye className="w-3 h-3 text-brand-600" /> : <Edit3 className="w-3 h-3 text-slate-500" />}
            <span>{isEditing ? 'Read-Only' : 'Edit / Sandbox'}</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            title="Run this code"
          >
            <Play className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          {isEditing && (
            <button
              onClick={handleReset}
              className="p-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Reset code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 text-[11px] font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      {isEditing ? (
        <div className="p-4 bg-white">
          <textarea
            value={editableCode}
            onChange={(e) => setEditableCode(e.target.value)}
            className="w-full min-h-[140px] font-mono text-xs text-slate-800 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500 resize-y leading-relaxed"
            placeholder="Write or modify your code here..."
          />
        </div>
      ) : (
        <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed flex bg-white">
          <div className="select-none text-slate-400 text-right pr-4 border-r border-slate-200 font-mono">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <pre className="pl-4 text-slate-800 font-mono">
            <code>{editableCode ? editableCode.trim() : '// No code snippet'}</code>
          </pre>
        </div>
      )}

      {/* Output Terminal Console */}
      {output && (
        <div className="border-t border-slate-200 bg-slate-900 text-slate-100 p-3.5 font-mono text-xs space-y-1.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold font-sans">
              <Terminal className="w-3.5 h-3.5" /> Execution Output
            </span>
            <span className="text-[10px] text-slate-400 font-mono">{output.executionTime}</span>
          </div>
          <pre className="text-slate-100 whitespace-pre-wrap leading-relaxed pt-1">
            {output.stdout}
          </pre>
        </div>
      )}
    </div>
  );
}
