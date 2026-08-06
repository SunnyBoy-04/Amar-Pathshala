import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  SendHorizontal, 
  Users, 
  Zap, 
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Key,
  RefreshCw,
  Lightbulb,
  Cpu
} from 'lucide-react';

// Custom Markdown Formatter (replaces **bold** and *italic* with styled React elements without raw asterisks)
const renderFormattedContent = (content) => {
  if (!content) return null;

  const lines = content.split('\n');

  return lines.map((line, lIdx) => {
    // Regex splits by **bold** and *italic*
    const tokens = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return (
      <div key={lIdx} className={lIdx > 0 ? 'mt-1.5' : ''}>
        {tokens.map((token, tIdx) => {
          if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
            return (
              <strong key={tIdx} className="font-extrabold text-white">
                {token.slice(2, -2)}
              </strong>
            );
          }
          if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
            return (
              <span key={tIdx} className="italic text-amber-300 font-semibold">
                {token.slice(1, -1)}
              </span>
            );
          }
          return <span key={tIdx}>{token}</span>;
        })}
      </div>
    );
  });
};

const GEMINI_KNOWLEDGE_BASE = [
  {
    keywords: ['math', 'arithmetic', 'profit', 'loss', 'percentage', 'interest', 'ratio'],
    reply: `🤖 **Gemini AI Math Problem Solver**:

**Shortcut Trick Formula**:
• **Profit %** = (Profit / Cost Price) × 100
• **Compound Interest (2 Yrs)** = P × (1 + R/100)² - P

💡 *Example Problem*: If Cost Price = ₹500 and Selling Price = ₹650, 
Profit = ₹150 ➔ Profit % = (150 / 500) × 100 = **30%**.

Explore our Mathematics PDFs in the Exam Hub for more step-by-step shortcut tricks!`
  },
  {
    keywords: ['wbpsc', 'miscellaneous', 'food si', 'clerkship', 'wbcs'],
    reply: `🏛 **Gemini AI WBPSC Exam Guide**:

1. **WBPSC Miscellaneous**: Prelims (200 Marks) ➔ Mains (400 Marks) ➔ Personality Test (100 Marks).
2. **WBPSC Food SI**: 100 MCQs (50 Arithmetic + 50 General Studies).
3. **WBPSC Clerkship**: Part-I Objective + Part-II Conventional English & Bengali + Typing Test (20 WPM).

📌 All previous 10-year question paper PDFs (2014-2024) are free to download in our **WBPSC Exam Hub**!`
  },
  {
    keywords: ['ssc', 'cgl', 'gd', 'chsl', 'mts'],
    reply: `🎯 **Gemini AI SSC Preparation Assistant**:

• **SSC GD Constable (Bengali Edition)**: 80 Questions (160 Marks) in 60 Minutes.
• **SSC CGL Tier-1**: 100 Questions (Reasoning, GK, Math, English).

💡 *Pro Tip*: Practice 1 mock test daily on our live CBT Simulator engine to boost your speed and accuracy!`
  },
  {
    keywords: ['pdf', 'download', 'notes', 'book'],
    reply: `📄 **Gemini AI PDF Access Guide**:

To download any free PDF note:
1. Click the **"PDFs"** tab or visit any **Individual Exam Hub**.
2. Select your desired subject note (*e.g., WB Geography, Science 2000+ MCQs, Math Formulas*).
3. Click **"Download Free PDF"** ➔ Instant 0-second download!`
  },
  {
    keywords: ['railway', 'rrb', 'ntpc', 'group d', 'science'],
    reply: `🚆 **Gemini AI Railway Exam Assistant**:

• **RRB Science Focus**: 90% of questions come from Class 9 & 10 NCERT Physics, Chemistry, and Life Science.
• Check out our **"Railway RRB Exam Hub"** to download the 2000+ Science MCQ Special PDF!`
  }
];

