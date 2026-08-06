import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

export default function SarkarTicker() {
  const tickerItems = [
    "🔥 SBI PO 2026 Shift-2 Live Mock Test Uploaded — Start Test Now!",
    "⚡ SSC CGL Tier-1 Official Answer Key & Cutoff Released",
    "📌 Monthly Current Affairs & Banking Awareness Capsule (Jan - June 2026) PDF Download Active",
    "🎯 UPSC CSAT CS Prelims 2026 Rulebook & Solved Papers Available",
    "📢 Railway RRB NTPC General Science 1000 MCQs eBook Uploaded by Admin"
  ];

  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white text-xs font-semibold py-1.5 px-4 shadow-inner border-b border-red-800 flex items-center overflow-hidden">
      <div className="flex items-center space-x-1.5 shrink-0 bg-red-900/90 text-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider mr-3 border border-amber-400/40">
        <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
        <span>LIVE UPDATES</span>
      </div>

      <div className="overflow-hidden relative w-full whitespace-nowrap">
        <div className="inline-flex space-x-8 text-xs font-medium animate-pulse">
          {tickerItems.map((item, index) => (
            <span key={index} className="inline-flex items-center space-x-2 text-slate-100 hover:text-amber-200 transition cursor-pointer">
              <Sparkles className="w-3 h-3 text-amber-300 inline shrink-0" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
