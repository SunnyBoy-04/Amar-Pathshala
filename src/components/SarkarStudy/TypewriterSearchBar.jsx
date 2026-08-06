import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

export const SEARCH_KEYWORDS = [
  "WBCS prelims syllabus",
  "WBCS previous year question paper PDF",
  "WBCS preparation in Bengali",
  "WBCS book list",
  "WB Police Constable recruitment",
  "WBP SI question paper PDF",
  "WB Police mock test in Bengali",
  "WBP Constable syllabus",
  "WBPSC Clerkship syllabus PDF",
  "WBPSC Food SI mock test",
  "WBPSC Miscellaneous previous year question paper",
  "WBPSC exam calendar",
  "WB Primary TET preparation in Bengali",
  "Primary TET CDP questions in Bengali",
  "WB TET practice set PDF",
  "WB ICDS Supervisor exam",
  "WB Health recruitment",
  "WB Panchayat recruitment syllabus",
  "West Bengal School Service Commission (WB SSC) news",
  "Bengali GK for competitive exams",
  "General Knowledge questions and answers in Bengali",
  "West Bengal GK PDF download",
  "Static GK in Bengali",
  "Daily Current Affairs in Bengali",
  "West Bengal Current Affairs PDF",
  "Monthly Current Affairs in Bengali 2026",
  "Math shortcut tricks in Bengali",
  "Competitive exam math chapter wise in Bengali",
  "Arithmetic for WBPSC",
  "English grammar for WBPSC Clerkship",
  "General Science MCQ in Bengali",
  "Life Science questions for WBP",
  "WB Govt exam previous year question paper PDF download",
  "Free online mock test for WB Police in Bengali",
  "WBPSC Clerkship free study material PDF",
  "Bengali GK Mock Test Online",
  "Subject wise practice set in Bengali PDF",
  "West Bengal job news today",
  "Karmasangsthan PDF download this week",
  "WB Police Constable cut off marks",
  "WBPSC Food SI exam date",
  "WB Govt job syllabus PDF in Bengali"
];

export default function TypewriterSearchBar({ 
  value = '', 
  onChange, 
  onSearchSubmit,
  isDarkMode = false,
  size = 'medium' // 'small' | 'medium' | 'large'
}) {
  const [placeholderText, setPlaceholderText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Typewriter animation state refs to preserve progress across re-renders
  const kwIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timerRef = useRef(null);

  // Typewriter Engine effect
  useEffect(() => {
    // If focused or user has typed anything, stop animation and clear placeholder
    if (isFocused || (value && value.length > 0)) {
      setPlaceholderText('');
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const typeStep = () => {
      const currentKeyword = SEARCH_KEYWORDS[kwIndexRef.current];

      if (!isDeletingRef.current) {
        // Typing forward
        charIndexRef.current += 1;
        setPlaceholderText(currentKeyword.substring(0, charIndexRef.current));

        if (charIndexRef.current === currentKeyword.length) {
          // Finished typing word -> Pause at full word for 1.8 seconds
          isDeletingRef.current = true;
          timerRef.current = setTimeout(typeStep, 1800);
          return;
        } else {
          // Typing next character (~60ms)
          timerRef.current = setTimeout(typeStep, 60);
          return;
        }
      } else {
        // Deleting backward
        charIndexRef.current -= 1;
        setPlaceholderText(currentKeyword.substring(0, charIndexRef.current));

        if (charIndexRef.current === 0) {
          // Finished deleting word -> move to next keyword
          isDeletingRef.current = false;
          kwIndexRef.current = (kwIndexRef.current + 1) % SEARCH_KEYWORDS.length;
          timerRef.current = setTimeout(typeStep, 300);
          return;
        } else {
          // Deleting next character (~30ms)
          timerRef.current = setTimeout(typeStep, 30);
          return;
        }
      }
    };

    // Kickoff typing step
    timerRef.current = setTimeout(typeStep, 100);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isFocused, value]);

  // Autocomplete matching suggestions
  const filteredSuggestions = value.trim() === ''
    ? SEARCH_KEYWORDS.slice(0, 6)
    : SEARCH_KEYWORDS.filter(kw => kw.toLowerCase().includes(value.toLowerCase())).slice(0, 6);

  const handleSelectSuggestion = (suggestion) => {
    if (onChange) onChange(suggestion);
    if (onSearchSubmit) onSearchSubmit(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (onSearchSubmit) onSearchSubmit(value);
      setShowSuggestions(false);
    }
  };

  // Size styling variants
  const sizeClasses = {
    small: 'py-2.5 pl-10 pr-10 text-sm rounded-xl',
    medium: 'py-3.5 sm:py-4 pl-5 pr-14 text-base sm:text-lg font-bold rounded-2xl',
    large: 'py-4 sm:py-5 pl-6 pr-16 text-lg sm:text-xl font-black rounded-2xl shadow-xl'
  };

  return (
    <div className="relative w-full font-sans">
      
      {/* Outer Glow & Focus Ring Container */}
      <div 
        className={`relative flex items-center transition-all duration-300 ${
          isFocused 
            ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-500/15 scale-[1.005]' 
            : 'shadow-sm hover:shadow-md'
        } ${sizeClasses[size]} ${
          isDarkMode 
            ? 'bg-slate-800/90 border border-slate-700 text-white' 
            : 'bg-white border border-slate-200 text-slate-900'
        }`}
      >
        
        {/* Input Element */}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => {
            // Delay blur so click on suggestion dropdown works
            setTimeout(() => {
              setIsFocused(false);
              setShowSuggestions(false);
            }, 200);
          }}
          onKeyDown={handleKeyDown}
          placeholder={isFocused || value ? '' : `Search: "${placeholderText}"`}
          className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-inherit font-bold placeholder-slate-400 dark:placeholder-slate-500 tracking-normal"
        />

        {/* Dynamic blinking cursor line when animation is running */}
        {!isFocused && !value && placeholderText && (
          <span className="inline-block w-0.5 sm:w-1 h-5 sm:h-6 bg-blue-600 animate-pulse ml-0.5 shrink-0" />
        )}

        {/* Clear Button (appears when user has entered text) */}
        {value ? (
          <button
            type="button"
            onClick={() => {
              if (onChange) onChange('');
              setShowSuggestions(true);
            }}
            className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Clear search"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        ) : (
          /* Search Icon on right side */
          <div className="absolute right-4 pointer-events-none text-blue-600 dark:text-blue-400">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}

      </div>

      {/* Autocomplete & Popular Suggestions Dropdown */}
      {showSuggestions && (isFocused || value) && (
        <div className={`absolute left-0 right-0 mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
          isDarkMode ? 'bg-slate-900/95 border-slate-800 text-slate-100' : 'bg-white/95 border-slate-200 text-slate-900'
        }`}>
          <div className="px-5 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" /> 
              {value ? 'Suggested Searches' : 'Popular Search Keywords'}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Press Enter ↵</span>
          </div>

          <ul className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-72 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item, idx) => (
                <li
                  key={idx}
                  onMouseDown={() => handleSelectSuggestion(item)}
                  className="px-5 py-3.5 text-sm sm:text-base font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-blue-500" />
                    <span>{item}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                </li>
              ))
            ) : (
              <li className="px-5 py-4 text-sm text-slate-400 text-center font-semibold">
                No matching topics. Press enter to search for "{value}"
              </li>
            )}
          </ul>
        </div>
      )}

    </div>
  );

}
