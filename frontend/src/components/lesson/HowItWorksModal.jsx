import React from 'react';
import { X, Layers, Database, Server, Laptop, Cpu } from 'lucide-react';

export default function HowItWorksModal({ isOpen, onClose, topicTitle, currentFeature }) {
  if (!isOpen) return null;

  const stackSteps = [
    {
      layer: 'Frontend (Client)',
      tech: 'React 18 + Axios',
      icon: Laptop,
      color: 'text-cyan-700 border-cyan-200 bg-cyan-50',
      description: 'The student interacts with the UI component. React triggers an Axios HTTP request with the Bearer JWT token in the Authorization header.',
      example: 'POST /api/quizzes/1/submit with { answers: { 1: ["Platform-independent Bytecode"] } }'
    },
    {
      layer: 'Security Filter',
      tech: 'Spring Security 6 + JWT',
      icon: Cpu,
      color: 'text-purple-700 border-purple-200 bg-purple-50',
      description: 'JwtAuthenticationFilter intercepts the HTTP request, parses the HMAC-SHA256 signature, validates expiration, and places CustomUserPrincipal into SecurityContextHolder.',
      example: 'SecurityContextHolder.getContext().setAuthentication(authToken)'
    },
    {
      layer: 'REST Controller',
      tech: 'Spring Boot @RestController',
      icon: Server,
      color: 'text-emerald-700 border-emerald-200 bg-emerald-50',
      description: 'QuizController handles the endpoint, invokes @Valid bean validation on request DTOs, and delegates business logic to QuizService.',
      example: 'QuizController.submitQuiz(@PathVariable Long id, @RequestBody QuizSubmitRequest req)'
    },
    {
      layer: 'Service Layer',
      tech: 'Spring @Service + Gamification',
      icon: Layers,
      color: 'text-amber-700 border-amber-200 bg-amber-50',
      description: 'QuizService grades responses, calculates pass/fail percentage, generates adaptive guidance, triggers GamificationService to award XP (+50 XP) and updates daily streak.',
      example: 'gamificationService.addXp(user, 50, "QUIZ_PASSED", "Passed Java Quiz")'
    },
    {
      layer: 'ORM & Repository',
      tech: 'Spring Data JPA + Hibernate',
      icon: Layers,
      color: 'text-blue-700 border-blue-200 bg-blue-50',
      description: 'QuizAttemptRepository persists entity state. Hibernate maps the Java entity to SQL DDL and executes transactional queries via HikariCP connection pool.',
      example: 'INSERT INTO quiz_attempts (user_id, quiz_id, score, passed) VALUES (2, 1, 2, true)'
    },
    {
      layer: 'Database Layer',
      tech: 'MySQL 8.0 / TiDB Server',
      icon: Database,
      color: 'text-rose-700 border-rose-200 bg-rose-50',
      description: 'InnoDB storage engine verifies foreign key constraints, writes transaction to redo log, updates B-Tree indexes, and commits ACID changes.',
      example: 'InnoDB Buffer Pool -> commit on port 3306/4000'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">How This Platform Works Behind the Scenes</h2>
              <p className="text-xs text-slate-500">
                End-to-end full-stack request tracing: Client → Spring Security → Controller → Service → Database
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trace Timeline Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {stackSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-6 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-brand-600 flex items-center justify-center text-[10px] font-bold text-brand-700 shadow-xs">
                    {idx + 1}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded-md border ${step.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">{step.layer}</h4>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                        {step.tech}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="p-2 rounded-lg bg-white border border-slate-200 font-mono text-[11px] text-slate-700">
                      <span className="text-slate-400 mr-1.5">$</span>
                      {step.example}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Enterprise Spring Boot + React Architectural Flow</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-xs cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
