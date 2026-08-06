import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Grid, 
  X, 
  Maximize2, 
  Minimize2, 
  FileText,
  HelpCircle,
  Award
} from 'lucide-react';

export default function MockTestEngine({ test, onSubmitTest, onExitTest }) {
  // State initialization
  const questions = test.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Answers state: { [qId]: selectedOptionIndex }
  const [answers, setAnswers] = useState({});

  // Marked for Review state: { [qId]: boolean }
  const [markedForReview, setMarkedForReview] = useState({});

  // Visited questions tracking: { [qId]: boolean }
  const [visited, setVisited] = useState({ [questions[0]?.id]: true });

  // Active section tab
  const sections = Array.from(new Set(questions.map(q => q.section)));
  const [activeSection, setActiveSection] = useState(sections[0] || '');

  // Persistent Timer
  const totalSeconds = (test.durationMinutes || 60) * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isPaletteOpenMobile, setIsPaletteOpenMobile] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Current Question
  const currentQ = questions[currentIndex] || questions[0];

  // Timer Countdown Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Sync visited state whenever currentIndex changes
  useEffect(() => {
    if (currentQ) {
      setVisited(prev => ({ ...prev, [currentQ.id]: true }));
      if (currentQ.section && currentQ.section !== activeSection) {
        setActiveSection(currentQ.section);
      }
    }
  }, [currentIndex]);

  // Format timer HH:MM:SS
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Status calculator for question palette
  const getQuestionStatus = (qId) => {
    const isAns = answers[qId] !== undefined && answers[qId] !== null;
    const isMarked = markedForReview[qId] === true;
    const isVis = visited[qId] === true;

    if (isAns && isMarked) return 'marked-answered'; // Answered & Marked for Review
    if (isMarked) return 'marked'; // Marked for Review only
    if (isAns) return 'answered'; // Answered
    if (isVis) return 'unanswered'; // Visited but unanswered
    return 'not-visited'; // Not visited yet
  };

  // Option select handler
  const handleSelectOption = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  // Clear Response
  const handleClearResponse = () => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  // Mark for Review & Next
  const handleMarkForReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Save & Next
  const handleSaveAndNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Previous Question
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Final Submission
  const handleFinalSubmit = () => {
    const timeSpentSeconds = totalSeconds - timeLeft;
    onSubmitTest({
      test,
      userAnswers: answers,
      markedForReview,
      timeSpentSeconds,
      submittedAt: new Date().toISOString()
    });
  };

  // Section Filter Questions
  const filteredQuestions = questions.filter(q => q.section === activeSection);

  // Statistics calculation for palette header
  let countAnswered = 0;
  let countUnanswered = 0;
  let countMarked = 0;
  let countMarkedAnswered = 0;
  let countNotVisited = 0;

  questions.forEach(q => {
    const status = getQuestionStatus(q.id);
    if (status === 'answered') countAnswered++;
    else if (status === 'unanswered') countUnanswered++;
    else if (status === 'marked') countMarked++;
    else if (status === 'marked-answered') countMarkedAnswered++;
    else countNotVisited++;
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Distraction-Free Header */}
      <header className="bg-navy-950 text-white px-4 py-3 border-b border-navy-800 shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Test Name & Exam Tag */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to exit the test? Your progress will be lost.")) {
                  onExitTest();
                }
              }}
              className="p-1.5 rounded-lg bg-navy-800 hover:bg-red-600 text-slate-300 hover:text-white transition"
              title="Exit Test"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-md">
                  {test.title}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-blue-600 text-white text-[10px] font-extrabold uppercase rounded">
                  {test.examTag}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
          </div>

          {/* Persistent Countdown Timer */}
          <div className="flex items-center space-x-3">
            
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border shadow-inner transition-colors ${
              timeLeft < 300 
                ? 'bg-red-950/80 border-red-500/50 text-red-300 animate-pulse-soft' 
                : 'bg-navy-900 border-navy-700 text-emerald-400'
            }`}>
              <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-red-400' : 'text-emerald-400'}`} />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-1 font-semibold uppercase">Time Remaining</span>
                <span className="font-mono text-sm sm:text-base font-bold tracking-wider">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700 hidden sm:block"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Mobile Question Palette Trigger */}
            <button
              onClick={() => setIsPaletteOpenMobile(true)}
              className="lg:hidden p-2 rounded-lg bg-blue-600 text-white font-semibold text-xs flex items-center space-x-1"
            >
              <Grid className="w-4 h-4" />
              <span>Palette</span>
            </button>
          </div>

        </div>
      </header>

      {/* Section Tabs Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto">
          
          <div className="flex space-x-2">
            <span className="text-xs text-slate-500 font-semibold uppercase self-center mr-2 hidden sm:inline">Sections:</span>
            {sections.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveSection(sec);
                  // Find first question of this section
                  const firstIdx = questions.findIndex(q => q.section === sec);
                  if (firstIdx !== -1) setCurrentIndex(firstIdx);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                  activeSection === sec
                    ? 'bg-navy-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center space-x-4 text-xs font-semibold text-slate-600">
            <span className="text-emerald-600 flex items-center gap-1"><Award className="w-3.5 h-3.5" /> +{test.positiveMark} Marks</span>
            <span className="text-red-500 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> -{test.negativeMark} Marks</span>
          </div>

        </div>
      </div>

      {/* Main Workspace Area (Question Card + Palette Sidebar) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 flex gap-4 overflow-hidden">
        
        {/* Left Side: MCQ Card & Action Controls */}
        <div className="flex-1 flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-y-auto">
          
          <div>
            {/* Question Header Metadata */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-2.5 py-1 rounded-md">
                  Q.{currentIndex + 1}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  {currentQ.section}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 font-medium rounded">
                  Difficulty: {currentQ.difficulty || 'Moderate'}
                </span>
                {markedForReview[currentQ.id] && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 font-bold rounded flex items-center gap-1">
                    <Bookmark className="w-3 h-3 fill-purple-600" /> Marked
                  </span>
                )}
              </div>
            </div>

            {/* Question Body */}
            <div className="mb-6">
              <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                {currentQ.question}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = answers[currentQ.id] === optIdx;
                return (
                  <label
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`flex items-start p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-navy-800 bg-blue-50/60 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 shrink-0 transition ${
                      isSelected ? 'border-navy-800 bg-navy-800' : 'border-slate-400 bg-white'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${
                      isSelected ? 'text-navy-950 font-semibold' : 'text-slate-700'
                    }`}>
                      {opt}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Bottom MCQ Navigation Control Bar */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            
            {/* Left Actions: Clear & Mark for Review */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleMarkForReview}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center space-x-1.5 ${
                  markedForReview[currentQ.id]
                    ? 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mark for Review & Next</span>
                <span className="sm:hidden">Mark</span>
              </button>

              <button
                onClick={handleClearResponse}
                disabled={answers[currentQ.id] === undefined}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Clear Response</span>
              </button>
            </div>

            {/* Right Actions: Previous, Save & Next, Submit */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={handleSaveAndNext}
                disabled={currentIndex === questions.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-navy-800 hover:bg-blue-700 text-white shadow-sm flex items-center space-x-1 disabled:opacity-50"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center space-x-1 ml-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Test</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right Side: Question Navigation Palette (Desktop Sidebar) */}
        <aside className="hidden lg:flex flex-col w-80 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden shrink-0">
          
          {/* Palette Header */}
          <div className="p-4 bg-slate-900 text-white border-b border-slate-800">
            <h3 className="font-bold text-sm flex items-center justify-between">
              <span>Question Palette</span>
              <span className="text-xs text-slate-400 font-normal">{questions.length} Items</span>
            </h3>
          </div>

          {/* Legend Grid */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 text-[11px] grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center">{countAnswered}</span>
              <span className="text-slate-700">Answered</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded bg-red-500 text-white font-bold text-[9px] flex items-center justify-center">{countUnanswered}</span>
              <span className="text-slate-700">Unanswered</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded bg-purple-600 text-white font-bold text-[9px] flex items-center justify-center">{countMarked}</span>
              <span className="text-slate-700">Marked Review</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded bg-indigo-600 text-white font-bold text-[9px] flex items-center justify-center relative">
                {countMarkedAnswered}
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full absolute -top-0.5 -right-0.5"></span>
              </span>
              <span className="text-slate-700">Ans & Marked</span>
            </div>
            <div className="flex items-center space-x-1.5 col-span-2">
              <span className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-300 text-slate-600 font-bold text-[9px] flex items-center justify-center">{countNotVisited}</span>
              <span className="text-slate-700">Not Visited</span>
            </div>
          </div>

          {/* Question Grid Buttons */}
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const status = getQuestionStatus(q.id);
                const isActive = idx === currentIndex;

                let statusClass = 'palette-not-visited';
                if (status === 'answered') statusClass = 'palette-answered';
                else if (status === 'unanswered') statusClass = 'palette-unanswered';
                else if (status === 'marked') statusClass = 'palette-marked';
                else if (status === 'marked-answered') statusClass = 'palette-marked-answered';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`palette-btn ${statusClass} ${isActive ? 'palette-active' : ''}`}
                  >
                    {idx + 1}
                    {status === 'marked-answered' && (
                      <span className="w-2 h-2 bg-emerald-400 rounded-full absolute -top-0.5 -right-0.5 border border-white"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer Submit CTA */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow transition"
            >
              Submit Final Test
            </button>
          </div>

        </aside>

      </div>

      {/* Mobile Question Palette Drawer Modal */}
      {isPaletteOpenMobile && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div className="w-80 bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            
            <div className="p-4 bg-navy-950 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Question Palette</h3>
              <button onClick={() => setIsPaletteOpenMobile(false)} className="p-1 rounded bg-navy-800">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Mobile Legend */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs grid grid-cols-2 gap-2">
              <span className="text-emerald-700 font-semibold">Answered: {countAnswered}</span>
              <span className="text-red-600 font-semibold">Unanswered: {countUnanswered}</span>
              <span className="text-purple-700 font-semibold">Marked: {countMarked}</span>
              <span className="text-slate-600 font-semibold">Not Visited: {countNotVisited}</span>
            </div>

            {/* Grid */}
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const status = getQuestionStatus(q.id);
                  const isActive = idx === currentIndex;

                  let statusClass = 'palette-not-visited';
                  if (status === 'answered') statusClass = 'palette-answered';
                  else if (status === 'unanswered') statusClass = 'palette-unanswered';
                  else if (status === 'marked') statusClass = 'palette-marked';
                  else if (status === 'marked-answered') statusClass = 'palette-marked-answered';

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsPaletteOpenMobile(false);
                      }}
                      className={`palette-btn ${statusClass} ${isActive ? 'palette-active' : ''}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => {
                  setIsPaletteOpenMobile(false);
                  setShowSubmitModal(true);
                }}
                className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
              >
                Submit Test
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-extrabold text-navy-950 mb-2">Submit Test Confirmation</h3>
            <p className="text-xs text-slate-600 mb-4">
              Are you sure you want to end your test session and generate your scorecard?
            </p>

            {/* Summary Grid */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs mb-6">
              <div>
                <p className="text-slate-500 font-medium">Total Questions:</p>
                <p className="font-bold text-slate-900 text-sm">{questions.length}</p>
              </div>
              <div>
                <p className="text-emerald-700 font-medium">Answered:</p>
                <p className="font-bold text-emerald-700 text-sm">{countAnswered + countMarkedAnswered}</p>
              </div>
              <div>
                <p className="text-purple-700 font-medium">Marked for Review:</p>
                <p className="font-bold text-purple-700 text-sm">{countMarked}</p>
              </div>
              <div>
                <p className="text-red-500 font-medium">Unanswered / Unvisited:</p>
                <p className="font-bold text-red-500 text-sm">{countUnanswered + countNotVisited}</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Resume Test
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-5 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow"
              >
                Yes, Submit Now
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
