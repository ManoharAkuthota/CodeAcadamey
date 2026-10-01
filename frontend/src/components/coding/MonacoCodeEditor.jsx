import React from 'react';
import Editor from '@monaco-editor/react';

export default function MonacoCodeEditor({ 
  value, 
  onChange, 
  language = 'java', 
  height = '500px',
  readOnly = false 
}) {
  // Normalize language for monaco
  const monacoLang = language === 'c' || language === 'cpp' ? 'cpp' : language === 'sql' ? 'sql' : language === 'python' ? 'python' : language === 'javascript' ? 'javascript' : 'java';

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] shadow-2xl">
      <Editor
        height={height}
        language={monacoLang}
        value={value}
        onChange={(newVal) => onChange && onChange(newVal || '')}
        theme="vs-dark"
        options={{
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly: readOnly,
          tabSize: 4,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  );
}
