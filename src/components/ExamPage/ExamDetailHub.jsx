import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Award, 
  Download, 
  Play, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  ChevronRight,
  Share2,
  Bookmark
} from 'lucide-react';

// Comprehensive Exam Data Registry
const EXAM_DETAILS = {
  WBPSC: {
    key: 'WBPSC',
    title: 'WBPSC Recruitment Portal (West Bengal Public Service Commission)',
    shortName: 'WBPSC Exams 2026',
    icon: '🏛',
    badgeColor: 'bg-blue-600',
    bannerGradient: 'from-blue-900 via-indigo-950 to-slate-900',
    authority: 'West Bengal Public Service Commission (WBPSC)',
    description: 'Comprehensive preparation hub for WBPSC Miscellaneous Services, Food SI, WBCS Executive, and Clerkship Examinations. Access free PDF study notes, previous year question papers (2018-2025), and full-length online mock test series in Bengali & English.',
    stats: {
      totalCandidates: '450,000+',
      availablePdfs: '120+ Notes',
      mockTests: '45 Mocks',
      avgSalary: '₹28,900 - ₹74,500/mo'
    },
    upcomingExams: [
      { name: 'WBPSC Miscellaneous Prelims 2024-26', date: 'Expected Nov 2026', status: 'Admit Card Soon' },
      { name: 'WBPSC Food SI Recruitment Exam', date: 'Exam Scheduled', status: 'Official Notice Released' },
      { name: 'WBPSC Clerkship Part-I & Part-II', date: 'Dec 2026', status: 'Notification Out' },
      { name: 'WBCS Executive Prelims 2026', date: 'Jan 2027', status: 'Syllabus Updated' }
    ],
    subjects: [
      {
        name: 'General Studies & West Bengal GK',
        weightage: '50 Marks',
        topics: [
          'History of West Bengal & Indian Freedom Movement',
          'Geography of West Bengal (Rivers, Districts, Soil, Climate)',
          'Indian Polity & Constitution (Preamble, Fundamental Rights)',
          'Static GK in Bengali (First in Bengal, Awards, Books & Authors)',
          'Everyday General Science (Physics, Chemistry, Life Science)'
        ]
      },
      {
        name: 'Arithmetic & Numerical Ability',
        weightage: '50 Marks',
        topics: [
          'Percentage & Profit/Loss Shortcut Formulas',
          'Simple & Compound Interest Tricks',
          'Ratio & Proportion, Mixture & Alligation',
          'Time & Work, Pipes & Cisterns',
          'Average, Age Problems & Number System'
        ]
      },
      {
        name: 'Bengali & English Language',
        weightage: '50 Marks',
        topics: [
          'Bengali Grammar (Sandhi, Samas, Karak, Sadhu to Chalit)',
          'English Grammar (Synonyms, Antonyms, Prepositions, Error Spotting)',
          'Report Writing & Translation (English to Bengali)'
        ]
      }
    ],
    pdfs: [
      { id: 'wbpsc-pdf-1', title: 'WBPSC Miscellaneous Previous 10 Years Question Paper PDF (2014-2024)', downloads: '48,200', pages: '84 Pages', size: '6.4 MB', category: 'Previous Year' },
      { id: 'wbpsc-pdf-2', title: 'WBPSC Food SI Special Bengali GK & Math Practice Book PDF 2026', downloads: '32,150', pages: '62 Pages', size: '4.8 MB', category: 'Handwritten Notes' },
      { id: 'wbpsc-pdf-3', title: 'West Bengal District Wise Geography & Static GK Special PDF', downloads: '29,400', pages: '45 Pages', size: '3.5 MB', category: 'Static GK' },
      { id: 'wbpsc-pdf-4', title: 'WBPSC Clerkship Typing Test Guide & Official Practice Passages', downloads: '18,900', pages: '30 Pages', size: '2.1 MB', category: 'Typing Guide' }
    ],
    mockTests: [
      { id: 'wbpsc-mock-1', title: 'WBPSC Miscellaneous Prelims Full Length Mock Test 01', duration: '90 Mins', questions: 100, marks: 200, passScore: 135, language: 'Bengali & English' },
      { id: 'wbpsc-mock-2', title: 'WBPSC Food SI Arithmetic & General Studies Speed Test 02', duration: '90 Mins', questions: 100, marks: 100, passScore: 78, language: 'Bengali' },
      { id: 'wbpsc-mock-3', title: 'WBPSC Clerkship English & General Studies Practice Set 03', duration: '90 Mins', questions: 100, marks: 100, passScore: 72, language: 'Bengali & English' }
    ],
    cutoffs: [
      { category: 'General / UR', prelims: '128.50 Marks', mains: '310 Marks' },
      { category: 'OBC-A / OBC-B', prelims: '121.00 Marks', mains: '295 Marks' },
      { category: 'SC (Scheduled Caste)', prelims: '112.25 Marks', mains: '270 Marks' },
      { category: 'ST (Scheduled Tribe)', prelims: '95.50 Marks', mains: '235 Marks' }
    ]
  },

  SSC: {
    key: 'SSC',
    title: 'Staff Selection Commission (SSC CGL, CHSL, GD Constable & MTS)',
    shortName: 'SSC Exams 2026',
    icon: '🎯',
    badgeColor: 'bg-emerald-600',
    bannerGradient: 'from-emerald-950 via-teal-900 to-slate-900',
    authority: 'Staff Selection Commission (Government of India)',
    description: 'Complete syllabus guide, topper handwritten notes, and CBT mock exam series for SSC CGL Tier 1 & 2, SSC GD Constable Bengali Edition, SSC CHSL, and SSC MTS. All study materials available in both English & Bengali medium.',
    stats: {
      totalCandidates: '1,200,000+',
      availablePdfs: '210+ Notes',
      mockTests: '80 Mocks',
      avgSalary: '₹21,700 - ₹81,100/mo'
    },
    upcomingExams: [
      { name: 'SSC GD Constable Exam 2026 (Bengali Edition)', date: 'Feb 2026', status: 'Exam Ongoing' },
      { name: 'SSC CGL Tier-I National Exam', date: 'Sept 2026', status: 'Notification Released' },
      { name: 'SSC CHSL 10+2 Computer Based Test', date: 'Aug 2026', status: 'Apply Online' },
      { name: 'SSC MTS & Havaldar Recruitment', date: 'Oct 2026', status: 'Exam Calendar Released' }
    ],
    subjects: [
      {
        name: 'General Intelligence & Reasoning',
        weightage: '50 Marks',
        topics: [
          'Analogy, Classification & Coding-Decoding',
          'Syllogism, Statement & Conclusion',
          'Blood Relations, Direction Sense Test',
          'Non-Verbal Reasoning (Paper Folding, Mirror Images)',
          'Seating Arrangement & Puzzles'
        ]
      },
      {
        name: 'General Awareness & Science',
        weightage: '50 Marks',
        topics: [
          'Indian History (Ancient, Medieval, Modern National Movement)',
          'Indian Polity (Parliament, Judiciary, Constitutional Amendments)',
          'Economics & Union Budget Highlights',
          'Physics, Chemistry & Biology NCERT Summary',
          'Current Affairs (Sports, Appointments, Government Schemes)'
        ]
      },
      {
        name: 'Quantitative Aptitude (Mathematics)',
        weightage: '50 Marks',
        topics: [
          'Number System, HCF & LCM',
          'Algebraic Identities & Polynomials',
          'Geometry & Mensuration (2D & 3D Formulas)',
          'Trigonometry & Height & Distance',
          'Data Interpretation (Bar Graphs, Pie Charts)'
        ]
      }
    ],
    pdfs: [
      { id: 'ssc-pdf-1', title: 'SSC GD Constable Special Bengali General Knowledge Book PDF 2026', downloads: '54,100', pages: '92 Pages', size: '7.1 MB', category: 'GK Book' },
      { id: 'ssc-pdf-2', title: 'SSC CGL Tier 1 + Tier 2 All Formula Handbook PDF (Math & Reasoning)', downloads: '41,800', pages: '50 Pages', size: '4.2 MB', category: 'Formula Sheet' },
      { id: 'ssc-pdf-3', title: 'SSC 5000+ Previous Year General Awareness MCQs in Bengali PDF', downloads: '38,900', pages: '110 Pages', size: '8.5 MB', category: 'Question Bank' }
    ],
    mockTests: [
      { id: 'ssc-mock-1', title: 'SSC GD Constable Full Length CBT Mock Test 01 (Bengali)', duration: '60 Mins', questions: 80, marks: 160, passScore: 120, language: 'Bengali & English' },
      { id: 'ssc-mock-2', title: 'SSC CGL Tier-1 Speed Practice Mock Test 02', duration: '60 Mins', questions: 100, marks: 200, passScore: 142, language: 'English & Hindi' }
    ],
    cutoffs: [
      { category: 'UR / General', prelims: '137.50 Marks', mains: '287 Marks' },
      { category: 'OBC', prelims: '131.20 Marks', mains: '272 Marks' },
      { category: 'EWS', prelims: '128.00 Marks', mains: '265 Marks' },
      { category: 'SC / ST', prelims: '109.50 Marks', mains: '240 Marks' }
    ]
  },

  RRB: {
    key: 'RRB',
    title: 'Railway Recruitment Board (RRB NTPC, Group D, ALP & Technicians)',
    shortName: 'Railway RRB Exams 2026',
    icon: '🚆',
    badgeColor: 'bg-amber-600',
    bannerGradient: 'from-amber-950 via-amber-900 to-slate-900',
    authority: 'Ministry of Railways (Indian Railways RRB)',
    description: 'Indian Railway RRB NTPC (Non-Technical Popular Categories), Group D, Assistant Loco Pilot (ALP), and RPF Constable CBT test portal. Practice Bengali science MCQs, math shortcut formulas, and live computer based test simulations.',
    stats: {
      totalCandidates: '980,000+',
      availablePdfs: '150+ Notes',
      mockTests: '60 Mocks',
      avgSalary: '₹19,900 - ₹63,200/mo'
    },
    upcomingExams: [
      { name: 'RRB NTPC Graduate & Under Graduate Posts 2026', date: 'Expected Late 2026', status: 'Official Vacancy Announced' },
      { name: 'RRB Assistant Loco Pilot (ALP) CBT 1 & 2', date: 'Exam Scheduled', status: 'City Intimation Live' },
      { name: 'Railway RPF Constable & Sub-Inspector CBT', date: 'Nov 2026', status: 'Admit Card Live' }
    ],
    subjects: [
      {
        name: 'General Science (Physics, Chemistry, Biology)',
        weightage: '40 Marks',
        topics: [
          'Physics (Work, Power, Energy, Motion Laws, Electricity, Light)',
          'Chemistry (Periodic Table, Chemical Reactions, Acids & Bases)',
          'Life Science (Cell Structure, Human Physiology, Diseases & Vitamins)'
        ]
      },
      {
        name: 'Mathematics & Mental Ability',
        weightage: '30 Marks',
        topics: [
          'Speed, Time & Distance (Train & Platform Crossing Problems)',
          'Simplification & BODMAS Rule Shortcut Calculations',
          'Square Root, Cube Root, Surds & Indices',
          'Percentage, Profit & Loss, Simple Interest'
        ]
      }
    ],
    pdfs: [
      { id: 'rrb-pdf-1', title: 'Railway Special 2000+ Science General Science MCQ Book in Bengali PDF', downloads: '45,300', pages: '78 Pages', size: '5.9 MB', category: 'Science Book' },
      { id: 'rrb-pdf-2', title: 'RRB NTPC Previous Year Solved Question Papers PDF (Bengali Edition)', downloads: '36,400', pages: '95 Pages', size: '7.8 MB', category: 'Previous Year' }
    ],
    mockTests: [
      { id: 'rrb-mock-1', title: 'RRB NTPC CBT-1 Full Length CBT Mock Test 01', duration: '90 Mins', questions: 100, marks: 100, passScore: 74, language: 'Bengali & English' },
      { id: 'rrb-mock-2', title: 'Railway Group D General Science & Math Practice Set 02', duration: '90 Mins', questions: 100, marks: 100, passScore: 68, language: 'Bengali' }
    ],
    cutoffs: [
      { category: 'UR / General', prelims: '71.50 Marks', mains: '78 Marks' },
      { category: 'OBC', prelims: '65.20 Marks', mains: '72 Marks' },
      { category: 'SC / ST', prelims: '55.00 Marks', mains: '62 Marks' }
    ]
  },

  Nursing: {
    key: 'Nursing',
    title: 'Nursing Entrance Exams (ANM & GNM, JENPAS UG WBCHSE)',
    shortName: 'ANM & GNM Nursing 2026',
    icon: '🩺',
    badgeColor: 'bg-rose-600',
    bannerGradient: 'from-rose-950 via-pink-900 to-slate-900',
    authority: 'West Bengal Joint Entrance Examinations Board (WBJEEB)',
    description: 'Dedicated preparation hub for West Bengal ANM (Auxiliary Nurse Midwife) & GNM (General Nursing and Midwifery) entrance exam and JENPAS UG. Features Class 9-10 Life Science notes, Physical Science MCQs, and category-wise mock tests.',
    stats: {
      totalCandidates: '220,000+',
      availablePdfs: '85+ Notes',
      mockTests: '30 Mocks',
      avgSalary: 'Government Hospital Stipend'
    },
    upcomingExams: [
      { name: 'WB ANM & GNM Entrance Exam 2026', date: 'July 2026', status: 'Official Notification Out' },
      { name: 'JENPAS UG B.Sc Nursing Entrance', date: 'June 2026', status: 'Registration Open' }
    ],
    subjects: [
      {
        name: 'Life Science (Category 1 & Category 2)',
        weightage: '50 Marks',
        topics: [
          'Cell & Genetics (DNA, RNA, Cell Division Mitosis & Meiosis)',
          'Plant Physiology (Photosynthesis, Respiration, Plant Hormones)',
          'Human Body Systems (Circulatory, Nervous, Digestive, Excretory)',
          'Ecology, Environment & Pollution Control'
        ]
      },
      {
        name: 'Physical Science & Basic Mathematics',
        weightage: '25 Marks',
        topics: [
          'Matter, Atoms, Molecules & Chemical Bonding',
          'Force, Motion, Work, Power & Energy',
          'Light, Sound, Heat & Sound Waves',
          'Basic Arithmetic (Percentage, Ratio, Average)'
        ]
      }
    ],
    pdfs: [
      { id: 'nursing-pdf-1', title: 'ANM & GNM Life Science 1000+ Chapter Wise MCQ Book PDF in Bengali', downloads: '28,900', pages: '68 Pages', size: '4.9 MB', category: 'Life Science' },
      { id: 'nursing-pdf-2', title: 'WB ANM GNM Previous Year Question Paper with Answer Key PDF', downloads: '22,400', pages: '42 Pages', size: '3.1 MB', category: 'Previous Year' }
    ],
    mockTests: [
      { id: 'nursing-mock-1', title: 'WB ANM & GNM Entrance Full Length Mock Test 01', duration: '90 Mins', questions: 100, marks: 115, passScore: 78, language: 'Bengali' }
    ],
    cutoffs: [
      { category: 'UR / General', prelims: '76.00 Marks', mains: 'N/A' },
      { category: 'OBC-A / OBC-B', prelims: '68.50 Marks', mains: 'N/A' },
      { category: 'SC / ST', prelims: '58.00 Marks', mains: 'N/A' }
    ]
  },

  Banking: {
    key: 'Banking',
    title: 'Banking Exams (SBI PO, IBPS Clerk, RBI Assistant & PO)',
    shortName: 'Banking Exams 2026',
    icon: '💳',
    badgeColor: 'bg-indigo-600',
    bannerGradient: 'from-indigo-950 via-purple-900 to-slate-900',
    authority: 'IBPS & State Bank of India',
    description: 'High-speed speed test practice, High-level DI (Data Interpretation), Floor & Box Puzzles for SBI PO Prelims & Mains, IBPS Clerk, and RBI Assistant exams.',
    stats: {
      totalCandidates: '850,000+',
      availablePdfs: '140+ Notes',
      mockTests: '50 Mocks',
      avgSalary: '₹32,000 - ₹68,000/mo'
    },
    upcomingExams: [
      { name: 'SBI PO Prelims & Mains 2026', date: 'Nov 2026', status: 'Notification Expected' },
      { name: 'IBPS Clerk XV Prelims Exam', date: 'Aug 2026', status: 'Online Exam' }
    ],
    subjects: [
      {
        name: 'Reasoning Ability & Puzzles',
        weightage: '35 Marks',
        topics: [
          'Linear & Circular Seating Arrangements',
          'Floor, Box & Month Based Puzzles',
          'Syllogism (Only a few cases), Inequality',
          'Input-Output & Coding-Decoding'
        ]
      },
      {
        name: 'Quantitative Aptitude & DI',
        weightage: '35 Marks',
        topics: [
          'Data Interpretation (Table DI, Bar Graph, Pie Chart, Caselet DI)',
          'Quadratic Equations & Number Series',
          'Simplification & Approximation (Speed Calculation)'
        ]
      }
    ],
    pdfs: [
      { id: 'bank-pdf-1', title: 'Banking Puzzles & Seating Arrangement 500+ Practice PDF', downloads: '31,200', pages: '75 Pages', size: '5.2 MB', category: 'Reasoning' }
    ],
    mockTests: [
      { id: 'bank-mock-1', title: 'SBI PO Prelims Speed Practice Mock Test 01', duration: '60 Mins', questions: 100, marks: 100, passScore: 68, language: 'English & Hindi' }
    ],
    cutoffs: [
      { category: 'UR / General', prelims: '59.50 Marks', mains: '88.5 Marks' },
      { category: 'OBC / EWS', prelims: '54.00 Marks', mains: '81.0 Marks' }
    ]
  }
};

