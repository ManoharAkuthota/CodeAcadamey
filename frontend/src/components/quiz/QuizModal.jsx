import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle, XCircle, ArrowRight, Award, 
  RotateCcw, Sparkles, AlertCircle, Check, Lightbulb, 
  HelpCircle, ChevronRight, BookOpen, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizService } from '../../services/quizService';
import { useAuth } from '../../context/AuthContext';

export default function QuizModal({ quizId, isOpen, onClose, onQuizComplete }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: ['ans1'] }
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [instantChecked, setInstantChecked] = useState({}); // { [questionId]: true }
  const { refreshUserProfile } = useAuth();

  useEffect(() => {
    if (isOpen && quizId) {
      setLoading(true);
      setResult(null);
      setSelectedAnswers({});
      setInstantChecked({});
      setShowHint(false);
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
    if (instantChecked[questionId]) return; // lock once checked
    setSelectedAnswers((prev) => {
      const current = prev[questionId] || [];
      const exists = current.includes(option);
      return {
        ...prev,
        [questionId]: exists ? [] : [option]
      };
    });
  };

  const handleInstantCheck = (questionId) => {
    setInstantChecked((prev) => ({ ...prev, [questionId]: true }));
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

  const hasSelectedCurrent = (selectedAnswers[currentQuestion?.id] || []).length > 0;
  const isLastQuestion = currentIdx === totalQuestions - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200 font-bold">
                  Comprehension Check
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {quiz?.difficulty || 'BEGINNER'}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{quiz?.title || 'Topic Quiz'}</h3>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-20 text-center text-slate-500 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs">Preparing intuitive assessment questions...</p>
            </div>
          ) : result ? (
            /* Results View with Option-by-Option Justifications */
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Score Banner */}
              <div className={`p-6 rounded-2xl border text-center space-y-3 ${
                result.passed 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-white border border-slate-200 shadow-xs">
                  {result.passed ? (
                    <Award className="w-7 h-7 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-7 h-7 text-amber-600" />
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {result.passed ? 'Great Job! Topic Mastered' : 'Good Effort! Review & Solidify'}
                  </h4>
                  <p className="text-sm font-semibold mt-1 text-slate-700">
                    Score: {result.score} / {result.totalQuestions} ({result.percentage}%)
                  </p>
                </div>

                {/* Adaptive Recommendation */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 text-left text-xs leading-relaxed text-slate-700 shadow-xs">
                  <div className="flex items-center gap-2 text-brand-700 font-bold mb-1">
                    <Sparkles className="w-4 h-4" /> Personal Learning Advice:
                  </div>
                  {result.adaptiveRecommendation || 'Review the detailed breakdowns below to understand the reasoning behind each choice.'}
                </div>
              </div>

              {/* Comprehensive Question Review & Justifications */}
              <div className="space-y-5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-brand-600" />
                  Detailed Question Review & Option Justifications
                </h5>
                
                {result.questions?.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border space-y-3 ${
                    item.isCorrect 
                      ? 'bg-emerald-50/30 border-emerald-200' 
                      : 'bg-rose-50/30 border-rose-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      {item.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900">{idx + 1}. {item.prompt}</p>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {item.conceptTag || 'Core Concept'}
                          </span>
                        </div>
                        
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
                          <p className="text-slate-600 text-xs leading-relaxed pt-1 border-t border-slate-200/60 mt-1">
                            <strong>Why: </strong>{item.explanation}
                          </p>
                        </div>

                        {/* Option-by-Option Justification Pills */}
                        {item.optionJustifications && (
                          <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                              Why other options are right / wrong:
                            </span>
                            <div className="space-y-1">
                              {item.optionJustifications.map((just, jIdx) => (
                                <div key={jIdx} className="text-[11px] p-2 rounded-lg bg-white border border-slate-200 flex items-start gap-2">
                                  <span className={just.isCorrect ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                                    {just.isCorrect ? '✓' : '✗'}
                                  </span>
                                  <div>
                                    <span className="font-semibold text-slate-800">{just.option}: </span>
                                    <span className="text-slate-600">{just.reason}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Active Question Flow */
            <div className="space-y-6">
              {/* Progress Bar & Concept Pill */}
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Question {currentIdx + 1} of {totalQuestions}</span>
                  {currentQuestion?.conceptTag && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-50 border border-brand-200 text-brand-700">
                      #{currentQuestion.conceptTag}
                    </span>
                  )}
                </div>
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

              {/* Guiding Hint Button */}
              {currentQuestion?.hint && (
                <div>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>{showHint ? 'Hide Hint' : '💡 Need a Hint?'}</span>
                  </button>

                  {showHint && (
                    <div className="mt-2 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed animate-in fade-in duration-150">
                      <span className="font-bold">Clue: </span>{currentQuestion.hint}
                    </div>
                  )}
                </div>
              )}

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion?.options?.map((option, optIdx) => {
                  const isSelected = (selectedAnswers[currentQuestion.id] || []).includes(option);
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionToggle(currentQuestion.id, option)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-brand-50 border-brand-600 text-brand-900 shadow-xs font-semibold' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span className="pr-3">{option}</span>
                      <div className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center ${
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
                  setShowHint(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                Continue Curriculum
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  setShowHint(false);
                  setCurrentIdx(Math.max(0, currentIdx - 1));
                }}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {!isLastQuestion ? (
                  <button
                    onClick={() => {
                      setShowHint(false);
                      setCurrentIdx(currentIdx + 1);
                    }}
                    disabled={!hasSelectedCurrent}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-40 cursor-pointer"
                  >
                    Next Question <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !hasSelectedCurrent}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-40 cursor-pointer"
                  >
                    {submitting ? 'Grading...' : 'Submit & See Justifications'} <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
