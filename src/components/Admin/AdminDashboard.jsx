import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  FileText, 
  Plus, 
  Users, 
  Download, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Edit3, 
  Eye, 
  X, 
  AlertCircle, 
  ShieldCheck, 
  Search,
  Filter,
  Sparkles,
  FileCheck,
  Check
} from 'lucide-react';
import { ADMIN_METRICS, RECENT_UPLOADS } from '../../data/mockData';

export default function AdminDashboard({ mockTests = [], pdfResources = [], onPublishNewTest, onPublishNewPdf, onDeleteTest, onDeletePdf }) {
  const [uploadsList, setUploadsList] = useState(() => {
    try {
      const saved = localStorage.getItem('sarkarstudy_admin_uploads');
      return saved ? JSON.parse(saved) : RECENT_UPLOADS;
    } catch (e) {
      return RECENT_UPLOADS;
    }
  });

  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'CSV' | 'PDF'
  
  // Modals state
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [csvUploadMode, setCsvUploadMode] = useState('csv'); // 'csv' | 'manual'
  const [toastMessage, setToastMessage] = useState(null);

  // Form states - CSV Mock Upload & Parsed questions
  const [csvForm, setCsvForm] = useState({
    title: 'SBI PO 2026 Shift-2 Live Mock Test',
    category: 'Banking',
    examTag: 'SBI PO',
    duration: 60,
    positiveMark: 1.0,
    negativeMark: 0.25,
    fileName: '',
    parsedQuestions: []
  });

  // Manual Question Builder state
  const [manualQuestion, setManualQuestion] = useState({
    question: '',
    section: 'Quantitative Aptitude',
    optA: '',
    optB: '',
    optC: '',
    optD: '',
    optE: '',
    correctAnswer: 0,
    explanation: ''
  });

  // Form states - PDF Resource Upload
  const [pdfForm, setPdfForm] = useState({
    title: '',
    category: 'Banking',
    examTag: 'SBI PO',
    description: '',
    fileSize: '0 MB',
    pages: 45,
    fileName: '',
    selectedFileObj: null
  });

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);

  // Auto-save uploadsList to LocalStorage
  React.useEffect(() => {
    try {
      localStorage.setItem('sarkarstudy_admin_uploads', JSON.stringify(uploadsList));
    } catch (e) {}
  }, [uploadsList]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // CSV File Upload Handler & Parser
  const handleCsvFileSelect = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const parsed = parseCsvText(text);
      setCsvForm(prev => ({
        ...prev,
        fileName: file.name,
        parsedQuestions: parsed
      }));
      triggerToast(`Parsed ${parsed.length} questions from ${file.name}!`);
    };
    reader.readAsText(file);
  };

  // Simple CSV Text Parser
  const parseCsvText = (csvText) => {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length <= 1) return [];

    const questions = [];
    const startIndex = lines[0].toLowerCase().includes('question') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim().replace(/^"(.*)"$/, '$1'));
      if (parts.length >= 4) {
        const qText = parts[0];
        const optA = parts[1] || 'Option A';
        const optB = parts[2] || 'Option B';
        const optC = parts[3] || 'Option C';
        const optD = parts[4] || 'Option D';
        const optE = parts[5] || 'Option E';
        const rawAns = (parts[6] || '0').toLowerCase();
        
        let correctIdx = 0;
        if (rawAns.includes('b') || rawAns === '1') correctIdx = 1;
        else if (rawAns.includes('c') || rawAns === '2') correctIdx = 2;
        else if (rawAns.includes('d') || rawAns === '3') correctIdx = 3;
        else if (rawAns.includes('e') || rawAns === '4') correctIdx = 4;

        const explanation = parts[7] || 'Step-by-step solution provided by SarkarStudy faculty.';
        const section = parts[8] || 'Quantitative Aptitude';

        questions.push({
          id: i - startIndex + 1,
          section: section,
          question: qText,
          options: [`A. ${optA}`, `B. ${optB}`, `C. ${optC}`, `D. ${optD}`, `E. ${optE}`],
          correctAnswer: correctIdx,
          explanation: explanation,
          difficulty: 'Moderate'
        });
      }
    }
    return questions;
  };

  // Add Manual Question to Builder
  const handleAddManualQuestion = () => {
    if (!manualQuestion.question || !manualQuestion.optA || !manualQuestion.optB) {
      alert("Please provide at least Question text, Option A, and Option B.");
      return;
    }

    const newQ = {
      id: csvForm.parsedQuestions.length + 1,
      section: manualQuestion.section,
      question: manualQuestion.question,
      options: [
        `A. ${manualQuestion.optA}`,
        `B. ${manualQuestion.optB}`,
        `C. ${manualQuestion.optC || 'N/A'}`,
        `D. ${manualQuestion.optD || 'N/A'}`,
        `E. ${manualQuestion.optE || 'N/A'}`
      ],
      correctAnswer: parseInt(manualQuestion.correctAnswer),
      explanation: manualQuestion.explanation || 'Detailed step-by-step solution.',
      difficulty: 'Moderate'
    };

    setCsvForm(prev => ({
      ...prev,
      parsedQuestions: [...prev.parsedQuestions, newQ]
    }));

    setManualQuestion({
      question: '',
      section: 'Quantitative Aptitude',
      optA: '',
      optB: '',
      optC: '',
      optD: '',
      optE: '',
      correctAnswer: 0,
      explanation: ''
    });

    triggerToast("Question added to test suite!");
  };

  // PDF File Selection Handler
  const handlePdfFileSelect = (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert("Please select a valid PDF document file (.pdf)");
      return;
    }

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    const sizeStr = sizeInMb > 0 ? `${sizeInMb} MB` : `${(file.size / 1024).toFixed(0)} KB`;
    
    // Auto fill title if empty
    const autoTitle = pdfForm.title || file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");

    setPdfForm(prev => ({
      ...prev,
      fileName: file.name,
      fileSize: sizeStr,
      title: autoTitle,
      selectedFileObj: file
    }));
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handlePdfFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePdfFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Submit CSV Upload Handler
  const handlePublishCsv = (e) => {
    e.preventDefault();
    
    const finalQuestions = csvForm.parsedQuestions.length > 0 ? csvForm.parsedQuestions : [
      {
        id: 1,
        section: "Quantitative Aptitude",
        question: "A train 200m long crosses a pole in 10 seconds. Find the speed of the train in km/h.",
        options: ["A. 72 km/h", "B. 60 km/h", "C. 54 km/h", "D. 90 km/h", "E. 80 km/h"],
        correctAnswer: 0,
        explanation: "Speed = Distance / Time = 200 / 10 = 20 m/s. Convert to km/h = 20 * 18/5 = 72 km/h.",
        difficulty: "Easy"
      },
      {
        id: 2,
        section: "Reasoning Ability",
        question: "In a row of 30 students, Rahul is 12th from the left. What is his position from the right end?",
        options: ["A. 18th", "B. 19th", "C. 20th", "D. 17th", "E. 21st"],
        correctAnswer: 1,
        explanation: "Position from right = Total - Position from left + 1 = 30 - 12 + 1 = 19th.",
        difficulty: "Easy"
      }
    ];

    const testId = `test-custom-${Date.now()}`;
    const newUpload = {
      id: `up-${Date.now()}`,
      testId: testId,
      filename: csvForm.fileName || `${csvForm.title.replace(/\s+/g, '_')}.csv`,
      type: 'Mock Test CSV',
      category: csvForm.category,
      uploadedBy: 'Admin - RAKESH PATRA',
      date: new Date().toISOString().split('T')[0],
      status: 'Published',
      itemsCount: `${finalQuestions.length} Questions`
    };

    setUploadsList([newUpload, ...uploadsList]);
    if (onPublishNewTest) {
      onPublishNewTest({
        id: testId,
        title: csvForm.title,
        category: csvForm.category,
        examTag: csvForm.examTag,
        durationMinutes: parseInt(csvForm.duration) || 60,
        totalQuestions: finalQuestions.length,
        totalMarks: finalQuestions.length,
        positiveMark: parseFloat(csvForm.positiveMark) || 1.0,
        negativeMark: parseFloat(csvForm.negativeMark) || 0.25,
        cutoffEstimate: Math.round(finalQuestions.length * 0.65),
        difficulty: 'Moderate',
        sections: ['Quantitative Aptitude', 'Reasoning Ability', 'English Language'],
        questions: finalQuestions
      });
    }

    setIsCsvModalOpen(false);
    setCsvForm({
      title: 'SBI PO 2026 Shift-2 Live Mock Test',
      category: 'Banking',
      examTag: 'SBI PO',
      duration: 60,
      positiveMark: 1.0,
      negativeMark: 0.25,
      fileName: '',
      parsedQuestions: []
    });
    triggerToast(`Successfully published "${csvForm.title}" Mock Test!`);
  };

  // Submit PDF Upload Handler
  const handlePublishPdf = (e) => {
    e.preventDefault();

    if (!pdfForm.title) {
      alert("Please enter a document title.");
      return;
    }

    const publishPdfItem = (fileData = null) => {
      const pdfId = `pdf-custom-${Date.now()}`;
      const newUpload = {
        id: `up-${Date.now()}`,
        pdfId: pdfId,
        filename: pdfForm.fileName || `${pdfForm.title.replace(/\s+/g, '_')}.pdf`,
        type: 'PDF Resource',
        category: pdfForm.category,
        uploadedBy: 'Admin - RAKESH PATRA',
        date: new Date().toISOString().split('T')[0],
        status: 'Published',
        itemsCount: pdfForm.fileSize || '3.5 MB'
      };

      setUploadsList([newUpload, ...uploadsList]);

      if (onPublishNewPdf) {
        onPublishNewPdf({
          id: pdfId,
          title: pdfForm.title,
          category: pdfForm.category,
          examTag: pdfForm.examTag,
          fileSize: pdfForm.fileSize || '3.5 MB',
          fileName: pdfForm.fileName,
          fileData: fileData,
          pages: parseInt(pdfForm.pages) || 50,
          downloads: 1,
          rating: 5.0,
          updatedAt: 'August 2026',
          description: pdfForm.description || `Comprehensive study notes and practice set for ${pdfForm.title}`,
          topicsCovered: ['Syllabus Breakdown', 'Formula Derivations', 'Practice Questions'],
          isPopular: true
        });
      }

      setIsPdfModalOpen(false);
      setPdfForm({
        title: '',
        category: 'Banking',
        examTag: 'SBI PO',
        description: '',
        fileSize: '0 MB',
        pages: 45,
        fileName: '',
        selectedFileObj: null
      });

      triggerToast(`Successfully published PDF Resource "${pdfForm.title}"!`);
    };

    if (pdfForm.selectedFileObj) {
      const reader = new FileReader();
      reader.onload = (event) => {
        publishPdfItem(event.target.result);
      };
      reader.readAsDataURL(pdfForm.selectedFileObj);
    } else {
      publishPdfItem(null);
    }
  };

  const handleDeleteItem = (item) => {
    if (window.confirm(`Are you sure you want to remove "${item.filename}"?`)) {
      setUploadsList(uploadsList.filter(u => u.id !== item.id));
      if (item.testId && onDeleteTest) onDeleteTest(item.testId);
      if (item.pdfId && onDeletePdf) onDeletePdf(item.pdfId);
      triggerToast("Item removed from content registry.");
    }
  };

  const filteredUploads = uploadsList.filter(item => {
    if (activeTab === 'CSV') return item.type.includes('CSV');
    if (activeTab === 'PDF') return item.type.includes('PDF');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-navy-950 via-navy-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Control Suite
            </span>
            <span className="text-xs text-slate-300">System Status: {ADMIN_METRICS.serverUptime}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Content Upload & Exam Manager
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Upload mock test CSV spreadsheets, publish study material PDFs, and monitor active student metrics.
          </p>
        </div>

        {/* Top Primary Actions */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition transform active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Upload Mock CSV</span>
          </button>

          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition transform active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>Upload PDF Study Material</span>
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-semibold uppercase">Total Mock Tests</p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{ADMIN_METRICS.totalMockTests}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-semibold uppercase">PDF Materials</p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{ADMIN_METRICS.totalPdfs}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-semibold uppercase">Registered Students</p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{ADMIN_METRICS.registeredStudents}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-semibold uppercase">Total Downloads</p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{ADMIN_METRICS.totalDownloads}</p>
          </div>
        </div>

      </div>

      {/* Content Management Data Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table Filter Bar */}
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Content Repository & Upload History
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage uploaded exam mock question banks and study resource files.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-200/70 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'ALL' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items ({uploadsList.length})
            </button>
            <button
              onClick={() => setActiveTab('CSV')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'CSV' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CSV Tests
            </button>
            <button
              onClick={() => setActiveTab('PDF')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'PDF' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PDF Notes
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/80 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6">Filename / Title</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Target Category</th>
                <th className="py-3.5 px-4">Uploaded By</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUploads.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  
                  <td className="py-4 px-6 font-bold text-slate-900 flex items-center space-x-3">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      item.type.includes('CSV') ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.type.includes('CSV') ? <FileSpreadsheet className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{item.filename}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{item.itemsCount}</p>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-slate-700">{item.type}</td>

                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 bg-navy-50 text-navy-800 text-[10px] font-bold rounded">
                      {item.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-slate-600">{item.uploadedBy}</td>
                  <td className="py-4 px-4 text-slate-500 font-mono">{item.date}</td>

                  <td className="py-4 px-4 text-center">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                      item.status === 'Published' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => triggerToast(`Inspecting details for ${item.filename}`)}
                        className="p-1.5 text-slate-400 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* CSV Batch Upload / Interactive Question Builder Modal */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Create & Publish Mock Test</h3>
                  <p className="text-xs text-slate-500">Upload CSV questions file or add questions interactively</p>
                </div>
              </div>
              <button onClick={() => setIsCsvModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setCsvUploadMode('csv')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                  csvUploadMode === 'csv' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📁 Import CSV File
              </button>
              <button
                type="button"
                onClick={() => setCsvUploadMode('manual')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                  csvUploadMode === 'manual' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ✏️ Interactive Question Builder ({csvForm.parsedQuestions.length} added)
              </button>
            </div>

            <form onSubmit={handlePublishCsv} className="space-y-4">
              
              {/* CSV Mode */}
              {csvUploadMode === 'csv' && (
                <div>
                  <input
                    type="file"
                    id="csv-file-input"
                    accept=".csv,.txt"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleCsvFileSelect(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />

                  <div
                    onClick={() => document.getElementById('csv-file-input').click()}
                    className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 rounded-2xl p-6 text-center transition cursor-pointer"
                  >
                    <FileSpreadsheet className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">
                      {csvForm.fileName ? `Selected File: ${csvForm.fileName}` : 'Click to select or drag CSV question file here'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Expected columns: Question, OptionA, OptionB, OptionC, OptionD, OptionE, CorrectAnswer, Explanation, Section
                    </p>
                    {csvForm.parsedQuestions.length > 0 && (
                      <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        ✓ {csvForm.parsedQuestions.length} Questions Successfully Loaded
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Manual Question Builder Mode */}
              {csvUploadMode === 'manual' && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-emerald-600" /> Add Custom Question
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 block mb-1">Section</label>
                      <select
                        value={manualQuestion.section}
                        onChange={(e) => setManualQuestion({ ...manualQuestion, section: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                      >
                        <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                        <option value="Reasoning Ability">Reasoning Ability</option>
                        <option value="English Language">English Language</option>
                        <option value="General Awareness">General Awareness</option>
                        <option value="Computer Knowledge">Computer Knowledge</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 block mb-1">Correct Answer</label>
                      <select
                        value={manualQuestion.correctAnswer}
                        onChange={(e) => setManualQuestion({ ...manualQuestion, correctAnswer: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                      >
                        <option value="0">Option A</option>
                        <option value="1">Option B</option>
                        <option value="2">Option C</option>
                        <option value="3">Option D</option>
                        <option value="4">Option E</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">Question Statement</label>
                    <textarea
                      rows="2"
                      placeholder="Enter question text here..."
                      value={manualQuestion.question}
                      onChange={(e) => setManualQuestion({ ...manualQuestion, question: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Option A"
                      value={manualQuestion.optA}
                      onChange={(e) => setManualQuestion({ ...manualQuestion, optA: e.target.value })}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Option B"
                      value={manualQuestion.optB}
                      onChange={(e) => setManualQuestion({ ...manualQuestion, optB: e.target.value })}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Option C"
                      value={manualQuestion.optC}
                      onChange={(e) => setManualQuestion({ ...manualQuestion, optC: e.target.value })}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Option D"
                      value={manualQuestion.optD}
                      onChange={(e) => setManualQuestion({ ...manualQuestion, optD: e.target.value })}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Detailed Solution / Explanation"
                      value={manualQuestion.explanation}
                      onChange={(e) => setManualQuestion({ ...manualQuestion, explanation: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddManualQuestion}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    + Add Question to Test
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mock Test Title</label>
                  <input
                    type="text"
                    required
                    value={csvForm.title}
                    onChange={(e) => setCsvForm({ ...csvForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Exam & Category</label>
                  <select
                    value={csvForm.category}
                    onChange={(e) => setCsvForm({ ...csvForm, category: e.target.value, examTag: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Banking">Banking (SBI PO / IBPS)</option>
                    <option value="SSC">SSC (CGL / CHSL)</option>
                    <option value="UPSC">UPSC Civil Services</option>
                    <option value="Railways">Railways RRB NTPC</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={csvForm.duration}
                    onChange={(e) => setCsvForm({ ...csvForm, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">+ Positive Mark</label>
                  <input
                    type="number"
                    step="0.25"
                    value={csvForm.positiveMark}
                    onChange={(e) => setCsvForm({ ...csvForm, positiveMark: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">- Negative Mark</label>
                  <input
                    type="number"
                    step="0.05"
                    value={csvForm.negativeMark}
                    onChange={(e) => setCsvForm({ ...csvForm, negativeMark: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Questions Preview Box */}
              {csvForm.parsedQuestions.length > 0 && (
                <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl text-xs">
                  <h4 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready Questions Preview ({csvForm.parsedQuestions.length} Questions):
                  </h4>
                  <div className="space-y-1.5 font-mono text-[11px] max-h-36 overflow-y-auto pr-1">
                    {csvForm.parsedQuestions.slice(0, 5).map((q, i) => (
                      <div key={i} className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Q{q.id} [{q.section}]</span>
                        <span className="truncate max-w-[240px] text-slate-300">{q.question}</span>
                        <span className="text-emerald-400 font-bold">{q.options[q.correctAnswer]?.split('.')[0]}</span>
                      </div>
                    ))}
                    {csvForm.parsedQuestions.length > 5 && (
                      <p className="text-[10px] text-slate-400 text-center italic">+ {csvForm.parsedQuestions.length - 5} more questions</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCsvModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow"
                >
                  Validate & Publish Test
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* PDF Upload Modal */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 text-blue-800 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Upload PDF Study Material</h3>
                  <p className="text-xs text-slate-500">Publish notes, ebooks, or solved question papers</p>
                </div>
              </div>
              <button onClick={() => setIsPdfModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishPdf} className="space-y-4">
              
              {/* Hidden HTML File Input */}
              <input
                type="file"
                id="pdf-file-upload"
                accept=".pdf,application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Functional File Dropzone */}
              <div
                onClick={() => document.getElementById('pdf-file-upload').click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer ${
                  isDragging 
                    ? 'border-blue-600 bg-blue-100/50 scale-[1.01]' 
                    : pdfForm.fileName 
                    ? 'border-emerald-400 bg-emerald-50/50' 
                    : 'border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/30'
                }`}
              >
                {pdfForm.fileName ? (
                  <div className="space-y-1">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-1">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 truncate px-4">{pdfForm.fileName}</p>
                    <p className="text-[11px] text-emerald-700 font-semibold">{pdfForm.fileSize} • File Attached Successfully!</p>
                    <p className="text-[10px] text-slate-400 underline pt-1">Click to change PDF file</p>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">Click to Browse or Drag & Drop PDF File Here</p>
                    <p className="text-[10px] text-slate-400 mt-1">Supports PDF documents up to 50 MB</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SBI PO 2026 Arithmetic Formula Handbook"
                  value={pdfForm.title}
                  onChange={(e) => setPdfForm({ ...pdfForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category Filter</label>
                  <select
                    value={pdfForm.category}
                    onChange={(e) => setPdfForm({ ...pdfForm, category: e.target.value, examTag: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="Banking">Banking</option>
                    <option value="SBI PO">SBI PO</option>
                    <option value="SSC">SSC</option>
                    <option value="UPSC">UPSC</option>
                    <option value="Current Affairs">Current Affairs</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Total Pages</label>
                  <input
                    type="number"
                    value={pdfForm.pages}
                    onChange={(e) => setPdfForm({ ...pdfForm, pages: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Syllabus Overview & Description</label>
                <textarea
                  rows="3"
                  placeholder="Describe the topics covered in this PDF study material..."
                  value={pdfForm.description}
                  onChange={(e) => setPdfForm({ ...pdfForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!pdfForm.fileName}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>Publish PDF Material</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
