import React from 'react';
import { 
  Briefcase, 
  FileText, 
  Award, 
  BookOpen, 
  ExternalLink, 
  Download, 
  Sparkles, 
  Play, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export default function SarkarHeroGrid({ 
  mockTests = [], 
  pdfResources = [], 
  onStartTest, 
  onNavigateTab 
}) {
  const latestJobs = [
    { title: "SBI PO 2026 Recruitment Online Form", tag: "Apply Now", badge: "HOT", date: "August 2026" },
    { title: "SSC CGL Tier-1 Notification & Application", tag: "Live", badge: "NEW", date: "August 2026" },
    { title: "UPSC Civil Services Prelims 2026 Form", tag: "Active", badge: "POPULAR", date: "July 2026" },
    { title: "IBPS RRB Officer Scale I & II Online Form", tag: "Apply Now", badge: "NEW", date: "July 2026" },
    { title: "Railway RRB NTPC 11,558 Posts Recruitment", tag: "Upcoming", badge: "HOT", date: "August 2026" },
    { title: "LIC AAO 2026 Generalist Notification Out", tag: "Active", badge: "NEW", date: "July 2026" }
  ];

  const admitCards = [
    { title: "SBI PO Prelims Admit Card 2026", tag: "Download", badge: "ACTIVE", date: "August 2026" },
    { title: "SSC CHSL Tier 2 Call Letter 2026", tag: "Download", badge: "NEW", date: "August 2026" },
    { title: "IBPS Clerk Mains Admit Card 2026", tag: "Out", badge: "HOT", date: "July 2026" },
    { title: "UPSC CSAT Prelims Exam City Slip", tag: "Check", badge: "NEW", date: "August 2026" },
    { title: "RRB JE CBT-1 Hall Ticket Release", tag: "Download", badge: "ACTIVE", date: "July 2026" }
  ];

  const resultsKeys = [
    { title: "SBI Clerk Final Scorecard & Cutoff 2026", tag: "Result", badge: "OUT", date: "August 2026" },
    { title: "SSC CGL Tier 1 Official Answer Key 2026", tag: "Key", badge: "NEW", date: "August 2026" },
    { title: "UPSC CSAT Marks & Candidate Ranks", tag: "Result", badge: "HOT", date: "July 2026" },
    { title: "IBPS PO Prelims Cutoff Category-wise", tag: "Cutoff", badge: "NEW", date: "August 2026" },
    { title: "RRB ALP CBT-2 Provisional Answer Key", tag: "Key", badge: "OUT", date: "July 2026" }
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* SarkarStudy Hero Header Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-navy-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-extrabold rounded-full border border-amber-500/30 uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Official Exam Portal
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              AmarPathshala.com — Govt Jobs, Mock Tests & PDF Notes
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              India's premier portal for competitive exam preparation. Practice full-length test series with live countdown timer and download topper-curated PDF study resources.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('mock-tests')}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center space-x-2 transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Practice Mock Tests ({mockTests.length})</span>
            </button>

            <button
              onClick={() => onNavigateTab('pdf-library')}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center space-x-2 transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Notes ({pdfResources.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Signature 4-Column SarkarStudy Grid Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Column 1: Latest Jobs / Vacancies */}
        <div className="bg-white rounded-2xl border border-red-200 shadow-md overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-gradient-to-r from-red-700 to-red-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-amber-300" />
                <h3 className="text-sm font-extrabold uppercase tracking-wide">Latest Jobs 2026</h3>
              </div>
              <span className="text-[10px] bg-red-900/80 px-2 py-0.5 rounded font-bold">UPDATED</span>
            </div>

            <ul className="divide-y divide-slate-100 text-xs">
              {latestJobs.map((job, idx) => (
                <li key={idx} className="p-3.5 hover:bg-red-50/50 transition flex items-start justify-between gap-2 group cursor-pointer">
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-red-600 transition leading-snug">
                      {job.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{job.date}</p>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-extrabold rounded">
                    {job.badge}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button onClick={() => onNavigateTab('mock-tests')} className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center justify-center space-x-1 mx-auto">
              <span>View All Recruitment Notifications</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Column 2: Admit Cards */}
        <div className="bg-white rounded-2xl border border-blue-200 shadow-md overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-amber-300" />
                <h3 className="text-sm font-extrabold uppercase tracking-wide">Admit Cards</h3>
              </div>
              <span className="text-[10px] bg-blue-950/80 px-2 py-0.5 rounded font-bold">ACTIVE</span>
            </div>

            <ul className="divide-y divide-slate-100 text-xs">
              {admitCards.map((card, idx) => (
                <li key={idx} className="p-3.5 hover:bg-blue-50/50 transition flex items-start justify-between gap-2 group cursor-pointer">
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-blue-700 transition leading-snug">
                      {card.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{card.date}</p>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-extrabold rounded">
                    {card.badge}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button onClick={() => onNavigateTab('mock-tests')} className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center justify-center space-x-1 mx-auto">
              <span>View All Admit Cards</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Column 3: Results & Answer Keys */}
        <div className="bg-white rounded-2xl border border-emerald-200 shadow-md overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-300" />
                <h3 className="text-sm font-extrabold uppercase tracking-wide">Results & Keys</h3>
              </div>
              <span className="text-[10px] bg-emerald-900/80 px-2 py-0.5 rounded font-bold">RELEASED</span>
            </div>

            <ul className="divide-y divide-slate-100 text-xs">
              {resultsKeys.map((res, idx) => (
                <li key={idx} className="p-3.5 hover:bg-emerald-50/50 transition flex items-start justify-between gap-2 group cursor-pointer">
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {res.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{res.date}</p>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded">
                    {res.badge}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button onClick={() => onNavigateTab('mock-tests')} className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center justify-center space-x-1 mx-auto">
              <span>Check Scorecards & Cutoffs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Column 4: Free PDF Study Notes & Books */}
        <div className="bg-white rounded-2xl border border-purple-200 shadow-md overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-amber-300" />
                <h3 className="text-sm font-extrabold uppercase tracking-wide">PDF Study Notes</h3>
              </div>
              <span className="text-[10px] bg-purple-950/80 px-2 py-0.5 rounded font-bold">FREE PDF</span>
            </div>

            <ul className="divide-y divide-slate-100 text-xs">
              {pdfResources.slice(0, 5).map((pdf) => (
                <li 
                  key={pdf.id} 
                  onClick={() => onNavigateTab('pdf-library')}
                  className="p-3.5 hover:bg-purple-50/50 transition flex items-start justify-between gap-2 group cursor-pointer"
                >
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-purple-700 transition line-clamp-2 leading-snug">
                      {pdf.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{pdf.fileSize} • {pdf.category}</p>
                  </div>
                  <span className="shrink-0 p-1.5 bg-purple-100 text-purple-700 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition">
                    <Download className="w-3.5 h-3.5" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button onClick={() => onNavigateTab('pdf-library')} className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center justify-center space-x-1 mx-auto">
              <span>Browse Full PDF EBook Library</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
