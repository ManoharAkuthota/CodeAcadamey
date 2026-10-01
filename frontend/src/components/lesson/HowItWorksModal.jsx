import React from 'react';
import { X, Layers, ArrowRight, Database, Server, Laptop, Cpu, CheckCircle } from 'lucide-react';

export default function HowItWorksModal({ isOpen, onClose, topicTitle, currentFeature }) {
  if (!isOpen) return null;

  const stackSteps = [
    {
      layer: 'Frontend (Client)',
      tech: 'React 18 + Axios',
      icon: Laptop,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      description: 'The student interacts with the UI component. React triggers an Axios HTTP request with the Bearer JWT token in the Authorization header.',
      example: 'POST /api/quizzes/1/submit with { answers: { 1: ["Platform-independent Bytecode"] } }'
    },
    {
      layer: 'Security Filter',
      tech: 'Spring Security 6 + JWT',
      icon: Cpu,
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      description: 'JwtAuthenticationFilter intercepts the HTTP request, parses the HMAC-SHA256 signature, validates expiration, and places CustomUserPrincipal into SecurityContextHolder.',
      example: 'SecurityContextHolder.getContext().setAuthentication(authToken)'
    },
    {
      layer: 'REST Controller',
      tech: 'Spring Boot @RestController',
      icon: Server,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      description: 'QuizController handles the endpoint, invokes @Valid bean validation on request DTOs, and delegates business logic to QuizService.',
      example: 'QuizController.submitQuiz(@PathVariable Long id, @RequestBody QuizSubmitRequest req)'
    },
    {
      layer: 'Service Layer',
      tech: 'Spring @Service + Gamification',
      icon: Layers,
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      description: 'QuizService grades responses, calculates pass/fail percentage, generates adaptive guidance, triggers GamificationService to award XP (+50 XP) and updates daily streak.',
      example: 'gamificationService.addXp(user, 50, "QUIZ_PASSED", "Passed Java Quiz")'
    },
    {
      layer: 'ORM & Repository',
      tech: 'Spring Data JPA + Hibernate',
      icon: Layers,
      color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
      description: 'QuizAttemptRepository persists entity state. Hibernate maps the Java entity to SQL DDL and executes transactional queries via HikariCP connection pool.',
      example: 'INSERT INTO quiz_attempts (user_id, quiz_id, score, passed) VALUES (2, 1, 2, true)'
    },
    {
      layer: 'Database Layer',
      tech: 'MySQL 8.0 Server',
      icon: Database,
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
      description: 'InnoDB storage engine verifies foreign key constraints, writes transaction to redo log, updates B-Tree indexes, and commits ACID changes.',
      example: 'InnoDB Buffer Pool -> ibdata1 commit on port 3306'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                How This Platform Works
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  Full-Stack Architecture Tracer
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect how CodePath Academy executes this request end-to-end through React, Spring Boot, and MySQL
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Visual Pipeline Flow */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Current Context:</span>
            <span className="text-brand-400 font-semibold">{topicTitle || 'Interactive Topic Learning'}</span>
            <span className="text-slate-400 font-mono">Pattern: Clean Layered Architecture</span>
          </div>

          <div className="space-y-3">
            {stackSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={idx} className="relative flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-slate-600 transition-colors">
                  {/* Step Number & Icon */}
                  <div className={`p-2.5 rounded-xl border ${step.color} shrink-0`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-sm text-white">{step.layer}</span>
                      <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700/60">
                        {step.tech}
                      </span>
                      <span className="text-[10px] text-brand-400 font-semibold ml-auto flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Step {idx + 1} of 6
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-2 p-2 bg-slate-950/80 rounded-lg border border-slate-800/80 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                      <code>{step.example}</code>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            This teaches you real enterprise engineering: separation of concerns, immutability, and transactional data flows.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
}