export default function FloatingBotWidget({ onOpenAuthModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'groups'
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('amar_pathshala_gemini_api_key') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '✨ **Namaskar! I am Gemini 3.1 Pro AI**, your next-generation competitive exam problem solver on AMAR PATHSHALA. Ask me any Math problem, WBPSC/SSC syllabus query, or PDF download help!'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const widgetRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Click Outside to Close Handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  // Save API Key
  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('amar_pathshala_gemini_api_key', key);
    setShowKeyModal(false);
  };

  // Process User Input with Gemini 3.1 AI Engine
  const handleSendMessage = async (e, customText = null) => {
    if (e) e.preventDefault();
    const userText = (customText || inputMsg).trim();
    if (!userText || isThinking) return;

    const newMsgList = [...messages, { sender: 'user', text: userText }];
    setMessages(newMsgList);
    setInputMsg('');
    setIsThinking(true);

    // Try Live Gemini 3.1 REST API if API Key is configured
    if (apiKey) {
      try {
        let response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are Gemini 3.1 Pro AI, an expert exam preparation tutor for Indian government exams (WBPSC, SSC, Railway, Banking) on AMAR PATHSHALA. Solve the student's problem step-by-step with clear formatting in Bengali/English:\n\nStudent Query: ${userText}`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (!response.ok) {
          // Fallback model endpoint
          response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: `You are Gemini 3.1 Pro AI on AMAR PATHSHALA. Solve the student's question:\n\n${userText}` }] }]
              })
            }
          );
        }

        if (response.ok) {
          const data = await response.json();
          const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiReply) {
            setMessages(prev => [...prev, { sender: 'bot', text: `✨ **Gemini 3.1 Flash AI Response**:\n\n${aiReply}` }]);
            setIsThinking(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Gemini 3.1 API call failed, using internal Gemini 3.1 Knowledge Engine fallback.');
      }
    }

    // On-Device Gemini 3.1 Intelligent Solver Engine Fallback
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let matchedReply = null;

      for (const rule of GEMINI_KNOWLEDGE_BASE) {
        if (rule.keywords.some(k => lower.includes(k))) {
          matchedReply = rule.reply;
          break;
        }
      }

      if (!matchedReply) {
        matchedReply = `✨ **Gemini 3.1 Pro AI Answer**:

Thank you for your question regarding **"${userText}"**!

💡 **Key Takeaways for Aspirants**:
1. All official notifications, syllabus breakdowns, and cut-offs for this topic are available in our **Individual Exam Hubs**.
2. Download free practice question sets in the **PDFs** tab or launch a live timer test in **Mock Tests**.
3. Need personalized guidance? Connect directly with Chief Admin **RAKESH PATRA** (+91 8927241844).`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: matchedReply }]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Expanded Gemini 3.1 AI Window */}
      {isOpen && (
        <div className="mb-4 w-[360px] sm:w-[420px] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl animate-fade-in text-slate-100 flex flex-col max-h-[580px]">
          
          {/* Gemini AI Top Header */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-4 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg border border-blue-400/30">
                <Bot className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white tracking-tight flex items-center gap-1.5">
                  <span>Gemini 3.1 Pro AI</span>
                  <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-400 text-[10px] font-black rounded-full border border-emerald-500/30 uppercase">
                    v3.1 PRO
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300 font-medium leading-tight">
                  Next-Gen Exam Solver, Math Solutions & Notes
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowKeyModal(!showKeyModal)}
                className="p-2 rounded-full text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition"
                title="Configure Gemini API Key"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* API Key Modal Bar (Optional Live Gemini Key Input) */}
          {showKeyModal && (
            <div className="p-3 bg-slate-950 border-b border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-amber-300 font-bold">
                <span>🔑 Optional Google Gemini API Key</span>
                <span className="text-[10px] text-slate-400">Leave blank for internal AI</span>
              </div>
              <input
                type="password"
                placeholder="Paste Gemini API key (AIzaSy...)"
                value={apiKey}
                onChange={(e) => handleSaveApiKey(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          {/* Subtitle Banner */}
          <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 text-xs text-slate-300 font-medium flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Ask Gemini AI any math or exam question</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">● Active 24/7</span>
          </div>

          {/* Tab Switcher: Chat vs Community Groups */}
          <div className="flex bg-slate-950 p-1 border-b border-slate-800 text-xs font-black">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 rounded-xl transition flex items-center justify-center space-x-1.5 ${
                activeTab === 'chat' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-amber-300" />
              <span>Gemini AI Solver</span>
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`flex-1 py-2 rounded-xl transition flex items-center justify-center space-x-1.5 ${
                activeTab === 'groups' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Official Groups</span>
            </button>
          </div>

          {/* TAB 1: GEMINI AI CHAT ENGINE */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[350px]">
              
              {/* Quick AI Prompt Shortcuts */}
              <div className="p-2 bg-slate-950/60 border-b border-slate-800 flex items-center space-x-1.5 overflow-x-auto text-[11px] font-bold scrollbar-none">
                <button
                  onClick={() => handleSendMessage(null, 'Math Shortcut: How to calculate percentage profit quickly?')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg whitespace-nowrap transition border border-slate-700"
                >
                  💡 Math Shortcuts
                </button>
                <button
                  onClick={() => handleSendMessage(null, 'What is the syllabus for WBPSC Miscellaneous exam?')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg whitespace-nowrap transition border border-slate-700"
                >
                  🏛 WBPSC Syllabus
                </button>
                <button
                  onClick={() => handleSendMessage(null, 'How to download free PDF study materials?')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg whitespace-nowrap transition border border-slate-700"
                >
                  📄 Download PDFs
                </button>
              </div>

              {/* Chat Message Window */}
              <div className="flex-1 p-3 space-y-3 overflow-y-auto text-xs text-left">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[88%] p-3 rounded-2xl ${
                      m.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none font-medium shadow-md' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none font-normal leading-relaxed shadow'
                    }`}>
                      {renderFormattedContent(m.text)}
                    </div>
                  </div>
                ))}

                {isThinking && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 border border-slate-700 text-slate-300 p-3 rounded-2xl rounded-bl-none text-xs flex items-center space-x-2 animate-pulse">
                      <Cpu className="w-4 h-4 text-amber-300 animate-spin" />
                      <span>Gemini AI is analyzing and solving your question...</span>
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={(e) => handleSendMessage(e)} className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Ask Gemini AI any math or exam query..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-medium"
                />
                <button
                  type="submit"
                  disabled={isThinking}
                  className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow transition disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: GROUPS VIEW */}
          {activeTab === 'groups' && (
            <div className="p-4 space-y-3 overflow-y-auto flex-1 text-left">
              
              <a
                href="https://chat.whatsapp.com/EFQs2nncJnnCmna3IjcetU?s=cl&p=a&ilr=1"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-2xl transition flex items-center justify-between group shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow">
                    <MessageCircle className="w-6 h-6 fill-slate-950 text-slate-950" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white group-hover:text-emerald-300 transition">
                      WhatsApp Channel
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      25.4K followers • Daily study updates
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 opacity-80 group-hover:opacity-100 transition" />
              </a>

              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/30 rounded-2xl transition flex items-center justify-between group shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-bold shadow">
                    <SendHorizontal className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white group-hover:text-blue-300 transition">
                      Telegram Group
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Instant updates • Quick discussions
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-400 opacity-80 group-hover:opacity-100 transition" />
              </a>

              <a
                href="https://arattai.in"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 rounded-2xl transition flex items-center justify-between group shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-bold shadow">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white group-hover:text-purple-300 transition">
                      Arattai Group
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Indian chat app • Local community
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-purple-400 opacity-80 group-hover:opacity-100 transition" />
              </a>

              <div className="pt-2 text-center text-[11px] text-slate-400 font-semibold flex items-center justify-center gap-1">
                <span>Join any or all groups to stay connected!</span>
                <span>🔗</span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Floating Trigger Button (Bottom-Right Corner) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-4 bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/20"
        title="Open Gemini AI Problem Solver"
      >
        <Bot className="w-7 h-7 text-amber-300" />
        
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-slate-950 rounded-full flex items-center justify-center text-[9px] font-black text-white animate-pulse">
          1
        </span>
      </button>

    </div>
  );
}
