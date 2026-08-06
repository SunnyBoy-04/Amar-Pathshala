import React from 'react';
import { GraduationCap, ShieldCheck, Heart, Send, Mail, MapPin, Phone } from 'lucide-react';

export default function SarkarFooter({ onNavigateTab, onOpenAuthModal, currentUser }) {
  const isAdmin = currentUser?.role === 'admin';

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900 mt-16 font-sans text-xs">
      {/* Top Footer Banner */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: About SarkarStudy */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">AMAR PATHSHALA</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              AmarPathshala.com is India's leading free government competitive exam preparation portal. We provide full-length mock tests, live exam timers, official admit card links, results, and PDF study notes.
            </p>

            <div className="flex items-center space-x-3 text-slate-400">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> New Delhi & Kolkata</span>
            </div>
          </div>

          {/* Col 2: Exam Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-navy-800 pb-2">
              Exam Portals
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigateTab('mock-tests')} className="hover:text-emerald-400 transition">SBI PO & IBPS Clerk Mocks</button></li>
              <li><button onClick={() => onNavigateTab('mock-tests')} className="hover:text-emerald-400 transition">SSC CGL Tier 1 & Tier 2 Series</button></li>
              <li><button onClick={() => onNavigateTab('mock-tests')} className="hover:text-emerald-400 transition">UPSC CSAT General Studies</button></li>
              <li><button onClick={() => onNavigateTab('mock-tests')} className="hover:text-emerald-400 transition">Railway RRB NTPC / Group D</button></li>
              <li><button onClick={() => onNavigateTab('pdf-library')} className="hover:text-emerald-400 transition">Monthly Current Affairs 2026</button></li>
            </ul>
          </div>

          {/* Col 3: Study Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-navy-800 pb-2">
              Free Study Resources
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigateTab('pdf-library')} className="hover:text-amber-300 transition">Arithmetic Formula Handbooks</button></li>
              <li><button onClick={() => onNavigateTab('pdf-library')} className="hover:text-amber-300 transition">Seating Arrangements & Puzzles 500 Set</button></li>
              <li><button onClick={() => onNavigateTab('pdf-library')} className="hover:text-amber-300 transition">English 100 Golden Grammar Rules</button></li>
              <li><button onClick={() => onNavigateTab('pdf-library')} className="hover:text-amber-300 transition">Previous Year Question Papers (PYQs)</button></li>
              <li><button onClick={() => onNavigateTab('pdf-library')} className="hover:text-amber-300 transition">UPSC Passage Elimination Techniques</button></li>
            </ul>
          </div>

          {/* Col 4: Admin & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-navy-800 pb-2">
              Admin & Governance
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Managed and maintained by Chief Administrator <strong>RAKESH PATRA</strong>.
            </p>
            <div className="pt-2">
              {isAdmin ? (
                <button
                  onClick={() => onNavigateTab('admin')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow transition"
                >
                  Admin Dashboard Portal
                </button>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="px-4 py-2 bg-navy-800 hover:bg-blue-700 text-white font-extrabold rounded-xl transition flex items-center space-x-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Admin Login (RAKESH PATRA)</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-navy-900 border-t border-navy-950 py-4 text-slate-500">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <p>© 2026 AmarPathshala.com. All Rights Reserved. Empowering Competitive Exam Aspirants Nationwide.</p>
          <p className="flex items-center gap-1 text-slate-400 font-medium">
            Designed with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Amar Pathshala Aspirants
          </p>
        </div>
      </div>
    </footer>
  );
}
