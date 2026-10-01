import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Heart, Github, Twitter, Linkedin, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">CodePath Academy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full-Stack Interactive Programming Learning Platform. Learn fundamentals, practice algorithms, master frameworks, and build real-world software.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-1">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Languages */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Languages</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/languages/c" className="hover:text-white">C Programming</Link></li>
              <li><Link to="/languages/cpp" className="hover:text-white">C++ Object Oriented</Link></li>
              <li><Link to="/languages/java" className="hover:text-white">Java 21 LTS</Link></li>
              <li><Link to="/languages/python" className="hover:text-white">Python 3 Fundamentals</Link></li>
              <li><Link to="/languages/javascript" className="hover:text-white">Modern JavaScript ES6+</Link></li>
              <li><Link to="/languages/sql" className="hover:text-white">SQL & MySQL Architecture</Link></li>
            </ul>
          </div>

          {/* Col 3: Frameworks & Tools */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Frameworks & Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/frameworks/spring-boot" className="hover:text-white">Spring Boot 3 REST APIs</Link></li>
              <li><Link to="/frameworks/react" className="hover:text-white">React 18 & Vite</Link></li>
              <li><Link to="/frameworks/django" className="hover:text-white">Django Web Framework</Link></li>
              <li><Link to="/frameworks/nodejs-express" className="hover:text-white">Node.js & Express</Link></li>
              <li><Link to="/interview-prep" className="hover:text-white">Technical Interview Prep</Link></li>
              <li><Link to="/projects" className="hover:text-white">Portfolio Blueprints</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform Architecture */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">System Stack</h4>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5 text-[11px] font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>Frontend:</span>
                <span className="text-brand-400">React + Vite</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Backend:</span>
                <span className="text-brand-400">Spring Boot 3</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Security:</span>
                <span className="text-brand-400">Stateless JWT</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Database:</span>
                <span className="text-brand-400">MySQL 8.0</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Editor:</span>
                <span className="text-brand-400">Monaco IDE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 CodePath Academy. Built for aspiring software engineers.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for learning code.
          </p>
        </div>
      </div>
    </footer>
  );
}
