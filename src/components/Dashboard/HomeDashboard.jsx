import React from 'react';
import { 
  Play, 
  FileText, 
  BookOpen, 
  Award, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Target,
  ArrowUpRight,
  Download
} from 'lucide-react';
import TestCard from '../MockTest/TestCard';

export default function HomeDashboard({ 
  mockTests, 
  pdfResources, 
  onStartTest, 
  onNavigateTab,
  selectedExam 
}) {
  const recentTests = mockTests.slice(0, 3);
  const featuredPdfs = pdfResources.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8">
      
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 14-Day Study Streak Active!
              </span>
              <span className="text-xs text-slate-300">Target: <strong>{selectedExam}</strong></span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, Rahul! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              You are currently performing in the <strong>Top 5% nationwide</strong> for {selectedExam}. Complete today's recommended full length mock to boost your accuracy.
            </p>
          </div>

          {/* Readiness Gauge Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center shrink-0 flex flex-col justify-center">
            <p className="text-[11px] text-slate-300 uppercase font-semibold tracking-wider">Exam Readiness Index</p>
            <div className="flex items-baseline justify-center space-x-1 my-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">84.5</span>
              <span className="text-xs font-bold text-emerald-300">/ 100</span>
            </div>
            <p className="text-[10px] text-slate-300 flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" /> +4.2% from last week
            </p>
          </div>

        </div>

      </div>

      {/* Quick Launch & Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Tests Attempted</p>
            <p className="text-2xl font-extrabold text-navy-950 mt-1">28 Full Mocks</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Avg Score: 74.2 Marks</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Overall Accuracy</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">89.4%</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Target: &gt;85%</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">PDF Materials Saved</p>
            <p className="text-2xl font-extrabold text-navy-950 mt-1">14 eBooks</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Offline Ready</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recommended Live Mock Tests Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Recommended Live Mock Tests
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Take live exam-pattern tests with instant timer and automated scorecard</p>
          </div>

          <button
            onClick={() => onNavigateTab('mock-tests')}
            className="flex items-center space-x-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition"
          >
            <span>View All ({mockTests.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentTests.map((test) => (
            <TestCard key={test.id} test={test} onStartTest={onStartTest} />
          ))}
        </div>
      </div>

      {/* Popular PDF Resources Highlight */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Top PDF Study Resources & Handbooks
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Download previous year solved papers & quick revision formula handbooks</p>
          </div>

          <button
            onClick={() => onNavigateTab('pdf-library')}
            className="flex items-center space-x-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition"
          >
            <span>Explore Library</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPdfs.map((pdf) => (
            <div key={pdf.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition">
              <div>
                <span className="px-2.5 py-0.5 bg-navy-50 text-navy-800 text-[10px] font-bold rounded">
                  {pdf.examTag}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-2">
                  {pdf.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {pdf.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-semibold">{pdf.fileSize} • {pdf.pages} Pages</span>
                <button
                  onClick={() => onNavigateTab('pdf-library')}
                  className="flex items-center space-x-1 text-xs font-bold text-blue-700 hover:text-blue-900"
                >
                  <span>Download</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
