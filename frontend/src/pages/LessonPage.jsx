import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, CheckCircle2, Bookmark, 
  HelpCircle, Sparkles, Layers, FileText, Share2, 
  BookOpen, Terminal, Check, Award, ArrowLeft
} from 'lucide-react';
import { lessonService } from '../services/lessonService';
import { courseService } from '../services/courseService';
import { bookmarkService, noteService } from '../services/platformServices';
import CodeSnippetBlock from '../components/lesson/CodeSnippetBlock';
import UnderstandCodePanel from '../components/lesson/UnderstandCodePanel';
import HowItWorksModal from '../components/lesson/HowItWorksModal';
import AnalogyModeCard from '../components/lesson/AnalogyModeCard';
import InteractiveExecutionStepper from '../components/lesson/InteractiveExecutionStepper';
import InlineMicroCheck from '../components/lesson/InlineMicroCheck';
import QuizModal from '../components/quiz/QuizModal';
import { useAuth } from '../context/AuthContext';

export default function LessonPage() {
  const { lessonId, topicId, id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [learningMode, setLearningMode] = useState('analogy');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const { refreshUserProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const targetId = lessonId || topicId || id || '1001';
    setLoading(true);
    lessonService.getLessonById(targetId)
      .then((res) => {
        if (res.data) {
          setLesson(res.data);
          setIsCompleted(res.data.isCompleted || false);
          setIsBookmarked(res.data.isBookmarked || false);

          // Fetch course details for left curriculum sidebar
          const cid = res.data.courseId || 1;
          courseService.getCourseById(cid)
            .then((cRes) => setCourse(cRes.data))
            .catch(() => {});

          // Fetch user personal note for topic
          if (res.data.topicId) {
            noteService.getNoteByTopic(res.data.topicId)
              .then((nRes) => {
                if (nRes.data?.contentMarkdown) {
                  setNoteContent(nRes.data.contentMarkdown);
                } else {
                  setNoteContent('');
                }
              })
              .catch(() => {});
          }
        }
      })
      .catch((err) => console.error('Failed to load lesson:', err))
      .finally(() => setLoading(false));
  }, [lessonId, topicId, id]);

  const handleToggleComplete = async () => {
    if (!lesson) return;
    try {
      await lessonService.completeTopic(lesson.topicId);
      setIsCompleted(true);
      refreshUserProfile();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleBookmark = async () => {
    if (!lesson) return;
    try {
      const added = await bookmarkService.toggleBookmark({
        itemType: 'LESSON',
        itemId: lesson.id,
        title: lesson.title,
        pathUrl: `/lesson/${lesson.id}`,
      });
      setIsBookmarked(added.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveNote = async () => {
    if (!lesson || !noteContent.trim()) return;
    try {
      await noteService.saveNote({
        topicId: lesson.topicId,
        title: `Notes on ${lesson.topicTitle || lesson.title}`,
        contentMarkdown: noteContent,
      });
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <p className="text-slate-400 mb-4">Lesson content not found.</p>
        <Link to="/courses" className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold">
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-white/95 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 sticky top-16 z-20 shadow-xs">
        <div className="flex items-center gap-2 truncate">
          <Link to={`/course/${lesson.courseId}`} className="hover:text-slate-900 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> {lesson.courseTitle}
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium truncate">{lesson.moduleTitle}</span>
          <span>/</span>
          <span className="text-brand-600 font-semibold truncate">{lesson.topicTitle}</span>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsHowItWorksOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" /> How This Platform Works
          </button>
        </div>
      </div>

      {/* Main 3-Pane Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANE: Curriculum Sidebar */}
        <aside className="w-72 border-r border-slate-200 bg-white hidden lg:flex flex-col shrink-0 overflow-y-auto p-4 space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Curriculum</span>
            <h4 className="font-bold text-slate-900 text-sm mt-0.5">{course?.title}</h4>
          </div>

          <div className="space-y-4">
            {course?.modules?.map((mod) => (
              <div key={mod.id} className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">{mod.title}</span>
                <div className="space-y-1 pl-2 border-l border-slate-200">
                  {mod.topics?.map((top) => {
                    const isCurrent = top.id === lesson.topicId;
                    return (
                      <Link
                        key={top.id}
                        to={`/lesson/${top.lessonId || top.id}`}
                        className={`block p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          isCurrent 
                            ? 'bg-brand-50 text-brand-700 font-semibold border border-brand-200' 
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate pr-2">{top.title}</span>
                        {top.isCompleted && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER PANE: Lesson Concept & Code Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 max-w-4xl mx-auto">
          
          {/* Topic Title */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              {lesson.codeLanguage?.toUpperCase() || 'PROGRAMMING'} LESSON
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lesson.title}
            </h1>
          </div>

          {/* Analogy & Intuitive Learning Mode Card */}
          <AnalogyModeCard
            mode={learningMode}
            onToggleMode={setLearningMode}
            analogyData={lesson.analogy}
            technicalSummary={lesson.contentMarkdown?.split('\n\n')[0]}
          />

          {/* Formatted Markdown Explanation */}
          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-line space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            {lesson.contentMarkdown}
          </div>

          {/* Interactive Code Snippet with Run/Sandbox */}
          {lesson.codeSnippet && (
            <CodeSnippetBlock 
              code={lesson.codeSnippet} 
              language={lesson.codeLanguage || 'java'} 
              title={`${lesson.topicTitle || 'Example'}.${lesson.codeLanguage || 'java'}`}
            />
          )}

          {/* Interactive Step-by-Step Code Execution Stepper */}
          {lesson.executionSteps && lesson.executionSteps.length > 0 && (
            <InteractiveExecutionStepper
              steps={lesson.executionSteps}
              codeSnippet={lesson.codeSnippet}
              language={lesson.codeLanguage || 'java'}
            />
          )}

          {/* Understand This Code 6-Aspect Panel */}
          <UnderstandCodePanel 
            codeExplanationJson={lesson.codeExplanationJson}
            realWorldExample={lesson.realWorldExample}
            commonMistakes={lesson.commonMistakes}
            bestPractices={lesson.bestPractices}
          />

          {/* Inline Micro Knowledge Check */}
          {lesson.microCheck && (
            <InlineMicroCheck questionData={lesson.microCheck} />
          )}

          {/* Key Takeaways & Interview Retention */}
          {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-brand-600" />
                <span>Crucial Takeaways for Coding Interviews</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {lesson.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practice Challenge */}
          {lesson.practiceExercise && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                <Terminal className="w-4 h-4" /> Practice Challenge for You:
              </div>
              <p className="text-xs leading-relaxed text-amber-900 font-mono">
                {lesson.practiceExercise}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            {lesson.prevTopicId ? (
              <button
                onClick={() => navigate(`/lesson/topic/${lesson.prevTopicId}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Topic
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleComplete}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isCompleted 
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-700' 
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isCompleted ? 'Topic Completed' : 'Mark Topic Complete (+10 XP)'}
              </button>

              {lesson.quizId && (
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" /> Take Topic Quiz
                </button>
              )}

              {lesson.nextTopicId && (
                <button
                  onClick={() => navigate(`/lesson/topic/${lesson.nextTopicId}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors shadow-xs cursor-pointer"
                >
                  Next Topic <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT PANE: Progress, Notes & Quiz */}
        <aside className="w-80 border-l border-slate-200 bg-white hidden xl:flex flex-col shrink-0 overflow-y-auto p-5 space-y-6">
          
          {/* Status & Bookmarks */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Lesson Status</span>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Completion:</span>
              <span className={`text-xs font-bold ${isCompleted ? 'text-emerald-600' : 'text-slate-500'}`}>
                {isCompleted ? 'Completed' : 'In Progress'}
              </span>
            </div>

            <button
              onClick={handleToggleBookmark}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark Lesson'}
            </button>
          </div>

          {/* Quick Quiz Card */}
          {lesson.quizId ? (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-200 space-y-3">
              <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" /> Topic Quiz
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Test your understanding with code output predictions and multi-choice questions.
              </p>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Launch Quiz <Award className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
              No quiz attached to this introductory topic.
            </div>
          )}

          {/* Personal Student Notes Editor */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" /> My Notes
              </span>
              {noteSaved && (
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Saved!
                </span>
              )}
            </div>

            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Jot down personal takeaways, syntax reminders, or questions..."
              className="w-full flex-1 min-h-[140px] p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 resize-none font-sans leading-relaxed"
            />

            <button
              onClick={handleSaveNote}
              className="w-full py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
            >
              Save Note
            </button>
          </div>
        </aside>
      </div>

      {/* "How This Platform Works" Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        topicTitle={lesson.topicTitle}
        currentFeature="Lesson & Topic Completion"
      />

      {/* Topic Quiz Modal */}
      {lesson.quizId && (
        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          quizId={lesson.quizId}
          onQuizComplete={() => setIsCompleted(true)}
        />
      )}
    </div>
  );
}
