import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Landing page loaded directly for instant initial render
import LandingPage from './pages/LandingPage';

// Route-level code-splitting with React.lazy
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const LanguagesPage = lazy(() => import('./pages/LanguagesPage'));
const LanguageDetailPage = lazy(() => import('./pages/LanguageDetailPage'));
const FrameworksPage = lazy(() => import('./pages/FrameworksPage'));
const LearningPathPage = lazy(() => import('./pages/LearningPathPage'));
const LessonPage = lazy(() => import('./pages/LessonPage'));
const CodingPracticePage = lazy(() => import('./pages/CodingPracticePage'));
const ChallengesPage = lazy(() => import('./pages/ChallengesPage'));
const InterviewPrepPage = lazy(() => import('./pages/InterviewPrepPage'));
const ProjectShowcasePage = lazy(() => import('./pages/ProjectShowcasePage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const NotesPage = lazy(() => import('./pages/NotesPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Admin Pages
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminCoursesPage = lazy(() => import('./pages/admin/AdminCoursesPage'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-3">
      <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs text-slate-400 font-mono">Loading module...</span>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white font-sans antialiased overflow-x-hidden w-full">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  
                  {/* Course & Lesson Routes - Instant Access */}
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/courses/:courseId" element={<CourseDetailPage />} />
                  <Route path="/course/:courseId" element={<CourseDetailPage />} />
                  <Route path="/courses/slug/:slug" element={<CourseDetailPage />} />
                  <Route path="/course/slug/:slug" element={<CourseDetailPage />} />
                  <Route path="/lessons/:topicId" element={<LessonPage />} />
                  <Route path="/lesson/:topicId" element={<LessonPage />} />
                  <Route path="/lesson/topic/:topicId" element={<LessonPage />} />
                  <Route path="/lessons/topic/:topicId" element={<LessonPage />} />
                  <Route path="/course/:courseId/lesson/:topicId" element={<LessonPage />} />
                  <Route path="/courses/:courseId/lesson/:topicId" element={<LessonPage />} />

                  {/* Languages & Frameworks */}
                  <Route path="/languages" element={<LanguagesPage />} />
                  <Route path="/languages/:language" element={<LanguageDetailPage />} />
                  <Route path="/languages/:slug" element={<LanguageDetailPage />} />
                  <Route path="/language/:language" element={<LanguageDetailPage />} />
                  <Route path="/frameworks" element={<FrameworksPage />} />
                  <Route path="/frameworks/:framework" element={<FrameworksPage />} />

                  {/* Practice, Challenges, Roadmaps */}
                  <Route path="/learning-path" element={<LearningPathPage />} />
                  <Route path="/coding-practice" element={<CodingPracticePage />} />
                  <Route path="/practice" element={<CodingPracticePage />} />
                  <Route path="/challenges" element={<ChallengesPage />} />
                  <Route path="/interview-prep" element={<InterviewPrepPage />} />
                  <Route path="/interview" element={<InterviewPrepPage />} />
                  <Route path="/projects" element={<ProjectShowcasePage />} />

                  {/* Protected Student Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/bookmarks"
                    element={
                      <ProtectedRoute>
                        <BookmarksPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notes"
                    element={
                      <ProtectedRoute>
                        <NotesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/achievements"
                    element={
                      <ProtectedRoute>
                        <AchievementsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboardPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminRoute>
                        <AdminDashboardPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <AdminUsersPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/courses"
                    element={
                      <AdminRoute>
                        <AdminCoursesPage />
                      </AdminRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
