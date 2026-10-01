import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Search, Shield, Trash2, ArrowLeft, 
  CheckCircle2, AlertCircle, ShieldAlert, Zap, Clock 
} from 'lucide-react';
import { adminService } from '../../services/platformServices';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (user) => {
    const newRole = user.role === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN';
    if (!window.confirm(`Change ${user.username}'s role to ${newRole}?`)) return;
    try {
      const res = await adminService.updateUserRole(user.id, newRole);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? res.data : u)));
      setFeedback({ type: 'success', text: `Updated ${user.username} role to ${newRole}` });
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Failed to update user role' });
    } finally {
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to permanently delete user "${user.username}"?`)) return;
    try {
      await adminService.deleteUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setFeedback({ type: 'success', text: `Deleted user ${user.username}` });
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Failed to delete user' });
    } finally {
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const filteredUsers = users.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      u.username?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.fullName?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Console
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">User Management</h1>
                <p className="text-xs text-slate-400">Manage registered students, platform permissions, and accounts</p>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, email, username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
            feedback.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Users Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Level / XP</th>
                  <th className="py-3 px-4">Streak</th>
                  <th className="py-3 px-4">Registered Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500">
                      Loading user accounts...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                            {u.fullName?.charAt(0) || u.username?.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white text-xs">{u.fullName || u.username}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          u.role === 'ROLE_ADMIN'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                        }`}>
                          <Shield className="w-3 h-3" />
                          {u.role === 'ROLE_ADMIN' ? 'Admin' : 'Student'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <div className="text-white font-semibold flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>Level {u.level || 1}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{u.xp || 0} XP</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {u.streakDays || 1} days
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Recent'}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleRole(u)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-colors"
                            title="Toggle admin permission"
                          >
                            {u.role === 'ROLE_ADMIN' ? 'Revoke Admin' : 'Make Admin'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete user account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500">
                      No users match your search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
