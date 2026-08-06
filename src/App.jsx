import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeDashboard from './components/Dashboard/HomeDashboard';
import SarkarStudyMain from './components/SarkarStudy/SarkarStudyMain';
import TestCard from './components/MockTest/TestCard';
import MockTestEngine from './components/MockTest/MockTestEngine';
import TestResult from './components/MockTest/TestResult';
import PDFLibrary from './components/PDFLibrary/PDFLibrary';
import AdminDashboard from './components/Admin/AdminDashboard';
import AuthModal from './components/Auth/AuthModal';
import LoginLandingScreen from './components/Auth/LoginLandingScreen';
import { MOCK_TESTS as INITIAL_MOCK_TESTS, PDF_RESOURCES as INITIAL_PDF_RESOURCES } from './data/mockData';
import { FileText, Search, Filter, ShieldAlert, ShieldCheck, Lock, User, LogIn } from 'lucide-react';

const INITIAL_REGISTERED_USERS = [
  {
    id: 'usr-admin-01',
    name: 'RAKESH PATRA',
    email: 'rakeshpatra@gmail.com',
    password: 'Rakesh123',
    phone: '8927241844',
    role: 'admin',
    avatar: 'RP'
  },
  {
    id: 'usr-student-01',
    name: 'Rahul Sharma',
    email: 'rahul.student@gmail.com',
    password: 'student123',
    role: 'student',
    targetExam: 'SBI PO 2026',
    avatar: 'RS'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'mock-tests' | 'mock-engine' | 'test-result' | 'pdf-library' | 'admin'
  const [selectedExam, setSelectedExam] = useState('SBI PO 2026');

  // Registered accounts state with LocalStorage persistence
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('amar_pathshala_registered_users');
      return saved ? JSON.parse(saved) : INITIAL_REGISTERED_USERS;
    } catch (e) {
      return INITIAL_REGISTERED_USERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('amar_pathshala_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {}
  }, [registeredUsers]);

  // Current Logged-in User State (Default: null - Login Required)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('amar_pathshala_active_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('amar_pathshala_active_session', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('amar_pathshala_active_session');
      }
    } catch (e) {}
  }, [currentUser]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Dynamic Data Lists with LocalStorage persistence
  const [mockTests, setMockTests] = useState(() => {
    try {
      const saved = localStorage.getItem('sarkarstudy_mock_tests');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_TESTS;
    } catch (e) {
      return INITIAL_MOCK_TESTS;
    }
  });

  const [pdfResources, setPdfResources] = useState(() => {
    try {
      const saved = localStorage.getItem('sarkarstudy_pdf_resources');
      return saved ? JSON.parse(saved) : INITIAL_PDF_RESOURCES;
    } catch (e) {
      return INITIAL_PDF_RESOURCES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sarkarstudy_mock_tests', JSON.stringify(mockTests));
    } catch (e) {}
  }, [mockTests]);

  useEffect(() => {
    try {
      localStorage.setItem('sarkarstudy_pdf_resources', JSON.stringify(pdfResources));
    } catch (e) {}
  }, [pdfResources]);

  // Active Exam State
  const [activeTest, setActiveTest] = useState(null);
  const [resultData, setResultData] = useState(null);

  // Search & Filter state for Mock Tests View
  const [mockSearchQuery, setMockSearchQuery] = useState('');
  const [mockCategoryFilter, setMockCategoryFilter] = useState('All');

  // Auth Handlers
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    if (userData.role === 'admin') {
      setActiveTab('admin');
    }
  };

  const handleRegisterNewUser = (newUser) => {
    setRegisteredUsers(prev => [...prev, newUser]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (activeTab === 'admin') {
      setActiveTab('dashboard');
    }
  };

  // Start Test trigger
  const handleStartTest = (test) => {
    setActiveTest(test);
    setActiveTab('mock-engine');
  };

  // Exam Submit trigger
  const handleSubmitTest = (submission) => {
    setResultData(submission);
    setActiveTab('test-result');
  };

  // Exit Engine trigger
  const handleExitTest = () => {
    setActiveTest(null);
    setActiveTab('mock-tests');
  };

  // Retake Test trigger
  const handleRetake = () => {
    if (activeTest) {
      setActiveTab('mock-engine');
    } else {
      setActiveTab('mock-tests');
    }
  };

  // Add new CSV Mock Test from Admin
  const handlePublishNewTest = (newTestObj) => {
    setMockTests(prev => [newTestObj, ...prev]);
  };

  // Add new PDF Resource from Admin
  const handlePublishNewPdf = (newPdfObj) => {
    setPdfResources(prev => [newPdfObj, ...prev]);
  };

  // Delete Mock Test from Admin
  const handleDeleteTest = (testId) => {
    setMockTests(prev => prev.filter(t => t.id !== testId));
  };

  // Delete PDF Resource from Admin or Library
  const handleDeletePdf = (pdfId) => {
    setPdfResources(prev => prev.filter(p => p.id !== pdfId));
  };



  // Filtered Mock Tests
  const filteredMockTests = mockTests.filter(t => {
    const matchesCategory = mockCategoryFilter === 'All' || t.category === mockCategoryFilter || t.examTag.includes(mockCategoryFilter);
    const matchesSearch = t.title.toLowerCase().includes(mockSearchQuery.toLowerCase()) ||
                          t.sections.some(s => s.toLowerCase().includes(mockSearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const isAdminLoggedIn = currentUser?.role === 'admin';

  // MANDATORY LOGIN GUARD: Require login before showing website content
  if (!currentUser) {
    return (
      <LoginLandingScreen
        onLoginSuccess={handleLoginSuccess}
        registeredUsers={registeredUsers}
        onRegisterNewUser={handleRegisterNewUser}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        registeredUsers={registeredUsers}
        onRegisterNewUser={handleRegisterNewUser}
      />

      {/* Show header on non-dashboard & non-exam screens */}
      {activeTab !== 'mock-engine' && activeTab !== 'dashboard' && (
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          selectedExam={selectedExam}
          setSelectedExam={setSelectedExam}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* Tab 1: Exact 1:1 SarkarStudy UI Portal */}
        {activeTab === 'dashboard' && (
          <SarkarStudyMain
            onStartQuiz={handleStartTest}
            onOpenPdfModal={(pdf) => setActiveTab('pdf-library')}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
          />
        )}

        {/* Tab 2: Mock Tests Catalogue Grid */}
        {activeTab === 'mock-tests' && (
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
            
            {/* Banner */}
            <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30 uppercase tracking-wider">
                Amar Pathshala Exam Simulator
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
                All Mock Tests & Question Papers
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Practice full-length test series with live countdown timer, interactive question palette grid, and automatic scorecard.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={mockSearchQuery}
                  onChange={(e) => setMockSearchQuery(e.target.value)}
                  placeholder="Search mock tests by title, subject..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy-800"
                />
              </div>

              <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0">
                {['All', 'Banking', 'SSC', 'UPSC'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMockCategoryFilter(cat)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition ${
                      mockCategoryFilter === cat
                        ? 'bg-navy-800 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMockTests.map((test) => (
                <TestCard key={test.id} test={test} onStartTest={handleStartTest} />
              ))}
            </div>

          </div>
        )}

        {/* Tab 3: Distraction-Free MCQ Mock Test Engine */}
        {activeTab === 'mock-engine' && activeTest && (
          <MockTestEngine 
            test={activeTest} 
            onSubmitTest={handleSubmitTest} 
            onExitTest={handleExitTest} 
          />
        )}

        {/* Tab 4: Test Result & Evaluation Screen */}
        {activeTab === 'test-result' && resultData && (
          <TestResult 
            resultData={resultData} 
            onRetake={handleRetake} 
            onGoHome={() => setActiveTab('dashboard')} 
          />
        )}

        {/* Tab 5: PDF Resource Library */}
        {activeTab === 'pdf-library' && (
          <PDFLibrary pdfResources={pdfResources} onDeletePdf={handleDeletePdf} />
        )}

        {/* Tab 6: Admin Dashboard Layout (Protected with Admin Auth Guard) */}
        {activeTab === 'admin' && (
          isAdminLoggedIn ? (
            <AdminDashboard 
              mockTests={mockTests}
              pdfResources={pdfResources}
              onPublishNewTest={handlePublishNewTest} 
              onPublishNewPdf={handlePublishNewPdf} 
              onDeleteTest={handleDeleteTest}
              onDeletePdf={handleDeletePdf}
            />
          ) : (
            <div className="max-w-xl mx-auto my-16 px-4 py-12 bg-white rounded-3xl border border-slate-200 shadow-xl text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              
              <h2 className="text-xl font-extrabold text-navy-950 mb-2">
                Admin Access Restricted
              </h2>

              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                The Admin Dashboard is strictly reserved for Admin <strong>RAKESH PATRA</strong>. Please log in with administrator credentials and verify mobile OTP sent to 8927241844.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-3 bg-navy-800 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Log In as Admin RAKESH PATRA</span>
                </button>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Back to Student Dashboard
                </button>
              </div>

            </div>
          )
        )}

      </main>

      {/* Footer (on non-exam screens) */}
      {activeTab !== 'mock-engine' && (
        <footer className="bg-navy-950 text-slate-400 py-8 border-t border-navy-900 mt-12 text-xs">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-white text-sm">AMAR PATHSHALA</span>
              <span>— Comprehensive Government Competitive Exam Preparation Suite</span>
            </div>

            <div className="flex items-center space-x-6">
              <button onClick={() => setActiveTab('mock-tests')} className="hover:text-white transition">Mock Engine</button>
              <button onClick={() => setActiveTab('pdf-library')} className="hover:text-white transition">PDF Library</button>
              
              {/* Only show link to Admin Portal if logged in as Admin */}
              {isAdminLoggedIn ? (
                <button onClick={() => setActiveTab('admin')} className="text-amber-400 hover:text-amber-300 font-bold transition">Admin Portal (RAKESH PATRA)</button>
              ) : (
                <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-white transition">Admin Login</button>
              )}
            </div>

          </div>
        </footer>
      )}

    </div>
  );
}
