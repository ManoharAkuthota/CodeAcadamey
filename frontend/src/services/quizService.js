import api from './api';
import { DEFAULT_QUIZZES, getOrGenerateQuiz } from '../data/curriculumData';

export const quizService = {
  getQuizById: async (id) => {
    try {
      const res = await api.get(`/quizzes/${id}`);
      if (res?.data) return res;
    } catch (e) {
      console.warn(`Backend unavailable for quiz ${id}, using fallback:`, e?.message);
    }
    const found = getOrGenerateQuiz(id);
    return { success: true, data: found };
  },

  getQuizByTopicId: async (topicId) => {
    try {
      const res = await api.get(`/quizzes/topic/${topicId}`);
      if (res?.data) return res;
    } catch (e) {
      console.warn(`Backend unavailable for topic quiz ${topicId}, using fallback:`, e?.message);
    }
    const found = getOrGenerateQuiz(topicId);
    return { success: true, data: found };
  },

  submitQuiz: async (id, answers = {}) => {
    try {
      const res = await api.post(`/quizzes/${id}/submit`, { answers });
      if (res?.data) return res;
    } catch (e) {
      console.warn(`Backend unavailable for submitQuiz ${id}, using local evaluator:`, e?.message);
    }

    const quiz = getOrGenerateQuiz(id);
    const questions = quiz.questions || [];
    let score = 0;

    const evaluatedQuestions = questions.map((q) => {
      const userSelected = answers[q.id] || [];
      const correctAnswers = q.correctAnswers || [];
      const isCorrect = userSelected.length > 0 && 
        userSelected.every(ans => correctAnswers.includes(ans)) &&
        correctAnswers.every(ans => userSelected.includes(ans));

      if (isCorrect) score += 1;

      return {
        id: q.id,
        prompt: q.prompt,
        codeSnippet: q.codeSnippet,
        conceptTag: q.conceptTag || 'Core Syntax',
        isCorrect,
        submittedAnswers: userSelected,
        correctAnswers: q.correctAnswers,
        explanation: q.explanation,
        optionJustifications: q.optionJustifications || (q.options || []).map(opt => ({
          option: opt,
          isCorrect: correctAnswers.includes(opt),
          reason: correctAnswers.includes(opt) 
            ? 'Matches language specification and runtime design.' 
            : 'Incorrect: contradicts runtime execution semantics or type requirements.'
        }))
      };
    });

    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 100;
    const passed = percentage >= 70;

    return {
      success: true,
      data: {
        quizId: id,
        title: quiz.title,
        score,
        totalQuestions,
        percentage,
        passed,
        xpEarned: passed ? 50 : 15,
        adaptiveRecommendation: passed
          ? '🌟 Excellent job! You have demonstrated a solid grasp of this topic. Ready to advance to the next module!'
          : '📚 Good effort! Focus on reviewing the distractor explanations above, particularly the memory and typing rules, then try once more.',
        questions: evaluatedQuestions
      }
    };
  },
};
