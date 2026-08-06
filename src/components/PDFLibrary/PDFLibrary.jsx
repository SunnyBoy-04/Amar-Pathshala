import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  FileText, 
  BookOpen, 
  Star, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  Eye, 
  X,
  FileCheck
} from 'lucide-react';
import { PDF_RESOURCES } from '../../data/mockData';
import { jsPDF } from 'jspdf';

export default function PDFLibrary({ pdfResources = [], onDeletePdf }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewModalDoc, setPreviewModalDoc] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const categories = ['All', 'Banking', 'SBI PO', 'SSC', 'UPSC', 'Current Affairs'];

  // Use provided pdfResources or fallback to initial static resources
  const activeResources = pdfResources.length > 0 ? pdfResources : PDF_RESOURCES;

  // Filter logic
  const filteredResources = activeResources.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory || doc.examTag.includes(selectedCategory);
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.topicsCovered.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Client-side PDF Download Trigger (Direct Data URL download or jsPDF fallback)
  const handleDownloadPDF = (doc) => {
    setDownloadingId(doc.id);

    try {
      // If the admin uploaded a real file (Data URL stored in fileData)
      if (doc.fileData) {
        const link = document.createElement('a');
        link.href = doc.fileData;
        link.download = doc.fileName || `${doc.title.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadingId(null);
        return;
      }

      // Create jsPDF document instance for standard built-in guides
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      // Header Banner
      pdf.setFillColor(15, 23, 42); // Navy-950
      pdf.rect(0, 0, 210, 40, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.text("AMAR PATHSHALA - Official Study Resource", 14, 18);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(16, 185, 129); // Emerald
      pdf.text(`Exam Target: ${doc.examTag} | Category: ${doc.category}`, 14, 28);

      // Title & Metadata
      pdf.setTextColor(15, 23, 42);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.text(doc.title, 14, 52);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(71, 85, 105);
      pdf.text(`File Size: ${doc.fileSize} | Pages: ${doc.pages} | Updated: ${doc.updatedAt}`, 14, 60);

      pdf.setLineWidth(0.5);
      pdf.setDrawColor(226, 232, 240);
      pdf.line(14, 65, 196, 65);

      // Description Section
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(30, 58, 138);
      pdf.text("DOCUMENT OVERVIEW & SYLLABUS:", 14, 75);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(30, 41, 59);
      const splitDesc = pdf.splitTextToSize(doc.description, 180);
      pdf.text(splitDesc, 14, 83);

      // Topics Covered List
      let startY = 83 + (splitDesc.length * 6) + 6;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(30, 58, 138);
      pdf.text("KEY TOPICS INCLUDED:", 14, startY);

      startY += 8;
      doc.topicsCovered.forEach((topic, idx) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(51, 65, 85);
        pdf.text(`• ${topic}`, 18, startY);
        startY += 7;
      });

      // Sample Notes Content Box
      startY += 6;
      pdf.setFillColor(248, 250, 252);
      pdf.rect(14, startY, 182, 45, 'F');
      pdf.setDrawColor(203, 213, 225);
      pdf.rect(14, startY, 182, 45, 'S');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(15, 23, 42);
      pdf.text("EXAM FORMULA & TRICK HIGHLIGHT (SAMPLE PAGE 1):", 18, startY + 10);

      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105);
      pdf.text("1. Speed = Distance / Time -> km/h to m/s multiply by (5/18).", 18, startY + 18);
      pdf.text("2. Compound Interest 2 Year Shortcut: CI = P * [2r + (r^2/100)] / 100.", 18, startY + 25);
      pdf.text("3. Syllogism Rule: 'Some + No' forms an Either-Or complementary pair.", 18, startY + 32);

      // Footer
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.text("Downloaded from AMAR PATHSHALA Educational Platform. All rights reserved.", 14, 285);

      // Save PDF file
      const sanitizedFilename = doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.pdf';
      pdf.save(sanitizedFilename);

    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Downloading PDF document...");
    } finally {
      setTimeout(() => setDownloadingId(null), 600);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Page Header Banner */}
      <div className="mb-8 bg-gradient-to-r from-navy-950 via-navy-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30 uppercase tracking-wider">
            Verified Study Material
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-white">
            PDF Resource Library
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Download curated question banks, previous year solved papers, formula handbooks, and monthly current affairs capsules for SBI PO, SSC CGL, and UPSC exams.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PDF notes by topic, exam, title (e.g. SBI PO, Formula, Puzzles)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy-800 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-navy-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* PDF Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No PDF Resources Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting your search query or choosing another category filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 px-4 py-2 bg-navy-800 text-white text-xs font-bold rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredResources.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              
              {/* Card Main Info */}
              <div className="p-6">
                
                {/* Exam Tag & Popular Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-navy-50 text-navy-800 text-[11px] font-bold rounded-lg border border-navy-100 uppercase">
                    {doc.examTag}
                  </span>
                  {doc.isPopular && (
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" /> Popular
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-2 leading-snug">
                  {doc.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {doc.description}
                </p>

                {/* Topics Pills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.topicsCovered.map((topic, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* File Metadata Info */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100 font-medium">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> {doc.fileSize} • {doc.pages} Pages
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {doc.rating} ({doc.downloads.toLocaleString()} downloads)
                  </span>
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                
                <button
                  onClick={() => setPreviewModalDoc(doc)}
                  className="flex items-center space-x-1 text-slate-600 hover:text-navy-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-slate-200/60 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Syllabus</span>
                </button>

                <button
                  onClick={() => handleDownloadPDF(doc)}
                  disabled={downloadingId === doc.id}
                  className="flex items-center space-x-1.5 bg-navy-800 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition transform active:scale-95 disabled:opacity-50"
                >
                  <Download className={`w-3.5 h-3.5 ${downloadingId === doc.id ? 'animate-bounce' : ''}`} />
                  <span>{downloadingId === doc.id ? 'Generating PDF...' : 'Download PDF'}</span>
                </button>

              </div>

            </div>
          ))
        )}
      </div>

      {/* Document Syllabus Preview Modal */}
      {previewModalDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 relative">
            
            <button
              onClick={() => setPreviewModalDoc(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                {previewModalDoc.examTag}
              </span>
              <span className="text-xs text-slate-500">
                Updated: {previewModalDoc.updatedAt}
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900 mb-2">
              {previewModalDoc.title}
            </h3>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              {previewModalDoc.description}
            </p>

            {/* Syllabus Topics Checklist */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
              <h4 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Comprehensive Topics & Chapters Included:
              </h4>
              <ul className="space-y-2">
                {previewModalDoc.topicsCovered.map((topic, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 font-semibold">
                Format: PDF • {previewModalDoc.fileSize}
              </span>
              <button
                onClick={() => {
                  const target = previewModalDoc;
                  setPreviewModalDoc(null);
                  handleDownloadPDF(target);
                }}
                className="flex items-center space-x-2 px-5 py-2.5 bg-navy-800 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition"
              >
                <Download className="w-4 h-4" />
                <span>Download Document PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
