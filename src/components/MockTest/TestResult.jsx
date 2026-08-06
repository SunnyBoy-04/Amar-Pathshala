import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Target, 
  BarChart3, 
  RotateCcw, 
  Home, 
  Check, 
  HelpCircle,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function TestResult({ resultData, onRetake, onGoHome }) {
  const { test, userAnswers, timeSpentSeconds, submittedAt } = resultData;
  const questions = test.questions || [];

  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'CORRECT' | 'INCORRECT' | 'UNATTEMPTED'
  const [expandedSolutions, setExpandedSolutions] = useState({});

  // Grading Logic
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;
  let totalScore = 0;

  // Section Breakdown Data Map
  const sectionStats = {};

  questions.forEach(q => {
    if (!sectionStats[q.section]) {
      sectionStats[q.section] = { total: 0, attempted: 0, correct: 0, incorrect: 0, score: 0 };
    }
    sectionStats[q.section].total += 1;

    const userAns = userAnswers[q.id];
    if (userAns === undefined || userAns === null) {
      unattemptedCount += 1;
    } else if (userAns === q.correctAnswer) {
      correctCount += 1;
      totalScore += test.positiveMark;
      sectionStats[q.section].attempted += 1;
      sectionStats[q.section].correct += 1;
      sectionStats[q.section].score += test.positiveMark;
    } else {
      incorrectCount += 1;
      totalScore -= test.negativeMark;
      sectionStats[q.section].attempted += 1;
      sectionStats[q.section].incorrect += 1;
      sectionStats[q.section].score -= test.negativeMark;
    }
  });

  const attemptedCount = correctCount + incorrectCount;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  const isCutoffCleared = totalScore >= (test.cutoffEstimate || 10);
  const percentileEstimate = Math.min(99.9, Math.max(45.0, (accuracy * 0.95 + 10)).toFixed(1));

  const formatSpentTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const toggleSolutionExpand = (qId) => {
    setExpandedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Filter Solutions
  const filteredQuestions = questions.filter(q => {
    const userAns = userAnswers[q.id];
    if (activeFilter === 'CORRECT') return userAns === q.correctAnswer;
    if (activeFilter === 'INCORRECT') return userAns !== undefined && userAns !== null && userAns !== q.correctAnswer;
    if (activeFilter === 'UNATTEMPTED') return userAns === undefined || userAns === null;
    return true; // 'ALL'
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Top Result Banner */}
        <div className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden ${
          isCutoffCleared 
            ? 'bg-gradient-to-r from-navy-900 via-navy-800 to-blue-900' 
            : 'bg-gradient-to-r from-slate-900 via-slate-800 to-navy-950'
        }`}>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30">
                  Official Performance Evaluation
                </span>
                <span className="text-xs text-slate-300">
                  {test.examTag}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {test.title}
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Completed on {new Date(submittedAt).toLocaleDateString()} at {new Date(submittedAt).toLocaleTimeString()}
              </p>
            </div>

            {/* Cutoff Status Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shrink-0">
              <span className="text-[10px] text-slate-300 uppercase tracking-widest block font-semibold">Cutoff Status</span>
              <p className={`text-base font-extrabold mt-1 flex items-center justify-center gap-1.5 ${
                isCutoffCleared ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {isCutoffCleared ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Cutoff Cleared!
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" /> Below Target Cutoff
                  </>
                )}
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">Estimated Cutoff: {test.cutoffEstimate} Marks</p>
            </div>

          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-center">
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-[10px] text-slate-300 uppercase font-semibold">Score Obtained</p>
              <p className="text-xl font-extrabold text-white mt-0.5">
                {totalScore.toFixed(2)} <span className="text-xs font-normal text-slate-300">/ {test.totalMarks}</span>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-[10px] text-slate-300 uppercase font-semibold">Accuracy Rate</p>
              <p className="text-xl font-extrabold text-emerald-400 mt-0.5">
                {accuracy}%
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-[10px] text-slate-300 uppercase font-semibold">Percentile Rank</p>
              <p className="text-xl font-extrabold text-amber-300 mt-0.5 flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {percentileEstimate}%
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-[10px] text-slate-300 uppercase font-semibold">Time Spent</p>
              <p className="text-xl font-extrabold text-white mt-0.5">
                {formatSpentTime(timeSpentSeconds)}
              </p>
            </div>

          </div>

        </div>

        {/* Quick Actions Row */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-600 font-medium">
            Attempts Breakdown: <strong className="text-emerald-700">{correctCount} Correct</strong>, <strong className="text-red-600">{incorrectCount} Incorrect</strong>, <strong className="text-slate-500">{unattemptedCount} Unattempted</strong>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={onRetake}
              className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </button>
            <button
              onClick={onGoHome}
              className="flex items-center space-x-1.5 px-4 py-2 bg-navy-800 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>

        {/* Section Breakdown Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Sectional Performance Analysis
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase">
                  <th className="py-3 px-4">Section Name</th>
                  <th className="py-3 px-4 text-center">Total Qs</th>
                  <th className="py-3 px-4 text-center">Attempted</th>
                  <th className="py-3 px-4 text-center text-emerald-700">Correct</th>
                  <th className="py-3 px-4 text-center text-red-600">Incorrect</th>
                  <th className="py-3 px-4 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.keys(sectionStats).map((sec, idx) => {
                  const s = sectionStats[sec];
                  const secAcc = s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{sec}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700">{s.total}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700">{s.attempted}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-600">{s.correct}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-red-500">{s.incorrect}</td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-navy-800">
                        {s.score.toFixed(2)}
                        <span className="block text-[10px] font-normal text-slate-400">Acc: {secAcc}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Solutions Review Header & Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                Detailed Question Solutions & Explanations
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review step-by-step logic, correct answer keys, and derivations.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  activeFilter === 'ALL' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                onClick={() => setActiveFilter('CORRECT')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  activeFilter === 'CORRECT' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Correct ({correctCount})
              </button>
              <button
                onClick={() => setActiveFilter('INCORRECT')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  activeFilter === 'INCORRECT' ? 'bg-red-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Incorrect ({incorrectCount})
              </button>
              <button
                onClick={() => setActiveFilter('UNATTEMPTED')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  activeFilter === 'UNATTEMPTED' ? 'bg-slate-300 text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Unattempted ({unattemptedCount})
              </button>
            </div>

          </div>

          {/* Solutions List */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs font-medium">
                No questions found under the selected filter.
              </div>
            ) : (
              filteredQuestions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                const isUnattempted = userAns === undefined || userAns === null;
                const isExpanded = expandedSolutions[q.id] !== false; // expanded by default

                return (
                  <div
                    key={q.id}
                    className={`border rounded-2xl overflow-hidden transition ${
                      isCorrect 
                        ? 'border-emerald-200 bg-emerald-50/20' 
                        : isUnattempted 
                        ? 'border-slate-200 bg-white' 
                        : 'border-red-200 bg-red-50/20'
                    }`}
                  >
                    {/* Header */}
                    <div
                      onClick={() => toggleSolutionExpand(q.id)}
                      className="p-4 flex items-start justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-start space-x-3">
                        <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                          isCorrect 
                            ? 'bg-emerald-600 text-white' 
                            : isUnattempted 
                            ? 'bg-slate-200 text-slate-700' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {q.id}
                        </span>

                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[11px] font-semibold text-slate-500 uppercase">{q.section}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              isCorrect 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : isUnattempted 
                                ? 'bg-slate-100 text-slate-600' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {isCorrect ? 'Correct (+1.0)' : isUnattempted ? 'Unattempted (0.0)' : 'Incorrect (-0.25)'}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-2">
                            {q.question}
                          </p>
                        </div>
                      </div>

                      <button className="text-slate-400 hover:text-slate-600 p-1">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Detailed Content */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 border-t border-slate-100/80 space-y-3">
                        
                        {/* Options comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt, optIdx) => {
                            const isUserSelected = userAns === optIdx;
                            const isCorrectOpt = q.correctAnswer === optIdx;

                            let optStyle = 'bg-white border-slate-200 text-slate-700';
                            if (isCorrectOpt) {
                              optStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                            } else if (isUserSelected && !isCorrectOpt) {
                              optStyle = 'bg-red-100 border-red-400 text-red-950 font-semibold line-through';
                            }

                            return (
                              <div key={optIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${optStyle}`}>
                                <span>{opt}</span>
                                {isCorrectOpt && (
                                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">Correct Key</span>
                                )}
                                {isUserSelected && !isCorrectOpt && (
                                  <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded">Your Answer</span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Step-by-step Explanation Card */}
                        <div className="bg-navy-950 text-slate-200 p-4 rounded-xl text-xs space-y-1.5">
                          <p className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> Step-by-Step Solution & Concept:
                          </p>
                          <p className="whitespace-pre-line leading-relaxed text-slate-300 font-sans">
                            {q.explanation}
                          </p>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
