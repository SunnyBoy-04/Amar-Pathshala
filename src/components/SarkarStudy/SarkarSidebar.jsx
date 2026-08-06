import React from 'react';
import { 
  Send, 
  MessageCircle, 
  Sparkles, 
  BookOpen, 
  Award, 
  Layers, 
  Calendar, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export default function SarkarSidebar({ onNavigateTab, onOpenAuthModal, currentUser }) {
  const categories = [
    { name: "Banking & Insurance", count: 48, tag: "SBI / IBPS" },
    { name: "SSC Exams (CGL/CHSL)", count: 62, tag: "SSC CGL" },
    { name: "UPSC Civil Services", count: 34, tag: "UPSC CSAT" },
    { name: "Railways (RRB NTPC)", count: 29, tag: "RRB" },
    { name: "Current Affairs 2026", count: 85, tag: "GA Special" },
    { name: "State PSC & Police", count: 41, tag: "State Exam" }
  ];

  const currentAffairsHighlights = [
    "RBI Monetary Policy Committee 2026 Highlights",
    "Union Budget & Economic Survey Crucial Data Points",
    "National & International Summits 2026 Complete Digest",
    "ISRO Space Missions & Defence Exercises Handbooks"
  ];

  const isAdmin = currentUser?.role === 'admin';

  return (
    <aside className="space-y-6 font-sans">
      
      {/* Telegram & WhatsApp Channel Callout */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-blue-800 space-y-4">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-extrabold rounded-full border border-blue-400/30 uppercase tracking-wider">
            Official Channels
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-white leading-snug">
          Get Instant Job Alerts & Free PDFs on Mobile
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed">
          Join 250,000+ serious aspirants receiving daily current affairs, exam dates, admit card links, and PDF notes directly on Telegram & WhatsApp.
        </p>

        <div className="space-y-2.5 pt-1">
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Join Telegram Channel</span>
          </a>

          <a
            href="https://chat.whatsapp.com/EFQs2nncJnnCmna3IjcetU?s=cl&p=a&ilr=1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Join WhatsApp Group</span>
          </a>
        </div>
      </div>

      {/* Exam Categories Navigation Widget */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Layers className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Exam Categories</h3>
        </div>

        <ul className="space-y-2">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              onClick={() => onNavigateTab('mock-tests')}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs transition cursor-pointer group"
            >
              <span className="font-bold text-slate-700 group-hover:text-blue-700 transition">
                {cat.name}
              </span>
              <span className="px-2 py-0.5 bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-800 text-[10px] font-extrabold rounded-md transition">
                {cat.count} Sets
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Daily Current Affairs Digest Widget */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Daily GA Digest</h3>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">2026 Edition</span>
        </div>

        <ul className="space-y-2.5">
          {currentAffairsHighlights.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition cursor-pointer">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onNavigateTab('pdf-library')}
          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5"
        >
          <span>Download GA Capsules</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Admin Quick Portal Access Widget */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-extrabold">Admin Portal</h3>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded border border-amber-500/30">RAKESH PATRA</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Upload CSV Mock Tests, publish PDF study materials, and manage exam syllabi.
        </p>

        {isAdmin ? (
          <button
            onClick={() => onNavigateTab('admin')}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center space-x-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Open Admin Dashboard</span>
          </button>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="w-full py-2.5 bg-navy-800 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center space-x-2"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Admin Login</span>
          </button>
        )}
      </div>

    </aside>
  );
}
