import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, Search, Trash2, ExternalLink, BookOpen, 
  Code2, HelpCircle, Layers, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { bookmarkService } from '../services/platformServices';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    loadBookmarks();
  }, [selectedType]);

  const loadBookmarks = async () => {
    setLoading(true);
    try {
      const typeParam = selectedType === 'ALL' ? null : selectedType;
      const res = await bookmarkService.getBookmarks(typeParam);
      setBookmarks(res.data || []);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await bookmarkService.deleteBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      setFeedback('Bookmark removed');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
    }
  };

  const getTargetUrl = (b) => {
    if (b.itemType === 'LESSON') return `/lessons/${b.itemId}`;
    if (b.itemType === 'PROBLEM') return `/practice?problem=${b.itemId}`;
    if (b.itemType === 'TOPIC') return `/lessons/${b.itemId}`;
    if (b.itemType === 'QUESTION') return `/interview`;
    return '/dashboard';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'LESSON':
        return <BookOpen className="w-4 h-4 text-brand-400" />;
      case 'PROBLEM':
        return <Code2 className="w-4 h-4 text-emerald-400" />;
      case 'QUESTION':
        return <HelpCircle className="w-4 h-4 text-purple-400" />;
      default:
        return <Layers className="w-4 h-4 text-amber-400" />;
    }
  };

  const filteredBookmarks = bookmarks.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.title?.toLowerCase().includes(q) ||
      b.notes?.toLowerCase().includes(q) ||
      b.itemType?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Saved Bookmarks</h1>
                <p className="text-xs text-slate-400">Quickly jump back to lessons, code snippets, and challenges you saved</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['ALL', 'LESSON', 'PROBLEM', 'TOPIC', 'QUESTION'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedType === type
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {type === 'ALL' ? 'All Bookmarks' : type.charAt(0) + type.slice(1).toLowerCase() + 's'}
            </button>
          ))}
          <span className="text-xs font-mono text-slate-500 ml-auto hidden sm:block">
            {filteredBookmarks.length} item{filteredBookmarks.length !== 1 ? 's' : ''}
          </span>
        </div>

        {feedback && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Bookmarks Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse"></div>
            ))}
          </div>
        ) : filteredBookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookmarks.map((b) => (
              <div
                key={b.id}
                className="group relative bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-sm hover:shadow-xl hover:shadow-black/40"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50">
                      {getTypeIcon(b.itemType)}
                      {b.itemType}
                    </span>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-semibold text-white group-hover:text-brand-400 text-sm line-clamp-2 transition-colors">
                    {b.title || `Bookmarked ${b.itemType}`}
                  </h3>

                  {b.notes && (
                    <p className="text-xs text-slate-400 line-clamp-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 font-mono">
                      {b.notes}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'Recently'}
                  </span>
                  <Link
                    to={getTargetUrl(b)}
                    className="inline-flex items-center gap-1 font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Open Resource <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-900/20">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-500">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No bookmarks found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              Save key concepts, lessons, or interview questions while learning to reference them here later.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/courses"
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white shadow-lg shadow-brand-600/20 transition-all"
              >
                Explore Courses
              </Link>
              <Link
                to="/practice"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all"
              >
                Coding Practice
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
