import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-xs">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-base">CodePath Academy</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Interactive programming learning platform. Learn computer science step-by-step, master modern software frameworks, and build real-world software engineering skills.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-1">
              <a href="https://github.com/ManoharAkuthota/CodeAcadamey" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Languages */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Languages</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/languages/c" className="text-slate-600 hover:text-brand-600 transition-colors">C Programming</Link></li>
              <li><Link to="/languages/cpp" className="text-slate-600 hover:text-brand-600 transition-colors">C++ Object Oriented</Link></li>
              <li><Link to="/languages/java" className="text-slate-600 hover:text-brand-600 transition-colors">Java Enterprise</Link></li>
              <li><Link to="/languages/python" className="text-slate-600 hover:text-brand-600 transition-colors">Python 3</Link></li>
              <li><Link to="/languages/javascript" className="text-slate-600 hover:text-brand-600 transition-colors">Modern JavaScript</Link></li>
              <li><Link to="/languages/sql" className="text-slate-600 hover:text-brand-600 transition-colors">SQL & Relational Databases</Link></li>
            </ul>
          </div>

          {/* Col 3: Frameworks & Tools */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Frameworks & Prep</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/frameworks/spring-boot" className="text-slate-600 hover:text-brand-600 transition-colors">Spring Boot 3</Link></li>
              <li><Link to="/frameworks/react" className="text-slate-600 hover:text-brand-600 transition-colors">React 18 & Frontend</Link></li>
              <li><Link to="/frameworks/django" className="text-slate-600 hover:text-brand-600 transition-colors">Django Backend</Link></li>
              <li><Link to="/frameworks/nodejs-express" className="text-slate-600 hover:text-brand-600 transition-colors">Node.js & Express</Link></li>
              <li><Link to="/interview-prep" className="text-slate-600 hover:text-brand-600 transition-colors">Technical Interview Questions</Link></li>
              <li><Link to="/projects" className="text-slate-600 hover:text-brand-600 transition-colors">Project Blueprints</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform Architecture */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Enterprise Stack</h4>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-600">
                <span>Frontend:</span>
                <span className="text-slate-900 font-semibold">React + Vite</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Backend:</span>
                <span className="text-slate-900 font-semibold">Spring Boot 3</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Security:</span>
                <span className="text-slate-900 font-semibold">JWT + BCrypt</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Database:</span>
                <span className="text-slate-900 font-semibold">MySQL / TiDB</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Editor:</span>
                <span className="text-slate-900 font-semibold">Monaco Engine</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 CodePath Academy. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-medium">
            Professional Computer Science Education
          </p>
        </div>
      </div>
    </footer>
  );
}
