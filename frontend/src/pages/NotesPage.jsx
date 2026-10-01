import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Search, Trash2, Save, Eye, 
  Edit3, BookOpen, Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { noteService } from '../services/platformServices';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'preview'
  const [showMobileList, setShowMobileList] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async (searchTerm = '') => {
    setLoading(true);
    try {
      const res = await noteService.getNotes(searchTerm);
      const data = res.data || [];
      setNotes(data);
      if (data.length > 0 && !selectedNote) {
        selectNote(data[0]);
      } else if (data.length === 0) {
        setSelectedNote(null);
      }
    } catch (err) {
      console.error('Failed to load notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchNotes(val);
  };

  const selectNote = (n) => {
    setSelectedNote(n);
    setFormTitle(n.title);
    setFormContent(n.contentMarkdown);
    setIsEditing(false);
    setIsNew(false);
    setActiveTab('preview');
    setShowMobileList(false);
  };

  const handleStartNew = () => {
    setSelectedNote(null);
    setFormTitle('');
    setFormContent('# New Note\n\nWrite your thoughts, code snippets, or interview insights here...');
    setIsNew(true);
    setIsEditing(true);
    setActiveTab('write');
    setShowMobileList(false);
  };

  const handleSave = async () => {
    if (!formTitle.trim()) {
      setStatusMsg({ type: 'error', text: 'Title cannot be empty.' });
      return;
    }
    setSaving(true);
    setStatusMsg(null);
    try {
      const payload = {
        title: formTitle,
        contentMarkdown: formContent,
        topicId: selectedNote?.topicId || null,
      };
      const res = await noteService.saveNote(payload);
      setStatusMsg({ type: 'success', text: 'Note saved successfully!' });
      setIsEditing(false);
      setIsNew(false);
      await fetchNotes(search);
      setSelectedNote(res.data);
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Failed to save note.' });
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await noteService.deleteNote(id);
      const remaining = notes.filter((n) => n.id !== id);
      setNotes(remaining);
      if (remaining.length > 0) {
        selectNote(remaining[0]);
      } else {
        setSelectedNote(null);
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-50 overflow-hidden">
      
      {/* Top Banner */}
      <div className="border-b border-slate-200 bg-white px-6 py-3 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-50 border border-brand-200 text-brand-600">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">My Engineering Notebook</h1>
            <p className="text-[11px] text-slate-500">Personal technical notes, syntax summaries, and algorithmic takeaways</p>
          </div>
        </div>

        <button
          onClick={handleStartNew}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Note
        </button>
      </div>

      {/* Main Workspace Split */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Note List */}
        <div className={`${(selectedNote || isNew) && !showMobileList ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 border-r border-slate-200 bg-white flex-col shrink-0`}>
          
          {/* Search Bar */}
          <div className="p-3 border-b border-slate-200">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={handleSearchChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-colors shadow-2xs"
              />
            </div>
          </div>

          {/* Notes Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {loading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 rounded-lg bg-slate-100 animate-pulse"></div>
                ))}
              </div>
            ) : notes.length > 0 ? (
              notes.map((n) => (
                <div
                  key={n.id}
                  onClick={() => selectNote(n)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedNote?.id === n.id
                      ? 'bg-brand-50 border-l-4 border-brand-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{n.title}</h4>
                    {n.topicTitle && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                        {n.topicTitle}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {n.contentMarkdown.replace(/[#*`_]/g, '')}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{n.updatedAt ? new Date(n.updatedAt).toLocaleDateString() : 'Recent'}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                No notes found. Click "Create Note" to write one.
              </div>
            )}
          </div>
        </div>

        {/* Right Editor / Preview Workspace */}
        <div className={`${!selectedNote && !isNew ? 'hidden md:flex' : (showMobileList ? 'hidden md:flex' : 'flex')} flex-1 flex-col bg-slate-50 overflow-hidden`}>
          {selectedNote || isNew ? (
            <>
              {/* Note Action Bar */}
              <div className="px-4 sm:px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowMobileList(true)}
                    className="md:hidden flex items-center gap-1 text-xs text-brand-600 font-semibold px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    ← Notes
                  </button>
                  <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                    <button
                      onClick={() => { setActiveTab('write'); setIsEditing(true); }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === 'write' ? 'bg-white text-brand-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === 'preview' ? 'bg-white text-brand-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                  </div>

                  {statusMsg && (
                    <span className={`text-xs flex items-center gap-1 ${
                      statusMsg.type === 'success' ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {statusMsg.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-rose-600" />}
                      {statusMsg.text}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {selectedNote && (
                    <button
                      onClick={() => handleDelete(selectedNote.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save Note'}
                  </button>
                </div>
              </div>

              {/* Note Content Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <input
                  type="text"
                  placeholder="Note Title..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-transparent text-2xl font-bold text-slate-900 placeholder-slate-400 focus:outline-none tracking-tight border-b border-transparent focus:border-slate-300 pb-2 transition-colors"
                />

                {activeTab === 'write' ? (
                  <textarea
                    rows={18}
                    placeholder="Enter your notes here using Markdown..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full h-[calc(100%-4rem)] bg-white border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 leading-relaxed resize-none transition-colors shadow-2xs"
                  ></textarea>
                ) : (
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 min-h-[400px] shadow-2xs">
                    <div className="prose max-w-none text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                      {formContent}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-3 shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">No note selected</h3>
              <p className="text-xs text-slate-500 max-w-xs mb-4">
                Select an existing note from the sidebar or start a new technical journal entry.
              </p>
              <button
                onClick={handleStartNew}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer"
              >
                Create First Note
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