export default function ExamDetailHub({ 
  examKey = 'WBPSC', 
  onBack, 
  onStartQuiz, 
  onDownloadPdf 
}) {
  const [activeExamTab, setActiveExamTab] = useState('overview'); // 'overview' | 'syllabus' | 'notes' | 'mocks' | 'cutoffs'
  const exam = EXAM_DETAILS[examKey] || EXAM_DETAILS.WBPSC;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 selection:bg-blue-600 selection:text-white">
      
      {/* Top Breadcrumb Navigation Header */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-300 hover:text-white font-black text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to AMAR PATHSHALA Portal</span>
          </button>

          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
            <span className="hidden sm:inline">Selected Exam Hub:</span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30 uppercase tracking-wider font-black">
              {exam.shortName}
            </span>
          </div>
        </div>
      </div>

      {/* Main Exam Hero Banner */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${exam.bannerGradient} py-12 border-b border-slate-800`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center space-x-2">
                <span className="text-3xl sm:text-4xl p-2 bg-white/10 rounded-2xl border border-white/10 shadow-lg">
                  {exam.icon}
                </span>
                <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-black rounded-full uppercase tracking-widest border border-amber-400/30">
                  OFFICIAL EXAM PREPARATION HUB
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {exam.title}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-medium">
                {exam.description}
              </p>
            </div>

            {/* Quick Action Box */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-6 rounded-3xl space-y-4 shrink-0 shadow-2xl max-w-md w-full">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>Instant Exam Actions</span>
              </h3>

              <div className="space-y-2 text-xs sm:text-sm font-black">
                <button
                  onClick={() => setActiveExamTab('mocks')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Start Free Mock Test Series</span>
                </button>

                <button
                  onClick={() => setActiveExamTab('notes')}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free PDF Study Notes</span>
                </button>
              </div>
            </div>
          </div>

          {/* Platform Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
              <div className="text-xs text-slate-400 font-bold uppercase">Active Candidates</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{exam.stats.totalCandidates}</div>
            </div>
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
              <div className="text-xs text-slate-400 font-bold uppercase">Available PDFs</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{exam.stats.availablePdfs}</div>
            </div>
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
              <div className="text-xs text-slate-400 font-bold uppercase">Full Mock Series</div>
              <div className="text-xl sm:text-2xl font-black text-blue-400 mt-1">{exam.stats.mockTests}</div>
            </div>
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
              <div className="text-xs text-slate-400 font-bold uppercase">Pay Scale Band</div>
              <div className="text-xs sm:text-sm font-black text-purple-300 mt-2">{exam.stats.avgSalary}</div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Interactive Tab Navigation Strip */}
      <section className="bg-slate-900 border-b border-slate-800 sticky top-14 z-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center space-x-2 overflow-x-auto py-3 scrollbar-none font-extrabold text-xs sm:text-sm">
          <button
            onClick={() => setActiveExamTab('overview')}
            className={`px-5 py-2.5 rounded-xl transition shrink-0 ${
              activeExamTab === 'overview' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            📋 Exam Overview & Schedule
          </button>
          <button
            onClick={() => setActiveExamTab('syllabus')}
            className={`px-5 py-2.5 rounded-xl transition shrink-0 ${
              activeExamTab === 'syllabus' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            📚 Subject Wise Syllabus & Topics
          </button>
          <button
            onClick={() => setActiveExamTab('notes')}
            className={`px-5 py-2.5 rounded-xl transition shrink-0 ${
              activeExamTab === 'notes' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            📄 PDF Notes & Question Papers ({exam.pdfs.length})
          </button>
          <button
            onClick={() => setActiveExamTab('mocks')}
            className={`px-5 py-2.5 rounded-xl transition shrink-0 ${
              activeExamTab === 'mocks' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            🧠 Online Mock Test Engine ({exam.mockTests.length})
          </button>
          <button
            onClick={() => setActiveExamTab('cutoffs')}
            className={`px-5 py-2.5 rounded-xl transition shrink-0 ${
              activeExamTab === 'cutoffs' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Previous Cut-Off Marks
          </button>
        </div>
      </section>

      {/* Main Tab Content View Area */}
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-10 space-y-10">

        {/* TAB 1: OVERVIEW & SCHEDULE */}
        {activeExamTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-4">
                <Calendar className="w-6 h-6 text-blue-400" />
                <span>Upcoming Exam Calendar & Notification Schedule</span>
              </h3>

              <div className="divide-y divide-slate-800">
                {exam.upcomingExams.map((item, idx) => (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
                    <div>
                      <h4 className="font-extrabold text-white text-base">{item.name}</h4>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">Exam Date: <strong className="text-amber-400">{item.date}</strong></p>
                    </div>
                    <span className="px-3.5 py-1 bg-emerald-500/10 text-emerald-400 font-black text-xs rounded-full border border-emerald-500/30 uppercase tracking-wider">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Authority Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider">Conducting Body & Governance</h4>
              <p className="text-lg font-extrabold text-white">{exam.authority}</p>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Official notifications, admit cards, and final selection merit lists are published on the official web portal. Prepare with AMAR PATHSHALA's topper-verified study materials.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: SYLLABUS & TOPICS */}
        {activeExamTab === 'syllabus' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <span>Complete Subject Wise Topic Breakdown</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exam.subjects.map((subj, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="font-extrabold text-lg text-white">{subj.name}</h4>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 font-black text-xs rounded-lg border border-blue-500/20">
                      {subj.weightage}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-300">
                    {subj.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start space-x-2.5 p-2 rounded-xl hover:bg-slate-800/50 transition">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PDF NOTES */}
        {activeExamTab === 'notes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-400" />
                <span>Free Downloadable PDF Notes & Question Banks</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {exam.pdfs.map((pdf) => (
                <div key={pdf.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
                      {pdf.category}
                    </span>
                    <h4 className="font-extrabold text-base text-white line-clamp-2 leading-snug">{pdf.title}</h4>
                    <p className="text-xs text-slate-400 font-bold">
                      ⬇ {pdf.downloads} Downloads • {pdf.pages} • {pdf.size}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (onDownloadPdf) onDownloadPdf(pdf);
                      alert(`Downloading ${pdf.title} PDF notes...`);
                    }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl transition flex items-center justify-center space-x-2 shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Free PDF Note</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MOCK TESTS */}
        {activeExamTab === 'mocks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-emerald-400" />
                <span>Live Interactive Online CBT Mock Tests</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exam.mockTests.map((test) => (
                <div key={test.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider rounded-full border border-emerald-500/30">
                        {test.language}
                      </span>
                      <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {test.duration}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-lg text-white leading-snug">{test.title}</h4>

                    <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl text-center text-xs font-bold text-slate-300 border border-slate-800">
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase">Questions</div>
                        <div className="text-white text-sm mt-0.5">{test.questions} Qs</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase">Total Marks</div>
                        <div className="text-amber-400 text-sm mt-0.5">{test.marks} M</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase">Cut-Off</div>
                        <div className="text-emerald-400 text-sm mt-0.5">{test.passScore} M</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onStartQuiz) onStartQuiz(test);
                    }}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Launch Live CBT Exam Simulator</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CUT OFFS */}
        {activeExamTab === 'cutoffs' && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              <span>Official Category Wise Previous Year Cut-Off Marks</span>
            </h3>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
              <table className="w-full text-left text-xs sm:text-sm font-bold">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Category</th>
                    <th className="p-4">Prelims Cut-Off Score</th>
                    <th className="p-4">Mains / Final Cut-Off</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {exam.cutoffs.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition">
                      <td className="p-4 font-black text-white">{row.category}</td>
                      <td className="p-4 text-emerald-400 font-extrabold">{row.prelims}</td>
                      <td className="p-4 text-amber-400 font-extrabold">{row.mains}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
