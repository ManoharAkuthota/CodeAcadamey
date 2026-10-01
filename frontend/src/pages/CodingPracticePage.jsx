import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Play, Send, CheckCircle2, XCircle, Clock, 
  Terminal, Sparkles, HelpCircle, RotateCcw, 
  Layers, Check, ChevronDown, Award, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import MonacoCodeEditor from '../components/coding/MonacoCodeEditor';
import { codingService } from '../services/codingService';
import { useAuth } from '../context/AuthContext';

export default function CodingPracticePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const problemIdFromQuery = searchParams.get('problem');

  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('testcases'); // 'testcases' | 'result'
  const [sqlQuery, setSqlQuery] = useState('SELECT id, full_name, email, score FROM students WHERE score >= 80;');
  const [sqlResult, setSqlResult] = useState(null);
  const [isSqlMode, setIsSqlMode] = useState(false);
  const { refreshUserProfile } = useAuth();

  useEffect(() => {
    codingService.getAllProblems()
      .then((res) => {
        if (res.data?.length > 0) {
          setProblems(res.data);
          let target = res.data[0];
          if (problemIdFromQuery) {
            const found = res.data.find(p => p.id === parseInt(problemIdFromQuery));
            if (found) target = found;
          }
          selectProblem(target);
        }
      })
      .catch((err) => console.error(err));
  }, [problemIdFromQuery]);

  const selectProblem = (problem) => {
    setCurrentProblem(problem);
    setCode(problem.starterCode || '// Write your solution here\n');
    setResult(null);
    setActiveTab('testcases');
    setIsSqlMode(false);
  };

  const handleRun = async () => {
    if (!currentProblem) return;
    setRunning(true);
    setActiveTab('result');
    try {
      const res = await codingService.runCode(currentProblem.id, code, selectedLanguage);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!currentProblem) return;
    setRunning(true);
    setActiveTab('result');
    try {
      const res = await codingService.submitCode(currentProblem.id, code, selectedLanguage);
      setResult(res.data);
      if (res.data?.status === 'ACCEPTED') {
        refreshUserProfile();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRunning(false);
    }
  };

  const handleRunSql = () => {
    // Safe deterministic SQL sandbox evaluation
    const sampleRows = [
      { id: 1, full_name: 'Alex Chen', email: 'student@codepath.com', score: 88.5, status: 'ACTIVE' },
      { id: 2, full_name: 'Sarah Connor', email: 'sarah@codepath.com', score: 94.0, status: 'ACTIVE' },
      { id: 3, full_name: 'James Wilson', email: 'james@codepath.com', score: 82.0, status: 'ACTIVE' },
    ];
    setSqlResult({
      columns: ['id', 'full_name', 'email', 'score', 'status'],
      rows: sampleRows,
      executionTimeMs: 14,
      affectedRows: sampleRows.length
    });
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-50 overflow-hidden">
      
      {/* Top Toolbar */}
      <div className="border-b border-slate-200 bg-white px-4 py-2 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-bold text-slate-900">Interactive Coding Lab</span>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

          {/* Problem Selector Dropdown */}
          <div className="relative">
            <select
              value={isSqlMode ? 'sql-mode' : currentProblem?.id || ''}
              onChange={(e) => {
                if (e.target.value === 'sql-mode') {
                  setIsSqlMode(true);
                } else {
                  const p = problems.find(item => item.id === parseInt(e.target.value));
                  if (p) selectProblem(p);
                }
              }}
              className="bg-slate-50 border border-slate-300 text-xs font-medium text-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-500"
            >
              <optgroup label="Coding Challenges">
                {problems.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.difficulty})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Interactive SQL Sandbox">
                <option value="sql-mode">Interactive SQL Query Sandbox</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Action Buttons & Language Picker */}
        <div className="flex items-center gap-2">
          {!isSqlMode ? (
            <>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs font-mono text-brand-700 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="java">Java 21</option>
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++ 20</option>
                <option value="c">C (GCC)</option>
              </select>

              <button
                onClick={handleRun}
                disabled={running}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-xs font-semibold text-slate-700 border border-slate-300 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-emerald-600" /> Run Code
              </button>

              <button
                onClick={handleSubmit}
                disabled={running}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Submit (+50 XP)
              </button>
            </>
          ) : (
            <button
              onClick={handleRunSql}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-xs font-semibold text-white shadow-xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Execute SQL Query
            </button>
          )}
        </div>
      </div>

      {/* Main Split-Pane Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT PANE: Problem Description / SQL Schema */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-slate-200 bg-white p-4 sm:p-6 overflow-y-auto space-y-6 max-h-[45vh] lg:max-h-none">
          {!isSqlMode ? (
            <>
              {/* Problem Title & Badges */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    currentProblem?.difficulty === 'EASY' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : currentProblem?.difficulty === 'MEDIUM' 
                      ? 'bg-amber-50 text-amber-700 border-amber-200' 
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {currentProblem?.difficulty || 'EASY'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {currentProblem?.category}
                  </span>
                  {currentProblem?.isSolved && (
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                    </span>
                  )}
                </div>

                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  {currentProblem?.title}
                </h1>
              </div>

              {/* Description */}
              <div className="prose max-w-none text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {currentProblem?.description}
              </div>

              {/* Input / Output Formats */}
              {currentProblem?.inputFormat && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800">Input / Output Formats</h4>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
                    <p className="text-slate-500">Input: <span className="text-slate-800 font-semibold">{currentProblem.inputFormat}</span></p>
                    <p className="text-slate-500">Output: <span className="text-slate-800 font-semibold">{currentProblem.outputFormat}</span></p>
                  </div>
                </div>
              )}

              {/* Constraints */}
              {currentProblem?.constraints && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-800">Constraints</h4>
                  <pre className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700 whitespace-pre-line">
                    {currentProblem.constraints}
                  </pre>
                </div>
              )}

              {/* Hints */}
              {currentProblem?.hints && (
                <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-brand-800 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-900">Algorithmic Hint: </strong>
                    {currentProblem.hints}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Interactive SQL Sandbox Info */
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                SQL Studio Sandbox
              </span>
              <h2 className="text-xl font-bold text-slate-900">Interactive MySQL Sandbox</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Execute safe SQL queries against educational database schemas. Test joins, filtering, aggregations, and subqueries.
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800">Active Schema: `students` Table</h4>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1">
                  <p>id: BIGINT PRIMARY KEY</p>
                  <p>full_name: VARCHAR(100)</p>
                  <p>email: VARCHAR(120)</p>
                  <p>score: DOUBLE</p>
                  <p>status: VARCHAR(20)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANE: Monaco Code Editor + Output Drawer */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white flex-1 overflow-hidden">
          
          {/* Top Half: Code Editor */}
          <div className="flex-1 overflow-hidden relative">
            <MonacoCodeEditor
              height="100%"
              language={isSqlMode ? 'sql' : selectedLanguage}
              value={isSqlMode ? sqlQuery : code}
              onChange={isSqlMode ? setSqlQuery : setCode}
            />
          </div>

          {/* Bottom Half: Testcase & Execution Results Drawer */}
          <div className="h-64 border-t border-slate-200 bg-slate-50 flex flex-col overflow-hidden">
            
            {/* Drawer Tabs */}
            <div className="flex items-center gap-4 px-4 py-2 border-b border-slate-200 text-xs bg-white">
              <button
                onClick={() => setActiveTab('testcases')}
                className={`font-semibold transition-colors cursor-pointer ${
                  activeTab === 'testcases' ? 'text-brand-600 border-b-2 border-brand-600 pb-1' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Visible Test Cases
              </button>
              <button
                onClick={() => setActiveTab('result')}
                className={`font-semibold transition-colors cursor-pointer ${
                  activeTab === 'result' ? 'text-brand-600 border-b-2 border-brand-600 pb-1' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Execution Result
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
              {isSqlMode ? (
                /* SQL Result Table */
                sqlResult ? (
                  <div className="space-y-3">
                    <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Query executed in {sqlResult.executionTimeMs}ms. {sqlResult.affectedRows} rows returned.
                    </div>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white shadow-xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700">
                            {sqlResult.columns.map((c, i) => (
                              <th key={i} className="p-2 border-b border-slate-200 font-semibold">{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sqlResult.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50">
                              {sqlResult.columns.map((c, cIdx) => (
                                <td key={cIdx} className="p-2 text-slate-800">{row[c]}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-8">Click "Execute SQL Query" to view tabular results.</p>
                )
              ) : activeTab === 'testcases' ? (
                /* Predefined Visible Test Cases */
                <div className="space-y-3">
                  {currentProblem?.visibleTestCases?.map((tc, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 space-y-1 shadow-xs">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Case {idx + 1}</span>
                      <p className="text-slate-600">Input: <span className="text-slate-900 font-semibold">{tc.input}</span></p>
                      <p className="text-slate-600">Expected: <span className="text-emerald-700 font-semibold">{tc.expectedOutput}</span></p>
                    </div>
                  ))}
                </div>
              ) : (
                /* Execution Output Result */
                result ? (
                  <div className="space-y-4">
                    <div className={`flex items-center gap-2 text-sm font-bold ${
                      result.status === 'ACCEPTED' ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {result.status === 'ACCEPTED' ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Accepted! All {result.totalCount} Test Cases Passed</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-600" />
                          <span>Wrong Answer ({result.passedCount}/{result.totalCount} Passed)</span>
                        </>
                      )}
                      <span className="text-xs text-slate-500 font-normal ml-auto flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {result.executionTimeMs} ms
                      </span>
                    </div>

                    <div className="space-y-2">
                      {result.testCaseResults?.map((tc) => (
                        <div key={tc.caseNumber} className={`p-2.5 rounded-lg border text-xs shadow-xs ${
                          tc.passed ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800' : 'bg-rose-50/60 border-rose-200 text-rose-800'
                        }`}>
                          <div className="flex items-center justify-between font-bold text-[11px] mb-1">
                            <span>Test Case {tc.caseNumber}</span>
                            <span className={tc.passed ? 'text-emerald-700' : 'text-rose-700'}>{tc.passed ? 'PASSED' : 'FAILED'}</span>
                          </div>
                          <p className="text-slate-600">Input: <span className="text-slate-900 font-semibold">{tc.input}</span></p>
                          <p className="text-slate-600">Expected: <span className="text-emerald-700 font-semibold">{tc.expectedOutput}</span></p>
                          <p className="text-slate-600">Actual: <span className="text-slate-900 font-semibold">{tc.actualOutput}</span></p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-8">Run or submit your solution to inspect test outputs.</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
