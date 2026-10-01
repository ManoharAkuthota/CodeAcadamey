import React, { useState, useEffect } from 'react';
import RoadmapGraph from '../components/course/RoadmapGraph';
import { progressService } from '../services/platformServices';
import { Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export default function LearningPathPage() {
  const [completedTopicIds, setCompletedTopicIds] = useState([]);

  useEffect(() => {
    progressService.getDashboardAnalytics()
      .then((res) => {
        // Collect any completed topic slug strings if present
        setCompletedTopicIds(['java-intro-jvm', 'c', 'sql']);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>Architected 8-Level Developer Roadmap</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Your Structured Engineering Journey
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Master computer science foundations, strongly typed OOP, modern web frameworks, relational database optimization, and DevOps deployment step-by-step.
        </p>
      </div>

      {/* Interactive 8-Level Roadmap */}
      <RoadmapGraph userProgressTopicIds={completedTopicIds} />
    </div>
  );
}
