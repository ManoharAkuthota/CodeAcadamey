import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Code2, Flame, Sparkles, Search, Sun, Moon, 
  Menu, X, User, LogOut, Shield, ChevronDown, 
  BookOpen, Terminal, CheckCircle2, Bookmark, FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import SearchModal from './SearchModal';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Keyboard shortcut Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Learning Path', href: '/learning-path' },
    { label: 'Courses', href: '/courses' },
    { label: 'Languages', href: '/languages' },
    { label: 'Frameworks', href: '/frameworks' },
    { label: 'Coding Practice', href: '/coding-practice' },
    { label: 'Interview Prep', href: '/interview-prep' },
    { label: 'Projects', href: '/projects' },
  ];

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-brand-400 group-hover:text-brand-300 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight text-white flex items-center gap-1.5">
                  CodePath <span className="text-brand-400 text-xs font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-500/10 border border-brand-500/20">Academy</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Interactive Dev OS</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-slate-800 text-brand-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Actions, Search, Streak, User Menu */}
          <div className="flex items-center gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
                Ctrl K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Authenticated Controls */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Daily Streak Indicator */}
                <div 
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold"
                  title={`${user?.streakDays || 1} Day Streak!`}
                >
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span>{user?.streakDays || 1}d</span>
                </div>

                {/* Level & XP Badge */}
                <Link
                  to="/dashboard"
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold hover:bg-brand-500/20 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{user?.xp || 0} XP</span>
                  <span className="text-[10px] text-brand-500 font-mono uppercase bg-brand-500/20 px-1 py-0.5 rounded">
                    {user?.level || 'Beginner'}
                  </span>
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-900 transition-colors border border-slate-800"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-accent flex items-center justify-center font-bold text-xs text-white">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="text-xs font-semibold text-white truncate">{user?.fullName}</p>
                        <p className="text-[11px] text-slate-400 truncate">@{user?.username}</p>
                      </div>

                      <div className="py-1">
                        <Link to="/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-brand-400" /> Dashboard
                        </Link>
                        <Link to="/bookmarks" className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800">
                          <Bookmark className="w-4 h-4 text-amber-400" /> Bookmarks
                        </Link>
                        <Link to="/notes" className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800">
                          <FileText className="w-4 h-4 text-blue-400" /> My Notes
                        </Link>
                        <Link to="/profile" className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800">
                          <User className="w-4 h-4 text-purple-400" /> Profile & Achievements
                        </Link>

                        {isAdmin && (
                          <Link to="/admin/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border-t border-slate-800/80">
                            <Shield className="w-4 h-4" /> Admin Console
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-slate-800 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/30 text-left"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow-lg shadow-brand-600/20 transition-all hover:scale-[1.02]"
                >
                  Start Learning
                </Link>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.href)
                    ? 'bg-slate-800 text-brand-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
