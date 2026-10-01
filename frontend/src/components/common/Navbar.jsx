import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Code2, Flame, Sparkles, Search, 
  Menu, X, User, LogOut, Shield, ChevronDown, 
  BookOpen, Terminal, CheckCircle2, Bookmark, FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SearchModal from './SearchModal';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
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
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0 shrink">
            <Link to="/" className="flex items-center gap-2 group min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm sm:text-base leading-tight tracking-tight text-slate-900 flex items-center gap-1.5 truncate">
                  CodePath <span className="text-brand-700 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-50 border border-brand-200 shrink-0">Academy</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:block truncate">Interactive Learning Platform</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive(link.href)
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Actions, Search, Streak, User Menu */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded shadow-xs">
                Ctrl K
              </kbd>
            </button>

            {/* Authenticated Controls */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Daily Streak Indicator */}
                <div 
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold"
                  title={`${user?.streakDays || 1} Day Streak!`}
                >
                  <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>{user?.streakDays || 1}d</span>
                </div>

                {/* Level & XP Badge */}
                <Link
                  to="/dashboard"
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold hover:bg-brand-100 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                  <span>{user?.xp || 0} XP</span>
                  <span className="text-[10px] text-brand-700 font-mono uppercase bg-brand-100 px-1 py-0.5 rounded">
                    {user?.level || 'Beginner'}
                  </span>
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200 bg-white"
                  >
                    <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-xs text-white">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{user?.fullName}</p>
                        <p className="text-[11px] text-slate-500 truncate">@{user?.username}</p>
                      </div>

                      <div className="py-1">
                        <Link to="/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-brand-600" /> Dashboard
                        </Link>
                        <Link to="/bookmarks" className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium">
                          <Bookmark className="w-4 h-4 text-amber-600" /> Bookmarks
                        </Link>
                        <Link to="/notes" className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium">
                          <FileText className="w-4 h-4 text-blue-600" /> My Notes
                        </Link>
                        <Link to="/profile" className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium">
                          <User className="w-4 h-4 text-purple-600" /> Profile & Achievements
                        </Link>

                        {isAdmin && (
                          <Link to="/admin/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-xs text-rose-700 hover:bg-rose-50 border-t border-slate-100 font-semibold">
                            <Shield className="w-4 h-4" /> Admin Console
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left font-medium"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive(link.href)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {!isAuthenticated && (
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 sm:hidden">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg border border-slate-200"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
