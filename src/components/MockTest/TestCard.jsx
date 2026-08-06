import React from 'react';
import { Clock, HelpCircle, Award, Play, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

export default function TestCard({ test, onStartTest }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      
      {/* Top Banner & Tags */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 bg-navy-50 text-navy-800 text-xs font-bold rounded-lg border border-navy-100 uppercase tracking-wide">
            {test.examTag}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
            test.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
            test.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' :
            'bg-purple-100 text-purple-700'
          }`}>
            {test.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-3">
          {test.title}
        </h3>

        {/* Sections Pill list */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {test.sections.map((sec, idx) => (
            <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
              {sec}
            </span>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50 rounded-xl px-3 border border-slate-100 text-center">
          <div>
            <p className="text-[10px] text-slate-400 font-medium uppercase">Questions</p>
            <p className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              {test.totalQuestions}
            </p>
          </div>
          <div className="border-x border-slate-200">
            <p className="text-[10px] text-slate-400 font-medium uppercase">Duration</p>
            <p className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              {test.durationMinutes} mins
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium uppercase">Total Marks</p>
            <p className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              {test.totalMarks}
            </p>
          </div>
        </div>
      </div>

      {/* Footer & Action */}
      <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div className="text-[11px] text-slate-500">
          <span className="font-semibold text-emerald-600">+{test.positiveMark}</span> / <span className="text-red-500">-{test.negativeMark}</span> mark rule
        </div>

        <button
          onClick={() => onStartTest(test)}
          className="flex items-center space-x-1.5 bg-navy-800 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all transform active:scale-95 group-hover:shadow-md"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Test</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

    </div>
  );
}
