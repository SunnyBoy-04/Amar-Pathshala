import React, { useState, useEffect } from 'react';
import ExamDetailHub from '../ExamPage/ExamDetailHub';
import TypewriterSearchBar from './TypewriterSearchBar';
import FloatingBotWidget from '../Bot/FloatingBotWidget';
import { 
  Search, 
  Download, 
  BookOpen, 
  HelpCircle, 
  Award, 
  Bell, 
  FileText, 
  Layers, 
  Send, 
  MessageCircle, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  CheckCircle, 
  Eye, 
  Star, 
  Clock, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  GraduationCap, 
  Share2, 
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Play,
  LogOut
} from 'lucide-react';

export default function SarkarStudyMain({ 
  onStartQuiz, 
  onOpenPdfModal, 
  currentUser, 
  onOpenAuthModal,
  onLogout
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pdf' | 'quiz' | 'updates'
  const [searchQuery, setSearchQuery] = useState('');
  // Persistent Dark Mode state saved in LocalStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('amar_pathshala_dark_mode');
      return saved !== null ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('amar_pathshala_dark_mode', JSON.stringify(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  }, [isDarkMode]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPdfModal, setSelectedPdfModal] = useState(null);
  const [selectedQuizModal, setSelectedQuizModal] = useState(null);
  const [infoModal, setInfoModal] = useState(null); // 'contact' | 'faq' | 'privacy' | 'terms' | 'shipping' | 'refund' | 'help' | 'typing' | 'courses'
  const [selectedExamHub, setSelectedExamHub] = useState(null); // 'WBPSC' | 'SSC' | 'RRB' | 'Nursing' | 'Banking'

  // Categories list matching SarkarStudy.com
  const categories = [
    'All', 
    'WBPSC', 
    'SSC', 
    'RRB', 
    'Nursing', 
    'Banking', 
    'Defence', 
    'Geography', 
    'History', 
    'Other'
  ];

  // Category Link Handler - Opens Dedicated Exam Hubs or Filters & Scrolls
  const handleCategoryClick = (cat) => {
    if (cat === 'All') {
      setActiveCategory('All');
      setActiveTab('all');
      setSearchQuery('');
      setSelectedExamHub(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (['WBPSC', 'SSC', 'RRB', 'Nursing', 'Banking'].includes(cat)) {
      setSelectedExamHub(cat);
      setActiveCategory(cat);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveCategory(cat);
    setSelectedExamHub(null);
    setTimeout(() => {
      const el = document.getElementById('study-content-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Latest PDF Study Materials from SarkarStudy.com
  const pdfMaterials = [
    {
      id: 'pdf-01',
      title: 'Higher Secondary New OMR Answer Sheet PDF Download 2026 | WBCHSE | AMAR PATHSHALA',
      description: 'Download the official WBCHSE Higher Secondary New OMR Answer Sheet format for 2026 Examination. Practice with realistic bubble marking and improve your speed.',
      category: 'Other',
      subCategory: 'Custom OMR Sheet',
      downloads: 280,
      rating: 4.9,
      pages: 4,
      fileSize: '1.2 MB',
      createdAt: '2026-07-24',
      badge: 'NEW',
      type: 'pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pdf-02',
      title: 'WBPSC Miscellaneous Preliminary Full Mock Test 01 (100 Marks)',
      description: 'Complete 100 Marks full-length prelims mock test strictly based on WBPSC syllabus with detailed answers and Bengali explanation.',
      category: 'WBPSC',
      subCategory: 'PSC Prelims',
      downloads: 215,
      rating: 4.8,
      pages: 18,
      fileSize: '3.5 MB',
      createdAt: '2026-07-19',
      badge: 'HOT',
      type: 'pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pdf-03',
      title: 'Vitamin Detailed Discussion CHEMICAL NAMES SOURCES AND Deficiency Diseases',
      description: 'একনজরে ভিটামিন PDF: বিভিন্ন ভিটামিনের রাসায়নিক নাম, দ্রাব্যতা, উৎস এবং অভাবজনিত রোগ সম্পর্কিত সম্পূর্ণ নোটস।',
      category: 'RRB',
      subCategory: 'RRB NTPC & Group D',
      downloads: 430,
      rating: 5.0,
      pages: 12,
      fileSize: '2.1 MB',
      createdAt: '2026-05-01',
      badge: 'POPULAR',
      type: 'pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pdf-04',
      title: 'WBPSC Miscellaneous Syllabus 2026 in Bengali',
      description: 'পিএসসি মিসলেনিয়াস পরীক্ষার নিয়োগ পদ্ধতি, পরীক্ষার ধরণ ও সম্পূর্ণ সিলেবাস বাংলা ভাষায় ব্যাখ্যা সহ।',
      category: 'WBPSC',
      subCategory: 'Syllabus',
      downloads: 520,
      rating: 4.7,
      pages: 8,
      fileSize: '1.8 MB',
      createdAt: '2026-04-25',
      badge: 'FREE',
      type: 'pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pdf-05',
      title: 'SSC GD 2026 Bengali Current Affairs PDF',
      description: 'সামনেই SSC GD পরীক্ষা! গুরুত্বপূর্ণ কারেন্ট অ্যাফেয়ার্স গুলি বাংলা ভাষায় সাজানো এই বিশেষ PDF ইবুকটিতে।',
      category: 'SSC',
      subCategory: 'SSC GD',
      downloads: 557,
      rating: 4.9,
      pages: 24,
      fileSize: '4.2 MB',
      createdAt: '2026-04-23',
      badge: 'MUST HAVE',
      type: 'pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pdf-06',
      title: 'WBJEE ANM & GNM Practice Set in Bengali PDF Download 05',
      description: 'ANM & GNM পরীক্ষার প্রস্তুতির জন্য ১১৫ নম্বর সম্পূর্ণ সিলেবাস ভিত্তিক প্র্যাকটিস সেট ৫ উইথ অ্যান্সার কি।',
      category: 'Nursing',
      subCategory: 'ANM & GNM',
      downloads: 530,
      rating: 4.8,
      pages: 15,
      fileSize: '2.9 MB',
      createdAt: '2026-04-22',
      badge: 'LATEST',
      type: 'pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Latest Online Quizzes from SarkarStudy.com
  const quizzesList = [
    {
      id: 'quiz-01',
      title: 'সৌরজগৎ GK Quiz | পরীক্ষায় বারবার আসা ২০টি প্রশ্ন',
      description: 'সৌরজগৎ সম্পর্কিত পরীক্ষায় বারবার আসা ২০টি গুরুত্বপূর্ণ MCQ নিয়ে তৈরি এই মক টেস্ট। WBPSC, WBP, KP, SSC, Railway এর জন্য।',
      category: 'Geography',
      subject: 'Geography',
      questionsCount: 20,
      duration: 10, // mins
      attemptsCount: 1420,
      badge: 'LIVE QUIZ',
      type: 'quiz',
      thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'quiz-02',
      title: 'ইতিহাসের বিভিন্ন বংশের প্রতিষ্ঠাতা, শেষ সম্রাট ও শ্রেষ্ঠ সম্রাট | ২০টি MCQ',
      description: 'ভারতের ইতিহাসের বিভিন্ন গুরুত্বপূর্ণ বংশের প্রতিষ্ঠাতা, শেষ সম্রাট ও শ্রেষ্ঠ সম্রাট নিয়ে তৈরি ২০টি অতি গুরুত্বপূর্ণ MCQ।',
      category: 'History',
      subject: 'History',
      questionsCount: 20,
      duration: 10,
      attemptsCount: 980,
      badge: 'POPULAR',
      type: 'quiz',
      thumbnailUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'quiz-03',
      title: 'পশ্চিমবঙ্গের নদ-নদী | গুরুত্বপূর্ণ Quiz (15 MCQ) | WBP | KP | WBPSC',
      description: 'পশ্চিমবঙ্গের নদ-নদী বিষয়ের উপর ভিত্তি করে প্রস্তুত ১৫টি গুরুত্বপূর্ণ প্রশ্ন। প্রধান নদী, উপনদী, বাঁধ ও উৎপত্তিস্থল সহ।',
      category: 'Geography',
      subject: 'West Bengal Geography',
      questionsCount: 15,
      duration: 8,
      attemptsCount: 2150,
      badge: 'FEATURED',
      type: 'quiz',
      thumbnailUrl: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'quiz-04',
      title: 'গুরুত্বপূর্ণ আন্তর্জাতিক সংস্থার সদর দপ্তর | ২০টি MCQ',
      description: 'জাতিসংঘ, বিশ্বব্যাংক, আইএমএফ, ইউনেস্কো সহ বিশ্বের প্রধান আন্তর্জাতিক সংস্থা ও তাদের সদর দপ্তর ভিত্তিক কুইজ।',
      category: 'Other',
      subject: 'General Knowledge',
      questionsCount: 20,
      duration: 10,
      attemptsCount: 1730,
      badge: 'TRENDING',
      type: 'quiz',
      thumbnailUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'quiz-05',
      title: 'ভারতের জাতীয় উদ্যান | গুরুত্বপূর্ণ ২৫টি MCQ | Competitive Exam 2026',
      description: 'ভারতের বিভিন্ন রাজ্যের বিখ্যাত ন্যাশনাল পার্ক ও অভয়ারণ্য নিয়ে ২৫টি গুরুত্বপূর্ণ MCQ মক টেস্ট।',
      category: 'Geography',
      subject: 'Environment & GK',
      questionsCount: 25,
      duration: 13,
      attemptsCount: 1140,
      badge: 'NEW',
      type: 'quiz',
      thumbnailUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'quiz-06',
      title: 'ভিটামিন | গুরুত্বপূর্ণ ২৫টি MCQ | Moderate Level Quiz Set–01',
      description: 'জীববিজ্ঞান ও ভিটামিন অধ্যায়ের গুরুত্বপূর্ণ প্রশ্নাবলী। WBP, KP, WBPSC, SSC, ANM-GNM পরীক্ষার জন্য সেরা সেট।',
      category: 'RRB',
      subject: 'Biology Science',
      questionsCount: 25,
      duration: 13,
      attemptsCount: 3100,
      badge: 'HIGH SCORE',
      type: 'quiz',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // SarkarStudy 4-Column Government Exam Table
  const latestJobs = [
    { title: "WBPSC Miscellaneous 2024 Prelims Date Out", tag: "Exam Date", date: "Aug 2026", link: "#" },
    { title: "SSC GD Constable 2026 Official Answer Key", tag: "Answer Key", date: "Aug 2026", link: "#" },
    { title: "RRB NTPC 11,558 Posts Recruitment Form", tag: "New Notice", date: "Jul 2026", link: "#" },
    { title: "WBJEE ANM & GNM Admit Card Download", tag: "Admit Card", date: "Jul 2026", link: "#" },
    { title: "SBI PO 2026 Online Application Form", tag: "Apply Now", date: "Aug 2026", link: "#" }
  ];

  const admitCards = [
    { title: "WBPSC Food SI Admit Card 2026", tag: "Download", date: "Aug 2026", link: "#" },
    { title: "WBP Lady Constable Physical Date", tag: "Notice", date: "Aug 2026", link: "#" },
    { title: "SSC CGL Tier 1 Exam City Slip 2026", tag: "Check", date: "Jul 2026", link: "#" },
    { title: "IBPS Clerk Prelims Call Letter Release", tag: "Active", date: "Jul 2026", link: "#" }
  ];

  const examUpdates = [
    { title: "🔰 WBPSC MISCELLANEOUS 2024 NOTIFICATION OUT", tag: "Notification", date: "Aug 2026" },
    { title: "🔰 WBSSC Group C & D Exam Admit Card Released", tag: "Admit Card", date: "Aug 2026" },
    { title: "🔰 WBP Police Constable 12,000 Posts Exam Pattern", tag: "Syllabus", date: "Jul 2026" }
  ];

  // Combined Items
  const allItems = [...pdfMaterials, ...quizzesList];

  // Filtered Logic
  const filteredItems = allItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = searchQuery.trim() === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTab && matchesSearch;
  });

  // Render Dedicated Exam Hub Page when selected
  if (selectedExamHub) {
    return (
      <ExamDetailHub
        examKey={selectedExamHub}
        onBack={() => setSelectedExamHub(null)}
        onStartQuiz={onStartQuiz}
        onDownloadPdf={onOpenPdfModal}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-200`}>
      
      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white text-xs font-medium py-2 px-4 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2 overflow-hidden w-full sm:w-auto">
            <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Zap className="w-3 h-3 fill-slate-900" /> Flash Updates
            </span>
            <div className="truncate text-slate-100 font-semibold text-[11px] sm:text-xs">
              🔥 WBPSC Miscellaneous 2024 Notification Released | Higher Secondary WBCHSE New OMR Sheet PDF Available Free!
            </div>
          </div>

          <div className="flex items-center space-x-4 shrink-0 text-[11px]">
            <a 
              href="https://chat.whatsapp.com/EFQs2nncJnnCmna3IjcetU?s=cl&p=a&ilr=1" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-amber-300 font-bold transition"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>WhatsApp Channel (25K+)</span>
            </a>
            <span className="text-blue-300">|</span>
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-amber-300 font-bold transition"
            >
              <Send className="w-3.5 h-3.5 text-blue-300" />
              <span>Telegram Channel</span>
            </a>
            <span className="text-blue-300">|</span>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition flex items-center gap-1 text-slate-200"
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-200" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER & BRAND LOGO */}
      <header className={`sticky top-0 z-40 border-b ${isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-md shadow-sm`}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => { setActiveCategory('All'); setActiveTab('all'); setSearchQuery(''); }}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg border border-blue-400/30 transform hover:scale-105 transition">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                    AMAR PATHSHALA
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/20">
                    ESTD 2020
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-slate-500 tracking-wide uppercase">
                  Competitive Exam Preparation Platform
                </p>
              </div>
            </div>

            {/* Global Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
              <TypewriterSearchBar
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                onSearchSubmit={(val) => setSearchQuery(val)}
                isDarkMode={isDarkMode}
                size="medium"
              />
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3 shrink-0">
              <button 
                onClick={() => setActiveTab('pdf')}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>Free PDFs</span>
              </button>

              <button 
                onClick={() => setActiveTab('quiz')}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 transition flex items-center space-x-1.5"
              >
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Daily Quizzes</span>
              </button>

              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>{currentUser.name}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="px-3 py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition font-bold text-xs flex items-center gap-1.5 border border-slate-200 dark:border-slate-800"
                    title="Log Out of AMAR PATHSHALA"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span className="hidden sm:inline text-red-600 dark:text-red-400">Log Out</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onOpenAuthModal}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow transition"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* CATEGORY NAV STRIP */}
        <div className={`border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex items-center space-x-1.5 overflow-x-auto py-2.5 scrollbar-none text-sm sm:text-base font-bold">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition cursor-pointer select-none ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : isDarkMode 
                        ? 'text-slate-300 hover:bg-slate-800' 
                        : 'text-slate-700 hover:bg-white hover:text-blue-600'
                  }`}
                >
                  {cat === 'All' ? '🏠 Home' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search study materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-lg border border-slate-300 text-sm bg-slate-50"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button 
                onClick={() => { setActiveTab('pdf'); setMobileMenuOpen(false); }}
                className="py-3 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Free PDFs
              </button>
              <button 
                onClick={() => { setActiveTab('quiz'); setMobileMenuOpen(false); }}
                className="py-3 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" /> Live Quizzes
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO BANNER & STATS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-blue-950">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3.5 py-1.5 bg-amber-400/20 text-amber-300 text-xs sm:text-sm font-black rounded-full border border-amber-400/30 uppercase tracking-widest inline-flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" /> Trusted Exam Partner Since 2020
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Complete Exam Notes, Free PDFs & Mock Tests for Competitive Exams
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Access curated study materials, WBPSC prelims mock sets, WBCHSE OMR answer sheets, SSC GD Bengali notes, and daily online quizzes for SSC, Banking, Railway, Nursing & Defence exams.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 max-w-xl">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-xl sm:text-3xl font-black text-amber-300">50,000+</div>
                  <div className="text-xs text-slate-300 font-bold uppercase mt-1">Active Students</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-xl sm:text-3xl font-black text-emerald-400">1,000+</div>
                  <div className="text-xs text-slate-300 font-bold uppercase mt-1">Free PDF Downloads</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-xl sm:text-3xl font-black text-blue-300">500+</div>
                  <div className="text-xs text-slate-300 font-bold uppercase mt-1">Practice Quizzes</div>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/15 shadow-2xl space-y-4 animate-float hover:pause transition-all">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>Quick Category Shortcuts</span>
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-bold">
                <button onClick={() => handleCategoryClick('WBPSC')} className="p-3 bg-white/10 hover:bg-blue-600 rounded-xl transition text-left border border-white/10 flex items-center justify-between">
                  <span>🏛 WBPSC Exams</span>
                  <ChevronRight className="w-4 h-4 text-amber-300" />
                </button>
                <button onClick={() => handleCategoryClick('SSC')} className="p-3 bg-white/10 hover:bg-blue-600 rounded-xl transition text-left border border-white/10 flex items-center justify-between">
                  <span>🎯 SSC CGL & GD</span>
                  <ChevronRight className="w-4 h-4 text-amber-300" />
                </button>
                <button onClick={() => handleCategoryClick('RRB')} className="p-3 bg-white/10 hover:bg-blue-600 rounded-xl transition text-left border border-white/10 flex items-center justify-between">
                  <span>🚆 Railway RRB</span>
                  <ChevronRight className="w-4 h-4 text-amber-300" />
                </button>
                <button onClick={() => handleCategoryClick('Nursing')} className="p-3 bg-white/10 hover:bg-blue-600 rounded-xl transition text-left border border-white/10 flex items-center justify-between">
                  <span>🩺 ANM & GNM</span>
                  <ChevronRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>

              <div className="pt-2 border-t border-white/10">
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Join Official WhatsApp Group</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MAIN CONTENT AREA (GRID + SIDEBAR) */}
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-8 space-y-8">
        
        {/* SARKAR STUDY 4-COLUMN RECRUITMENT TABLES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              <span>Official Exam Notifications & Live Notices 2026</span>
            </h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              Updated Live Today
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Box 1: Latest Jobs */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 font-black text-sm uppercase tracking-wider flex items-center justify-between">
                  <span>Latest Jobs 2026</span>
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded font-bold">LIVE</span>
                </div>
                <ul className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-bold">
                  {latestJobs.map((item, i) => (
                    <li key={i} className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer">
                      <a href={item.link} className="text-slate-800 dark:text-slate-200 hover:text-blue-600 block line-clamp-2 leading-snug">
                        {item.title}
                      </a>
                      <div className="flex items-center justify-between mt-1.5 text-xs font-semibold">
                        <span className="text-red-600 font-extrabold bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded">{item.tag}</span>
                        <span className="text-slate-400 font-medium">{item.date}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Box 2: Admit Cards */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 font-black text-sm uppercase tracking-wider flex items-center justify-between">
                  <span>Admit Cards</span>
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded font-bold">NEW</span>
                </div>
                <ul className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-bold">
                  {admitCards.map((item, i) => (
                    <li key={i} className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer">
                      <a href={item.link} className="text-slate-800 dark:text-slate-200 hover:text-blue-600 block line-clamp-2 leading-snug">
                        {item.title}
                      </a>
                      <div className="flex items-center justify-between mt-1.5 text-xs font-semibold">
                        <span className="text-blue-600 font-extrabold bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">{item.tag}</span>
                        <span className="text-slate-400 font-medium">{item.date}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Box 3: Results & Keys */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 font-black text-sm uppercase tracking-wider flex items-center justify-between">
                  <span>Results & Keys</span>
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded font-bold">HOT</span>
                </div>
                <ul className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-bold">
                  {latestJobs.slice(2).map((item, i) => (
                    <li key={i} className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer">
                      <a href={item.link} className="text-slate-800 dark:text-slate-200 hover:text-blue-600 block line-clamp-2 leading-snug">
                        {item.title}
                      </a>
                      <div className="flex items-center justify-between mt-1.5 text-xs font-semibold">
                        <span className="text-emerald-600 font-extrabold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">Result Out</span>
                        <span className="text-slate-400 font-medium">{item.date}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Box 4: Official Updates */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 font-black text-sm uppercase tracking-wider flex items-center justify-between">
                  <span>Amar Bulletins</span>
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded font-bold">OFFICIAL</span>
                </div>
                <ul className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-bold">
                  {examUpdates.map((item, i) => (
                    <li key={i} className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer">
                      <span className="text-slate-800 dark:text-slate-200 font-bold block line-clamp-2 leading-snug">
                        {item.title}
                      </span>
                      <div className="flex items-center justify-between mt-1.5 text-xs font-semibold">
                        <span className="text-amber-600 font-extrabold bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">{item.tag}</span>
                        <span className="text-slate-400 font-medium">{item.date}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* MAIN SECTION GRID WITH SIDEBAR */}
        <div id="study-content-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-24">
          
          {/* LEFT 9 COLUMNS: STUDY MATERIALS & QUIZZES */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Filter Tabs Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <span>Latest Study Notes & Interactive Mocks</span>
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Filter by material type or exam category
                </p>
              </div>

              {/* Tab Pills */}
              <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl text-sm font-bold">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'all' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  All ({allItems.length})
                </button>
                <button
                  onClick={() => setActiveTab('pdf')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'pdf' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  PDFs ({pdfMaterials.length})
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'quiz' ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Quizzes ({quizzesList.length})
                </button>
              </div>
            </div>

            {/* Content Cards Grid */}
            {filteredItems.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-extrabold text-slate-700 dark:text-slate-300">No study materials found</h3>
                <p className="text-sm text-slate-500">Try adjusting your search terms or selecting 'All' category.</p>
                <button 
                  onClick={() => { setActiveCategory('All'); setActiveTab('all'); setSearchQuery(''); }}
                  className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Card Thumbnail & Badge Header */}
                    <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                        <span className={`text-xs font-black uppercase px-3 py-1 rounded-full shadow-md text-white ${
                          item.type === 'pdf' ? 'bg-blue-600' : 'bg-emerald-600'
                        }`}>
                          {item.type === 'pdf' ? '📄 PDF NOTE' : '🧠 ONLINE QUIZ'}
                        </span>
                        <span className="bg-slate-900/85 backdrop-blur-md text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </div>

                      {item.badge && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-md shadow uppercase tracking-wider">
                          {item.badge}
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition leading-snug line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                          {item.description}
                        </p>
                      </div>

                      {/* Meta Information */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-bold">
                        {item.type === 'pdf' ? (
                          <>
                            <span className="flex items-center gap-1.5">
                              <Download className="w-4 h-4 text-blue-500" />
                              {item.downloads} Downloads
                            </span>
                            <span className="flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-slate-400" />
                              {item.pages} Pages ({item.fileSize})
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex items-center gap-1.5">
                              <HelpCircle className="w-4 h-4 text-emerald-500" />
                              {item.questionsCount} Questions
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-slate-400" />
                              {item.duration} Mins
                            </span>
                          </>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        {item.type === 'pdf' ? (
                          <button
                            onClick={() => setSelectedPdfModal(item)}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download Free PDF</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedQuizModal(item)}
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2"
                          >
                            <Play className="w-4 h-4 fill-white" />
                            <span>Start Live Quiz</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

          {/* RIGHT 3 COLUMNS: SIDEBAR WIDGETS */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Widget 1: Telegram & WhatsApp Joining */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-blue-800 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-black rounded-full border border-blue-400/30 uppercase tracking-wider">
                  Official Channels
                </span>
              </div>

              <h3 className="text-lg font-black text-white leading-snug">
                Get Instant Job Alerts & Free PDFs on Mobile
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Join 250,000+ serious aspirants receiving daily current affairs, exam dates, admit card links, and PDF notes directly on Telegram & WhatsApp.
              </p>

              <div className="space-y-3 pt-1">
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Join WhatsApp Channel (25K+)</span>
                </a>

                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Join Telegram Channel</span>
                </a>
              </div>
            </div>

            {/* Widget 2: Popular Exam Categories */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Layers className="w-6 h-6 text-blue-600" />
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Exam Categories
                </h3>
              </div>

              <ul className="space-y-2 text-sm font-bold">
                {[
                  { name: "WBPSC Exams (Misc, Food SI)", count: "120 Sets", cat: "WBPSC" },
                  { name: "SSC Exams (CGL, CHSL, GD)", count: "185 Sets", cat: "SSC" },
                  { name: "Railway Exams (RRB NTPC)", count: "95 Sets", cat: "RRB" },
                  { name: "Nursing Exams (ANM & GNM)", count: "70 Sets", cat: "Nursing" },
                  { name: "Banking (SBI PO, IBPS Clerk)", count: "65 Sets", cat: "Banking" },
                  { name: "Defence (NDA, CDS, AFCAT)", count: "40 Sets", cat: "Defence" }
                ].map((c, i) => (
                  <li 
                    key={i} 
                    onClick={() => setActiveCategory(c.cat)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition cursor-pointer group"
                  >
                    <span className="group-hover:text-blue-600 transition font-bold">{c.name}</span>
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-extrabold rounded-md">
                      {c.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 3: Trending PDFs */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Top Trending Notes
                </h3>
              </div>

              <div className="space-y-3">
                {pdfMaterials.slice(0, 4).map((pdf) => (
                  <div 
                    key={pdf.id}
                    onClick={() => setSelectedPdfModal(pdf)}
                    className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-black text-sm shrink-0">
                      PDF
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition line-clamp-2 leading-snug">
                        {pdf.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 font-semibold">
                        ⬇ {pdf.downloads} Downloads • {pdf.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* 5. NAVIGATION & SUPPORT FOOTER SECTION (EXACT AS SPECIFIED) */}
      <footer className="bg-[#060a13] text-slate-300 border-t border-slate-800/80 mt-16 font-sans">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Column 1: EXPLORE */}
            <div className="space-y-4 text-left">
              <h4 className="text-xs sm:text-sm font-black text-blue-400 uppercase tracking-widest border-b border-slate-800/80 pb-2">
                EXPLORE
              </h4>
              <ul className="space-y-3 text-sm sm:text-base font-bold">
                <li>
                  <button 
                    onClick={() => { setActiveCategory('All'); setActiveTab('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-blue-400 transition text-white font-extrabold"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('pdf')} className="hover:text-blue-400 transition text-slate-300">
                    PDFs
                  </button>
                </li>
                <li>
                  <button onClick={() => setInfoModal('courses')} className="hover:text-blue-400 transition text-slate-300">
                    Courses
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('quiz')} className="hover:text-blue-400 transition text-slate-300">
                    Quizzes
                  </button>
                </li>
                <li>
                  <button onClick={() => setInfoModal('typing')} className="hover:text-blue-400 transition text-slate-300">
                    Typing Test
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('exam-notices');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="hover:text-blue-400 transition text-slate-300"
                  >
                    Exam Updates
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: EXAMS */}
            <div className="space-y-4 text-left">
              <h4 className="text-xs sm:text-sm font-black text-blue-400 uppercase tracking-widest border-b border-slate-800/80 pb-2">
                EXAMS
              </h4>
              <ul className="space-y-3 text-sm sm:text-base font-bold">
                <li>
                  <button onClick={() => setSelectedExamHub('SSC')} className="flex items-center space-x-2.5 hover:text-blue-400 transition text-slate-300">
                    <span className="text-blue-400">🎯</span>
                    <span>SSC</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedExamHub('WBPSC')} className="flex items-center space-x-2.5 hover:text-blue-400 transition text-slate-300">
                    <span className="text-blue-400">🏛</span>
                    <span>WBSSC</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedExamHub('WBPSC')} className="flex items-center space-x-2.5 hover:text-blue-400 transition text-slate-300">
                    <span className="text-blue-400">🛡</span>
                    <span>WBPSC</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedExamHub('Banking')} className="flex items-center space-x-2.5 hover:text-blue-400 transition text-slate-300">
                    <span className="text-blue-400">💳</span>
                    <span>Bank Exams</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedExamHub('Nursing')} className="flex items-center space-x-2.5 hover:text-blue-400 transition text-slate-300">
                    <span className="text-blue-400">🩺</span>
                    <span>ANM & GNM</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedExamHub('RRB')} className="flex items-center space-x-2.5 hover:text-blue-400 transition text-slate-300">
                    <span className="text-blue-400">🚆</span>
                    <span>Railway</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedExamHub('WBPSC')} className="flex items-center space-x-2.5 hover:text-blue-400 transition text-slate-300">
                    <span className="text-blue-400">📋</span>
                    <span>State PSC</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: SUBJECTS */}
            <div className="space-y-4 text-left">
              <h4 className="text-xs sm:text-sm font-black text-blue-400 uppercase tracking-widest border-b border-slate-800/80 pb-2">
                SUBJECTS
              </h4>
              <ul className="space-y-3 text-sm sm:text-base font-bold">
                <li>
                  <button onClick={() => setSearchQuery('Math')} className="hover:text-blue-400 transition text-slate-300">
                    Mathematics
                  </button>
                </li>
                <li>
                  <button onClick={() => setSearchQuery('English')} className="hover:text-blue-400 transition text-slate-300">
                    English
                  </button>
                </li>
                <li>
                  <button onClick={() => setSearchQuery('GK')} className="hover:text-blue-400 transition text-slate-300">
                    General Knowledge
                  </button>
                </li>
                <li>
                  <button onClick={() => setSearchQuery('Reasoning')} className="hover:text-blue-400 transition text-slate-300">
                    Reasoning
                  </button>
                </li>
                <li>
                  <button onClick={() => setSearchQuery('Current Affairs')} className="hover:text-blue-400 transition text-slate-300">
                    Current Affairs
                  </button>
                </li>
                <li>
                  <button onClick={() => setSearchQuery('Science')} className="hover:text-blue-400 transition text-slate-300">
                    Science
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: SUPPORT */}
            <div className="space-y-4 text-left">
              <h4 className="text-xs sm:text-sm font-black text-blue-400 uppercase tracking-widest border-b border-slate-800/80 pb-2">
                SUPPORT
              </h4>
              <ul className="space-y-3 text-sm sm:text-base font-bold">
                <li>
                  <button onClick={() => setInfoModal('help')} className="hover:text-blue-400 transition text-slate-300">
                    Help Center
                  </button>
                </li>
                <li>
                  <button onClick={() => setInfoModal('contact')} className="hover:text-blue-400 transition text-slate-300">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button onClick={() => setInfoModal('faq')} className="hover:text-blue-400 transition text-slate-300">
                    FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => setInfoModal('privacy')} className="hover:text-blue-400 transition text-slate-300">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setInfoModal('terms')} className="hover:text-blue-400 transition text-slate-300">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => setInfoModal('shipping')} className="hover:text-blue-400 transition text-slate-300">
                    Shipping Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setInfoModal('refund')} className="hover:text-blue-400 transition text-slate-300">
                    Refund Policy
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Copyright & Admin Info */}
        <div className="bg-[#03050a] border-t border-slate-800/60 py-6 text-slate-400">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
            <p>© 2026 AMAR PATHSHALA. All Rights Reserved. Empowering Competitive Exam Aspirants.</p>
            <div className="flex items-center space-x-4">
              <button 
                onClick={onOpenAuthModal} 
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Access (RAKESH PATRA)</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 6. INTERACTIVE PDF DOWNLOAD MODAL */}
      {selectedPdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black">
                  PDF
                </div>
                <div>
                  <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase">
                    {selectedPdfModal.category}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                    {selectedPdfModal.title}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPdfModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p>{selectedPdfModal.description}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-bold text-slate-500 border-t border-slate-200 dark:border-slate-700">
                <div>Pages: {selectedPdfModal.pages}</div>
                <div>File Size: {selectedPdfModal.fileSize}</div>
                <div>Downloads: {selectedPdfModal.downloads}</div>
                <div>Rating: ⭐ {selectedPdfModal.rating} / 5.0</div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={selectedPdfModal.thumbnailUrl}
                download={`${selectedPdfModal.slug || 'sarkarstudy_notes'}.pdf`}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  alert(`Downloading ${selectedPdfModal.title}...`);
                  setSelectedPdfModal(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Click to Download Official PDF</span>
              </a>

              <button
                onClick={() => setSelectedPdfModal(null)}
                className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. INTERACTIVE QUIZ MODAL */}
      {selectedQuizModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black">
                  QUIZ
                </div>
                <div>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">
                    {selectedQuizModal.category} • {selectedQuizModal.subject}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                    {selectedQuizModal.title}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedQuizModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-4 space-y-2 text-xs text-slate-700 dark:text-slate-300 border border-emerald-200 dark:border-emerald-800">
              <p>{selectedQuizModal.description}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 border-t border-emerald-200 dark:border-emerald-800">
                <div>Total Questions: {selectedQuizModal.questionsCount}</div>
                <div>Time Allowed: {selectedQuizModal.duration} Minutes</div>
                <div>Total Attempts: {selectedQuizModal.attemptsCount} Aspirants</div>
                <div>Passing Score: 70%</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  const quizToStart = selectedQuizModal;
                  setSelectedQuizModal(null);
                  if (onStartQuiz) {
                    onStartQuiz(quizToStart);
                  } else {
                    alert(`Starting ${quizToStart.title}! Redirecting to Quiz Engine...`);
                  }
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Practice Quiz Now</span>
              </button>

              <button
                onClick={() => setSelectedQuizModal(null)}
                className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE INFORMATION MODAL FOR FOOTER LINKS */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 text-slate-200 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setInfoModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content Switcher */}
            {infoModal === 'contact' && (
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                    ✉️
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Contact AMAR PATHSHALA Support</h3>
                    <p className="text-xs text-slate-400 font-medium">We're here to help competitive exam aspirants 24/7</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold pt-2">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 uppercase text-[10px]">Chief Administrator</span>
                    <p className="text-white text-sm mt-0.5">RAKESH PATRA</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 uppercase text-[10px]">Support Mobile & WhatsApp</span>
                    <p className="text-emerald-400 text-sm mt-0.5">+91 8927241844</p>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your message has been sent to AMAR PATHSHALA support team.'); setInfoModal(null); }} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Your Name</label>
                    <input type="text" required placeholder="e.g. Rahul Sharma" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                    <input type="email" required placeholder="e.g. rahul@gmail.com" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Your Message / Exam Inquiry</label>
                    <textarea rows={3} required placeholder="Ask about WBPSC, SSC notes, mock test scores, or PDF downloads..." className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-lg transition">
                    Send Inquiry Message
                  </button>
                </form>
              </div>
            )}

            {infoModal === 'faq' && (
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                    ❓
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Frequently Asked Questions (FAQ)</h3>
                    <p className="text-xs text-slate-400 font-medium">Everything you need to know about AMAR PATHSHALA</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <h4 className="font-extrabold text-blue-400">Q: Are all PDF study materials completely free on AMAR PATHSHALA?</h4>
                    <p className="text-slate-300 leading-relaxed font-medium">Yes! All PDF notes, official syllabus copies, OMR practice sheets, and daily mock tests are 100% free for all competitive exam aspirants.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <h4 className="font-extrabold text-blue-400">Q: Which competitive exams are covered on this portal?</h4>
                    <p className="text-slate-300 leading-relaxed font-medium">We cover WBPSC (Miscellaneous, Food SI, WBCS, Clerkship), WBCHSE Higher Secondary, SSC (CGL, CHSL, GD, MTS), Railway RRB NTPC, Nursing (ANM & GNM), and WBP Police Constable recruitment.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <h4 className="font-extrabold text-blue-400">Q: How does the live mock test simulator work?</h4>
                    <p className="text-slate-300 leading-relaxed font-medium">Our mock test engine features real-time countdown timers, interactive question palette, instant answer key verification, and score analytics upon submission.</p>
                  </div>
                </div>
              </div>
            )}

            {infoModal === 'privacy' && (
              <div className="space-y-4 text-left text-xs">
                <h3 className="text-xl font-black text-white">Privacy Policy</h3>
                <p className="text-slate-300 leading-relaxed">AMAR PATHSHALA ("we", "our") is committed to protecting your privacy. We store user account data (Name, Email, Exam targets) securely using encryption and local storage persistence. We do not sell or share student data with third-party advertisers.</p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Data Security Standards</h4>
                  <p className="text-slate-400 font-medium">All PDF downloads and mock test logs are protected under strict encryption standards supervised by Chief Administrator RAKESH PATRA.</p>
                </div>
              </div>
            )}

            {infoModal === 'terms' && (
              <div className="space-y-4 text-left text-xs">
                <h3 className="text-xl font-black text-white">Terms of Service</h3>
                <p className="text-slate-300 leading-relaxed">By accessing AMAR PATHSHALA, you agree to use our study materials, PDF notes, and mock tests strictly for non-commercial personal educational preparation.</p>
                <ul className="list-disc pl-5 text-slate-400 space-y-1 font-medium">
                  <li>Users must not redistribute PDF materials for commercial sale.</li>
                  <li>Mock test questions are updated based on official exam notifications.</li>
                  <li>Account misuse or spam will result in instant account revocation.</li>
                </ul>
              </div>
            )}

            {infoModal === 'shipping' && (
              <div className="space-y-4 text-left text-xs">
                <h3 className="text-xl font-black text-white">Digital Delivery & Shipping Policy</h3>
                <p className="text-slate-300 leading-relaxed">All study materials, practice sets, OMR sheets, and mock test scorecards on AMAR PATHSHALA are delivered digitally in instant downloadable PDF format or online interactive test engines.</p>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 font-bold">
                  ⚡ Delivery Time: Instant (0 seconds) right after clicking "Download Free PDF".
                </div>
              </div>
            )}

            {infoModal === 'refund' && (
              <div className="space-y-4 text-left text-xs">
                <h3 className="text-xl font-black text-white">Refund & Cancellation Policy</h3>
                <p className="text-slate-300 leading-relaxed">Since AMAR PATHSHALA provides free digital educational content, mock tests, and PDF downloads, no monetary subscription fees are charged to students.</p>
                <p className="text-slate-400 font-medium">If paid premium crash courses are introduced in the future, a full 7-day refund guarantee will apply for any dissatisfied student.</p>
              </div>
            )}

            {infoModal === 'help' && (
              <div className="space-y-4 text-left text-xs">
                <h3 className="text-xl font-black text-white">Student Help Center</h3>
                <p className="text-slate-300 leading-relaxed">Need help navigating the portal, downloading PDF answer keys, or starting mock tests? Connect with our dedicated student support desk.</p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a href="https://chat.whatsapp.com/EFQs2nncJnnCmna3IjcetU?s=cl&p=a&ilr=1" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-emerald-600 text-white font-bold text-center rounded-xl">
                    💬 WhatsApp Student Group
                  </a>
                  <button onClick={() => setInfoModal('contact')} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl">
                    ✉️ Email Support
                  </button>
                </div>
              </div>
            )}

            {infoModal === 'typing' && (
              <div className="space-y-4 text-left text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white">⌨️ Interactive Typing Test Practice</h3>
                  <span className="px-2.5 py-1 bg-blue-600/20 text-blue-400 rounded-md font-bold text-[10px]">LIVE SPEED ENGINE</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium">Practice your typing speed for WBPSC Clerkship & SSC CGL typing tests in Bengali & English.</p>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="text-xs font-semibold text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 select-none">
                    "West Bengal Public Service Commission conducts Clerkship typing exam for qualified candidates. Practice speed and accuracy daily."
                  </div>
                  <textarea rows={3} placeholder="Type the text above to test your WPM..." className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500" />
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Speed: <strong className="text-emerald-400">42 WPM</strong></span>
                    <span>Accuracy: <strong className="text-blue-400">98%</strong></span>
                    <span>Time Left: <strong className="text-amber-400">01:00</strong></span>
                  </div>
                </div>
              </div>
            )}

            {infoModal === 'courses' && (
              <div className="space-y-4 text-left text-xs">
                <h3 className="text-xl font-black text-white">🎓 Premium Live Courses</h3>
                <p className="text-slate-300 leading-relaxed font-medium">Explore structured exam batches for upcoming West Bengal & Central Government recruitments.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] font-black text-amber-400 uppercase">LIVE BATCH</span>
                    <h4 className="font-bold text-white">WBPSC Miscellaneous Target 2026</h4>
                    <p className="text-slate-400 text-[11px]">Full GS + Arithmetic + Bengali Mock Series</p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] font-black text-emerald-400 uppercase">RECORDED + LIVE</span>
                    <h4 className="font-bold text-white">SSC GD & CGL Bengali Foundation</h4>
                    <p className="text-slate-400 text-[11px]">Complete Subject-wise Video Lectures & PDFs</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setInfoModal(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl transition"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* FLOATING BOT & COMMUNITY WIDGET AT BOTTOM RIGHT CORNER */}
      <FloatingBotWidget onOpenAuthModal={onOpenAuthModal} />

    </div>
  );
}
