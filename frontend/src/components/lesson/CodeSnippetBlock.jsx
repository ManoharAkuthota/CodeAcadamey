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
    <div className="my-4 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          </div>
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-slate-300 font-medium">
            {title || `Example.${language === 'c' ? 'c' : language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'sql' ? 'sql' : 'java'}`}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px] font-medium">Copied!</span>
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
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed flex">
        <div className="select-none text-slate-600 text-right pr-4 border-r border-slate-800/80 font-mono">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="pl-4 text-slate-200">
          <code>{code ? code.trim() : '// No code snippet'}</code>
        </pre>
      </div>
    </div>
  );
}
