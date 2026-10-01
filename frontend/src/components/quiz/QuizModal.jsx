import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle, XCircle, ArrowRight, Award, 
  RotateCcw, Sparkles, AlertCircle, Clock, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizService } from '../../services/quizService';
import { useAuth } from '../../context/AuthContext';

export default function QuizModal({ quizId, isOpen, onClose, onQuizComplete }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: ['ans1'] }
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { refreshUserProfile } = useAuth();

  useEffect(() => {
    if (isOpen && quizId) {
      setLoading(true);
      setResult(null);
      setSelectedAnswers({});
      setCurrentIdx(0);
      quizService.getQuizById(quizId)
        .then((res) => setQuiz(res.data))
        .catch((err) => console.error('Failed to load quiz', err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, quizId]);

  if (!isOpen) return null;

  const currentQuestion = quiz?.questions?.[currentIdx];
  const totalQuestions = quiz?.questions?.length || 0;

  const handleOptionToggle = (questionId, option) => {
    setSelectedAnswers((prev) => {
      const current = prev[questionId] || [];
      const exists = current.includes(option);
      // If single choice, replace array
      return {
        ...prev,
        [questionId]: exists ? [] : [option]
      };
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await quizService.submitQuiz(quizId, selectedAnswers);
      if (res.data) {
        setResult(res.data);
        refreshUserProfile();
        if (onQuizComplete) onQuizComplete(res.data);

        if (res.data.passed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    } catch (err) {
      console.error('Quiz submission error', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
              Interactive Knowledge Check
            </span>
            <h3 className="text-base font-bold text-white mt-1">{quiz?.title || 'Topic Quiz'}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-20 text-center text-slate-400 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs">Loading quiz questions...</p>
            </div>
          ) : result ? (
            /* Results View */
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Score Banner */}
              <div className={`p-6 rounded-2xl border text-center space-y-3 ${
                result.passed 
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
                  : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
              }`}>
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-slate-900 border border-slate-800 shadow-xl">
                  {result.passed ? (
                    <Award className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-rose-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">
                    {result.passed ? 'Quiz Passed!' : 'Needs Revision'}
                  </h4>
                  <p className="text-sm font-semibold mt-1">
                    Score: {result.score} / {result.totalQuestions} ({result.percentage}%)
                  </p>
                </div>

                {/* Adaptive Recommendation */}
                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-left text-xs leading-relaxed text-slate-200">
                  <div className="flex items-center gap-2 text-brand-400 font-semibold mb-1">
                    <Sparkles className="w-4 h-4" /> Adaptive Feedback:
                  </div>
                  {result.adaptiveRecommendation}
                </div>
              </div>

              {/* Question Breakdown */}
              <div className="space-y-4">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Detailed Explanations</h5>
                {result.questions?.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${
                    item.isCorrect 
                      ? 'bg-slate-950/50 border-emerald-500/30' 
                      : 'bg-slate-950/50 border-rose-500/30'
                  }`}>
                    <div className="flex items-start gap-3">
                      {item.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-2 flex-1">
                        <p className="text-xs font-semibold text-white">{idx + 1}. {item.prompt}</p>
                        
                        {item.codeSnippet && (
                          <pre className="p-2.5 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto border border-slate-800">
                            <code>{item.codeSnippet}</code>
                          </pre>
                        )}

                        <div className="text-xs space-y-1">
                          <p className="text-emerald-400">
                            <strong>Correct Answer: </strong>{item.correctAnswers?.join(', ')}
                          </p>
                          {!item.isCorrect && (
                            <p className="text-rose-400">
                              <strong>Your Answer: </strong>{item.submittedAnswers?.join(', ') || 'None selected'}
                            </p>
                          )}
                          <p className="text-slate-300 text-[11px] leading-relaxed pt-1">
                            <strong>Explanation: </strong>{item.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Active Question Form */
            <div className="space-y-6">
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Question {currentIdx + 1} of {totalQuestions}</span>
                <span className="font-mono">{quiz?.difficulty} Difficulty</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>

              {/* Question Statement */}
              <div className="space-y-3">
                <h4 className="text-base font-semibold text-white leading-snug">
                  {currentQuestion?.prompt}
                </h4>

                {currentQuestion?.codeSnippet && (
                  <pre className="p-4 bg-slate-950 rounded-xl text-xs font-mono text-brand-300 border border-slate-800 overflow-x-auto">
                    <code>{currentQuestion.codeSnippet}</code>
                  </pre>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion?.options?.map((option, optIdx) => {
                  const isSelected = (selectedAnswers[currentQuestion.id] || []).includes(option);
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionToggle(currentQuestion.id, option)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-brand-500/15 border-brand-500 text-white shadow-lg shadow-brand-500/10' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-700'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          {result ? (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  setResult(null);
                  setCurrentIdx(0);
                  setSelectedAnswers({});
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold"
              >
                Continue Learning
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-300"
              >
                Previous
              </button>

              {currentIdx + 1 < totalQuestions ? (
                <button
                  onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-brand-600/20"
                >
                  {submitting ? 'Scoring...' : 'Submit Quiz'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
