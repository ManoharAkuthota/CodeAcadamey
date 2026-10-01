import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Layers, Terminal, HelpCircle, ArrowRight, Cpu } from 'lucide-react';
import { searchService } from '../../services/platformServices';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      searchService.search(query.trim())
        .then((res) => {
          if (res.data?.results) {
            setResults(res.data.results);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-white">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search languages, courses, topics, or lessons..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:text-slate-600 text-slate-400 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Box */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {loading && (
            <div className="py-8 text-center text-slate-500 text-xs flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
              Searching CodePath Academy...
            </div>
          )}

          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs">
              No results found for "<span className="text-slate-900 font-semibold">{query}</span>"
            </div>
          )}

          {!loading && query.trim().length < 2 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              Type at least 2 characters to search across curriculum, concepts, and challenges.
            </div>
          )}

          {results.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(item.url)}
              className="w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-start justify-between group border border-transparent hover:border-slate-200"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 text-brand-700 rounded-lg group-hover:bg-brand-50">
                  {item.type === 'LANGUAGE' && <Cpu className="w-4 h-4" />}
                  {item.type === 'FRAMEWORK' && <Layers className="w-4 h-4" />}
                  {item.type === 'COURSE' && <BookOpen className="w-4 h-4" />}
                  {item.type === 'TOPIC' && <BookOpen className="w-4 h-4" />}
                  {item.type === 'LESSON' && <Terminal className="w-4 h-4" />}
                  {item.type === 'PROBLEM' && <HelpCircle className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-xs">{item.title}</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>
                  {item.snippet && (
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.snippet}</p>
                  )}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
