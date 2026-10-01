import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeSnippetBlock({ code, language = 'java', title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code ? code.trim().split('\n') : [];

  return (
    <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 text-xs">
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

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
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

      {/* Code Content with Line Numbers */}
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed flex bg-white">
        <div className="select-none text-slate-400 text-right pr-4 border-r border-slate-200 font-mono">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="pl-4 text-slate-800 font-mono">
          <code>{code ? code.trim() : '// No code snippet'}</code>
        </pre>
      </div>
    </div>
  );
}
