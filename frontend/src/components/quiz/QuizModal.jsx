import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle, XCircle, ArrowRight, Award, 
  RotateCcw, Sparkles, AlertCircle, Check
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200 font-bold">
              Knowledge Verification
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">{quiz?.title || 'Topic Quiz'}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-20 text-center text-slate-500 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs">Loading quiz questions...</p>
            </div>
          ) : result ? (
            /* Results View */
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Score Banner */}
              <div className={`p-6 rounded-2xl border text-center space-y-3 ${
                result.passed 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-white border border-slate-200 shadow-xs">
                  {result.passed ? (
                    <Award className="w-7 h-7 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-7 h-7 text-rose-600" />
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {result.passed ? 'Quiz Passed!' : 'Needs Revision'}
                  </h4>
                  <p className="text-sm font-semibold mt-1 text-slate-700">
                    Score: {result.score} / {result.totalQuestions} ({result.percentage}%)
                  </p>
                </div>

                {/* Adaptive Recommendation */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 text-left text-xs leading-relaxed text-slate-700 shadow-xs">
                  <div className="flex items-center gap-2 text-brand-700 font-bold mb-1">
                    <Sparkles className="w-4 h-4" /> Adaptive Feedback:
                  </div>
                  {result.adaptiveRecommendation}
                </div>
              </div>

              {/* Question Breakdown */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600">Question Review & Justifications</h5>
                {result.questions?.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${
                    item.isCorrect 
                      ? 'bg-emerald-50/40 border-emerald-200' 
                      : 'bg-rose-50/40 border-rose-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      {item.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-2 flex-1">
                        <p className="text-xs font-bold text-slate-900">{idx + 1}. {item.prompt}</p>
                        
                        {item.codeSnippet && (
                          <pre className="p-2.5 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-800 overflow-x-auto border border-slate-200">
                            <code>{item.codeSnippet}</code>
                          </pre>
                        )}

                        <div className="text-xs space-y-1">
                          <p className="text-emerald-700 font-medium">
                            <strong>Correct Answer: </strong>{item.correctAnswers?.join(', ')}
                          </p>
                          {!item.isCorrect && (
                            <p className="text-rose-700 font-medium">
                              <strong>Your Answer: </strong>{item.submittedAnswers?.join(', ') || 'None selected'}
                            </p>
                          )}
                          <p className="text-slate-600 text-xs leading-relaxed pt-1 border-t border-slate-200/60 mt-2">
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
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Question {currentIdx + 1} of {totalQuestions}</span>
                <span className="font-mono text-slate-500 uppercase">{quiz?.difficulty} Level</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-600 h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>

              {/* Question Statement */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {currentQuestion?.prompt}
                </h4>

                {currentQuestion?.codeSnippet && (
                  <pre className="p-4 bg-slate-50 rounded-xl text-xs font-mono text-slate-800 border border-slate-200 overflow-x-auto">
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
                          ? 'bg-brand-50 border-brand-600 text-brand-900 shadow-xs font-semibold' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 bg-white'
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
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          {result ? (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  setResult(null);
                  setCurrentIdx(0);
                  setSelectedAnswers({});
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs"
              >
                Continue Learning
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
              >
                Previous
              </button>

              {currentIdx + 1 < totalQuestions ? (
                <button
                  onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs"
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
