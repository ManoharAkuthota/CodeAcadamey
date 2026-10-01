import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Plus, Search, Trash2, ArrowLeft, 
  CheckCircle2, AlertCircle, X, Eye, EyeOff, Layers, Clock 
} from 'lucide-react';
import { courseService } from '../../services/courseService';
import { adminService } from '../../services/platformServices';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    languageId: '',
    description: '',
    level: 'BEGINNER',
    estimatedHours: 12,
    isPublished: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [coursesRes, langsRes] = await Promise.all([
        courseService.getAllCourses(),
        courseService.getAllLanguages(),
      ]);
      setCourses(coursesRes.data || []);
      setLanguages(langsRes.data || []);
      if (langsRes.data?.length > 0) {
        setForm((prev) => ({ ...prev, languageId: langsRes.data[0].id }));
      }
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (course) => {
    try {
      const res = await adminService.togglePublishCourse(course.id);
      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, isPublished: res.data } : c))
      );
      setFeedback({
        type: 'success',
        text: `Course ${course.title} is now ${res.data ? 'published' : 'draft'}`,
      });
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Failed to update publish state' });
    } finally {
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleDeleteCourse = async (course) => {
    if (!window.confirm(`Are you sure you want to permanently delete course "${course.title}"?`)) return;
    try {
      await adminService.deleteCourse(course.id);
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
      setFeedback({ type: 'success', text: `Course ${course.title} deleted` });
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Failed to delete course' });
    } finally {
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        languageId: form.languageId ? parseInt(form.languageId) : null,
        estimatedHours: parseInt(form.estimatedHours) || 10,
      };
      const res = await adminService.createCourse(payload);
      setCourses((prev) => [...prev, res.data]);
      setShowModal(false);
      setFeedback({ type: 'success', text: `Course "${res.data.title}" created successfully!` });
      setForm({
        title: '',
        slug: '',
        languageId: languages[0]?.id || '',
        description: '',
        level: 'BEGINNER',
        estimatedHours: 12,
        isPublished: true,
      });
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Failed to create course. Ensure slug is unique.' });
    } finally {
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const filteredCourses = courses.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.title?.toLowerCase().includes(q) ||
      c.slug?.toLowerCase().includes(q) ||
      c.languageName?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Console
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Curriculum & Course Management</h1>
                <p className="text-xs text-slate-500">Create, publish, and structure engineering courses and learning tracks</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-colors shadow-2xs"
              />
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white shadow-xs transition-all shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Course
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
            feedback.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
              : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Courses Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-mono text-[10px] tracking-wider">
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Language / Tech</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Modules / Hours</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400">
                      Loading courses...
                    </td>
                  </tr>
                ) : filteredCourses.length > 0 ? (
                  filteredCourses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{c.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">/{c.slug}</div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono text-[10px]">
                          {c.languageName || 'General Tech'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                          c.level === 'BEGINNER'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : c.level === 'INTERMEDIATE'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {c.level || 'BEGINNER'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {c.moduleCount || 0} modules • {c.estimatedHours || 10}h
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          c.isPublished
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {c.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleTogglePublish(c)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                            title={c.isPublished ? 'Unpublish' : 'Publish'}
                          >
                            {c.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(c)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete course"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400">
                      No courses match your search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Course Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-xl animate-fade-in">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-600" />
                  <h3 className="text-base font-bold text-slate-900">Create New Engineering Course</h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateCourse} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Modern Java 21 & Concurrency"
                    value={form.title}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        title: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Slug URL</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. modern-java-21"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Language</label>
                    <select
                      value={form.languageId}
                      onChange={(e) => setForm({ ...form, languageId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    >
                      {languages.map((l) => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty Level</label>
                    <select
                      value={form.level}
                      onChange={(e) => setForm({ ...form, level: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    >
                      <option value="BEGINNER">BEGINNER</option>
                      <option value="INTERMEDIATE">INTERMEDIATE</option>
                      <option value="ADVANCED">ADVANCED</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Hours</label>
                    <input
                      type="number"
                      value={form.estimatedHours}
                      onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Short synopsis of syllabus and takeaways..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer"
                  >
                    Create Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
