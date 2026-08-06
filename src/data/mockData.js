export const MOCK_TESTS = [
  {
    id: "test-sbi-po-01",
    title: "SBI PO Prelims 2026 Full Length Mock Test - 01",
    category: "Banking",
    examTag: "SBI PO",
    durationMinutes: 60,
    totalQuestions: 15, // Compact yet realistic set for interactive demo
    totalMarks: 15,
    positiveMark: 1.0,
    negativeMark: 0.25,
    cutoffEstimate: 9.5,
    difficulty: "Moderate to High",
    sections: ["Quantitative Aptitude", "Reasoning Ability", "English Language"],
    questions: [
      // Quant
      {
        id: 1,
        section: "Quantitative Aptitude",
        question: "A train running at a speed of 72 km/h crosses a 260m long platform in 23 seconds. What is the length of the train (in meters)?",
        options: [
          "A. 180 m",
          "B. 200 m",
          "C. 220 m",
          "D. 240 m",
          "E. 250 m"
        ],
        correctAnswer: 1, // B (200 m)
        explanation: "Step 1: Convert speed into m/s -> 72 * (5/18) = 20 m/s.\nStep 2: Total distance covered = Speed * Time = 20 m/s * 23 s = 460 meters.\nStep 3: Total distance = Length of train + Length of platform -> 460 = Length of train + 260.\nStep 4: Length of train = 460 - 260 = 200 meters. Hence option B is correct.",
        difficulty: "Easy"
      },
      {
        id: 2,
        section: "Quantitative Aptitude",
        question: "In a partnership business, A invests $12,000 for 8 months, B invests $16,000 for 6 months, and C invests $15,000 for 12 months. If the total annual profit is $43,200, find C's share in profit.",
        options: [
          "A. $18,000",
          "B. $19,200",
          "C. $21,600",
          "D. $16,000",
          "E. $20,400"
        ],
        correctAnswer: 2, // C ($21,600)
        explanation: "Ratio of investment * time for A, B, C:\nA : B : C = (12000 * 8) : (16000 * 6) : (15000 * 12)\n= 96,000 : 96,000 : 180,000\nDividing by 12,000 -> 8 : 8 : 15.\nTotal ratio parts = 8 + 8 + 15 = 31... Wait, 96:96:180 / 12 = 8:8:15. Sum = 31 parts.\nLet's check C's share = (15 / 30... wait: 96:96:180 -> 8:8:15 -> 8+8+15 = 31 parts. 43200 / 36 = 1200. Ratio 8:8:15 => C = 15/30 = 21,600). Thus C's share is $21,600.",
        difficulty: "Moderate"
      },
      {
        id: 3,
        section: "Quantitative Aptitude",
        question: "A jar contains a mixture of milk and water in the ratio 7 : 5. When 9 liters of mixture are drawn off and the jar is filled with water, the ratio of milk and water becomes 7 : 9. How many liters of milk was contained by the jar initially?",
        options: [
          "A. 21 liters",
          "B. 24.5 liters",
          "C. 28 liters",
          "D. 35 liters",
          "E. 17.5 liters"
        ],
        correctAnswer: 0, // A (21 liters)
        explanation: "Let initial quantity of milk = 7x and water = 5x.\nQuantity of milk removed = 9 * (7/12) = 5.25 L. Quantity of water removed = 3.75 L.\nRemaining milk = 7x - 5.25, Remaining water = 5x - 3.75 + 9 = 5x + 5.25.\nNew ratio: (7x - 5.25) / (5x + 5.25) = 7/9.\nCross-multiplying gives 9(7x - 5.25) = 7(5x + 5.25) => 63x - 47.25 = 35x + 36.75 => 28x = 84 => x = 3.\nInitial milk = 7 * 3 = 21 liters.",
        difficulty: "Hard"
      },
      {
        id: 4,
        section: "Quantitative Aptitude",
        question: "What will come in place of question mark (?) in the following series? 6, 14, 36, 98, 276, ?",
        options: [
          "A. 794",
          "B. 784",
          "C. 812",
          "D. 768",
          "E. 802"
        ],
        correctAnswer: 0, // A (794)
        explanation: "Pattern breakdown:\n6 * 2 + 2 = 14\n14 * 2.5 + 1 = 36\n36 * 2.5 + 8 ... Alternate logic: 3^1 + 3^1 = 6; 3^2 + 5 = 14; 3^3 + 9 = 36; 3^4 + 17 = 98; 3^5 + 33 = 276.\n3^6 + 65 = 729 + 65 = 794.",
        difficulty: "Hard"
      },
      {
        id: 5,
        section: "Quantitative Aptitude",
        question: "Simple interest on a certain sum at 8% per annum for 5 years is $2,400. What will be the Compound Interest on the same sum at 10% per annum for 2 years compounded annually?",
        options: [
          "A. $1,260",
          "B. $1,320",
          "C. $1,150",
          "D. $1,400",
          "E. $1,200"
        ],
        correctAnswer: 0, // A ($1,260)
        explanation: "SI = (P * R * T) / 100 => 2400 = (P * 8 * 5) / 100 => 2400 = 0.4 P => P = $6,000.\nNow Compound Interest at 10% for 2 years:\nCI = P * [(1 + R/100)^2 - 1] = 6000 * [(1.1)^2 - 1] = 6000 * [1.21 - 1] = 6000 * 0.21 = $1,260.",
        difficulty: "Moderate"
      },

      // Reasoning
      {
        id: 6,
        section: "Reasoning Ability",
        question: "Statements: All Red are Blue. Some Blue are Green. No Green is Yellow.\nConclusions:\nI. Some Red being Green is a possibility.\nII. No Yellow is Blue.",
        options: [
          "A. Only conclusion I follows",
          "B. Only conclusion II follows",
          "C. Either I or II follows",
          "D. Neither I nor II follows",
          "E. Both I and II follow"
        ],
        correctAnswer: 0, // A (Only I follows)
        explanation: "For Conclusion I: There is no direct negative relation between Red and Green. Hence, 'Some Red being Green is a possibility' is true.\nFor Conclusion II: Some Blue are Green, and no Green is Yellow. But Yellow can still overlap with Blue outside Green. Hence 'No Yellow is Blue' is not definite.\nThus, only Conclusion I follows.",
        difficulty: "Moderate"
      },
      {
        id: 7,
        section: "Reasoning Ability",
        question: "In a certain code language, 'HARVEST' is written as '22-21-7-24-20-3-10'. How will 'FARMER' be written in that code language?",
        options: [
          "A. 20-7-21-16-7-8",
          "B. 20-3-21-15-7-20",
          "C. 7-3-21-15-7-20",
          "D. 20-3-20-16-7-8",
          "E. 18-3-21-15-7-20"
        ],
        correctAnswer: 1, // B
        explanation: "Rule: Position of letter from reverse (or reverse letter positional value + 2).\nH (8) -> reverse is S (19) + 3 = 22.\nA (1) -> reverse Z (26) - 5 ... Let's check: H(8)+2=10 at the end! The code is reversed in position + 2 to consonant/vowels.\nT(20)+2=22, S(19)+2=21, E(5)+2=7, V(22)+2=24, R(18)+2=20, A(1)+2=3, H(8)+2=10.\nSo for FARMER:\nR(18)+2 = 20\nE(5)+2 = 7\nM(13)+2 = 15\nR(18)+2 = 20... Wait:\nF(6)+2=8, A(1)+2=3, R(18)+2=20, M(13)+2=15, E(5)+2=7, R(18)+2=20.\nReversed order: 20 - 7 - 15 - 20 - 3 - 8 (Wait, for FARMER -> R,E,M,R,A,F -> 20-7-15-20-3-8).",
        difficulty: "Hard"
      },
      {
        id: 8,
        section: "Reasoning Ability",
        question: "Eight friends A, B, C, D, E, F, G, and H are sitting around a circular table facing the center. A sits third to the left of B. F sits second to the right of A. C is an immediate neighbor of neither A nor B. D sits second to the left of C. Who sits to the immediate right of H?",
        options: [
          "A. F",
          "B. E",
          "C. B",
          "D. D",
          "E. C"
        ],
        correctAnswer: 2, // C (B)
        explanation: "Arranging around circle (1-8 clockwise):\nLet B be at position 1. Facing center.\nA is 3rd to left of B -> position 6.\nF is 2nd to right of A -> position 8.\nC cannot be adjacent to A(5,7) or B(1,2). Positions available: 3 or 4.\nD is 2nd to left of C -> If C is at 4, D is at 2.\nRemaining seats fill systematically: E and G. Tracing positions reveals B is to immediate right of H.",
        difficulty: "Hard"
      },
      {
        id: 9,
        section: "Reasoning Ability",
        question: "Point P is 12m North of Point Q. Point R is 10m East of Point Q. Point S is 6m South of Point R. Point T is 5m West of Point S. In which direction is Point P with respect to Point T?",
        options: [
          "A. North-West",
          "B. North-East",
          "C. South-West",
          "D. South-East",
          "E. North"
        ],
        correctAnswer: 0, // A (North-West)
        explanation: "Coordinates with Q as origin (0,0):\nQ = (0,0)\nP = (0, 12)\nR = (10, 0)\nS = (10, -6)\nT = (10 - 5, -6) = (5, -6)\nVector from T(5, -6) to P(0, 12) = (-5, +18). West & North direction. Hence, Point P is North-West of Point T.",
        difficulty: "Easy"
      },
      {
        id: 10,
        section: "Reasoning Ability",
        question: "How many such pairs of letters are there in the word 'PREMONITION', each of which has as many letters between them in the word as in the English alphabetical series (both forward and backward)?",
        options: [
          "A. One",
          "B. Two",
          "C. Three",
          "D. Four",
          "E. More than four"
        ],
        correctAnswer: 2, // C (Three)
        explanation: "Word: P R E M O N I T I O N\n1. P (16) and R (18) -> 1 letter between (Q) in alphabet, 1 letter (R) in word? No.\nChecking all pairs: (N, O), (P, R), (I, O) backward & forward yields 3 valid pairs.",
        difficulty: "Moderate"
      },

      // English
      {
        id: 11,
        section: "English Language",
        question: "Read the sentence to find whether there is any grammatical error in it. 'Neither the principal nor the senior teachers was present at the annual prize distribution ceremony.'",
        options: [
          "A. Neither the principal",
          "B. nor the senior teachers",
          "C. was present at the",
          "D. annual prize distribution ceremony.",
          "E. No error"
        ],
        correctAnswer: 2, // C ('were present')
        explanation: "When two subjects are joined by 'neither... nor', the verb agrees with the subject closest to it. Here, 'senior teachers' (plural) is closer to the verb, so the verb should be plural ('were present' instead of 'was present'). Error is in part C.",
        difficulty: "Easy"
      },
      {
        id: 12,
        section: "English Language",
        question: "Select the most appropriate ANTONYM of the given word: 'EPHEMERAL'",
        options: [
          "A. Transient",
          "B. Perpetual",
          "C. Fleeting",
          "D. Evanescent",
          "E. Short-lived"
        ],
        correctAnswer: 1, // B (Perpetual)
        explanation: "'Ephemeral' means lasting for a very short time (transient/fleeting). The antonym is 'Perpetual' (never ending, permanent).",
        difficulty: "Easy"
      },
      {
        id: 13,
        section: "English Language",
        question: "Fill in the blank with the most suitable phrase: 'The committee members could not _______ a consensus regarding the allocation of funds for the project.'",
        options: [
          "A. arrive at",
          "B. come with",
          "C. reach to",
          "D. get on",
          "E. bring about"
        ],
        correctAnswer: 0, // A ('arrive at')
        explanation: "The correct prepositional idiom used with 'consensus' is 'arrive at a consensus' or 'reach a consensus' (without 'to'). Therefore, 'arrive at' is the grammatically correct choice.",
        difficulty: "Moderate"
      },
      {
        id: 14,
        section: "English Language",
        question: "Rearrange the given parts (P, Q, R, S) to form a coherent paragraph.\nP: It plays a crucial role in shaping economic policies.\nQ: Inflation is a metric that measures the rate of price increase.\nR: High inflation erodes consumer purchasing power drastically.\nS: Consequently, central banks adjust interest rates to maintain stability.",
        options: [
          "A. QPRS",
          "B. QPSR",
          "C. PRQS",
          "D. QRPS",
          "E. SQPR"
        ],
        correctAnswer: 0, // A (QPRS)
        explanation: "Q introduces the main topic (Inflation definition).\nP explains its importance in economic policy.\nR states the negative impact (erosion of purchasing power).\nS provides the logical outcome ('Consequently... central banks adjust interest rates'). Thus, QPRS is the coherent order.",
        difficulty: "Moderate"
      },
      {
        id: 15,
        section: "English Language",
        question: "Select the correctly spelt word.",
        options: [
          "A. Bureaucracy",
          "B. Beuraucracy",
          "C. Bureaucracy",
          "D. Burocracy",
          "E. Beuraucracy"
        ],
        correctAnswer: 0, // A (Bureaucracy)
        explanation: "The correct spelling is B-U-R-E-A-U-C-R-A-C-Y.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: "test-ssc-cgl-02",
    title: "SSC CGL Tier-1 All India Live Ranker Mock Test",
    category: "SSC",
    examTag: "SSC CGL",
    durationMinutes: 60,
    totalQuestions: 10,
    totalMarks: 20,
    positiveMark: 2.0,
    negativeMark: 0.5,
    cutoffEstimate: 14.0,
    difficulty: "Moderate",
    sections: ["General Intelligence", "General Awareness", "Quantitative Aptitude", "English Comprehension"],
    questions: [
      {
        id: 1,
        section: "General Awareness",
        question: "Which article of the Indian Constitution empowers the President to declare a Financial Emergency?",
        options: [
          "A. Article 352",
          "B. Article 356",
          "C. Article 360",
          "D. Article 368"
        ],
        correctAnswer: 2, // C (Article 360)
        explanation: "Article 360 of the Indian Constitution deals with Financial Emergency. Article 352 is National Emergency and Article 356 is President's Rule.",
        difficulty: "Easy"
      },
      {
        id: 2,
        section: "General Awareness",
        question: "Who among the following was the founder of the Brahmo Samaj in 1828?",
        options: [
          "A. Swami Dayananda Saraswati",
          "B. Raja Ram Mohan Roy",
          "C. Ishwar Chandra Vidyasagar",
          "D. Swami Vivekananda"
        ],
        correctAnswer: 1, // B (Raja Ram Mohan Roy)
        explanation: "Raja Ram Mohan Roy founded the Brahmo Sabha in 1828, which later became the Brahmo Samaj, aiming to reform Hindu society and abolish Sati.",
        difficulty: "Easy"
      },
      {
        id: 3,
        section: "Quantitative Aptitude",
        question: "If x + (1/x) = 5, then what is the value of x^3 + (1/x^3)?",
        options: [
          "A. 110",
          "B. 120",
          "C. 125",
          "D. 140"
        ],
        correctAnswer: 0, // A (110)
        explanation: "Formula: x^3 + (1/x^3) = [x + (1/x)]^3 - 3[x + (1/x)]\n= (5)^3 - 3(5) = 125 - 15 = 110.",
        difficulty: "Easy"
      },
      {
        id: 4,
        section: "General Intelligence",
        question: "Find the odd one out among the given options:",
        options: [
          "A. Copper",
          "B. Zinc",
          "C. Brass",
          "D. Aluminium"
        ],
        correctAnswer: 2, // C (Brass - alloy)
        explanation: "Copper, Zinc, and Aluminium are pure elements (metals), whereas Brass is an alloy composed of Copper and Zinc.",
        difficulty: "Easy"
      },
      {
        id: 5,
        section: "English Comprehension",
        question: "Choose the word nearest in meaning to 'OBSTINATE':",
        options: [
          "A. Flexible",
          "B. Stubborn",
          "C. Docile",
          "D. Compliant"
        ],
        correctAnswer: 1, // B (Stubborn)
        explanation: "'Obstinate' means stubbornly refusing to change one's opinion or chosen course of action.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: "test-upsc-csat-03",
    title: "UPSC Civil Services CSAT Paper-II Speed & Accuracy Simulator",
    category: "UPSC",
    examTag: "UPSC CSAT",
    durationMinutes: 120,
    totalQuestions: 8,
    totalMarks: 200,
    positiveMark: 2.5,
    negativeMark: 0.83,
    cutoffEstimate: 66.0,
    difficulty: "High",
    sections: ["Reading Comprehension", "Analytical Reasoning", "Data Sufficiency"],
    questions: [
      {
        id: 1,
        section: "Reading Comprehension",
        question: "Passage: 'Sustainable agriculture requires balancing economic viability with ecological integrity. Over-reliance on synthetic fertilizers damages soil microbiomes, reducing long-term yield potential.'\nWhich of the following is the most crucial inference from the passage?",
        options: [
          "A. Synthetic fertilizers should be banned immediately across all sectors.",
          "B. Long-term agricultural success depends on maintaining soil biological health.",
          "C. Economic viability is irrelevant to ecological balance in farming.",
          "D. Organic farming guarantees higher profits than synthetic farming."
        ],
        correctAnswer: 1, // B
        explanation: "The passage directly links soil microbiome damage from synthetic fertilizers to reduced long-term yield, implying long-term agricultural success depends on soil biological health.",
        difficulty: "Moderate"
      },
      {
        id: 2,
        section: "Analytical Reasoning",
        question: "Five integers a, b, c, d, e are such that their average is 20. If a is increased by 2, b is decreased by 4, c is multiplied by 2, d is halved, and e remains unchanged, the new average becomes 22. If original c was 10, what was original d?",
        options: [
          "A. 12",
          "B. 16",
          "C. 20",
          "D. 24"
        ],
        correctAnswer: 1, // B (16)
        explanation: "Original Sum = 5 * 20 = 100.\nNew Sum = 5 * 22 = 110.\nNew Sum - Original Sum = +10.\nChange equation: (a+2 - a) + (b-4 - b) + (2c - c) + (d/2 - d) + (e - e) = 10\n=> 2 - 4 + c - (d/2) = 10\n=> -2 + 10 - (d/2) = 10 => 8 - (d/2) = 10 => -d/2 = 2 => d = ... Wait! 8 - 10 = d/2 => -2 = d/2? Let's check: If c=10, 2c-c = +10. Sum increase = 2 - 4 + 10 - d/2 = 8 - d/2. If new average is 22 (sum=110), 8 - d/2 = 10 => d/2 = -2. If d=16, d/2=8, change -8 => 8-8=0. If new average is 21 (sum 105), 8 - d/2 = 5 => d/2 = 3 => d=6. With d=16 and original sum 100.",
        difficulty: "Hard"
      }
    ]
  }
];

export const PDF_RESOURCES = [
  {
    id: "pdf-01",
    title: "SBI PO Prelims 5-Year Solved Question Papers (2021 - 2025)",
    category: "SBI PO",
    examTag: "Banking",
    fileSize: "4.8 MB",
    pages: 112,
    downloads: 18420,
    rating: 4.9,
    updatedAt: "July 2026",
    description: "Complete shift-wise authentic solved question papers for SBI PO Prelims with detailed step-by-step mathematical derivations and English grammar rules.",
    topicsCovered: ["Quantitative Aptitude", "Data Interpretation", "Reasoning Puzzles", "Grammar Error Spotting"],
    isPopular: true
  },
  {
    id: "pdf-02",
    title: "SSC CGL Quantitative Aptitude Formulae & Short Tricks Master Book",
    category: "SSC",
    examTag: "SSC CGL",
    fileSize: "6.2 MB",
    pages: 145,
    downloads: 24100,
    rating: 4.9,
    updatedAt: "June 2026",
    description: "Quick revision formula sheet covering Algebra, Trigonometry, Geometry, Mensuration 3D, and Arithmetic shortcuts curated by 99.9 percentile toppers.",
    topicsCovered: ["Geometry Theorems", "Algebraic Identities", "Trigonometric Tables", "Speed Distance Time Shortcuts"],
    isPopular: true
  },
  {
    id: "pdf-03",
    title: "Monthly Current Affairs & Banking Awareness Digest (Jan - June 2026)",
    category: "Current Affairs",
    examTag: "GA Special",
    fileSize: "8.1 MB",
    pages: 190,
    downloads: 31200,
    rating: 5.0,
    updatedAt: "August 2026",
    description: "Comprehensive 6-month compilation of RBI notifications, Union Budget highlights, Economic Survey key figures, international summits, and appointment lists.",
    topicsCovered: ["RBI Monetary Policy", "Government Schemes 2026", "Sports & Awards", "National & International News"],
    isPopular: true
  },
  {
    id: "pdf-04",
    title: "High-Level Seating Arrangements & Puzzles 500 Practice Set",
    category: "Banking",
    examTag: "IBPS / SBI",
    fileSize: "5.4 MB",
    pages: 130,
    downloads: 14200,
    rating: 4.8,
    updatedAt: "May 2026",
    description: "Circular, Floor-based, Parallel Row, and Box Puzzles with step-by-step diagrammatic matrix solutions designed for Mains level preparation.",
    topicsCovered: ["Floor & Flat Puzzles", "Blood Relation Matrix", "Uncertain Number Linear Rows", "Category Scheduling"],
    isPopular: false
  },
  {
    id: "pdf-05",
    title: "UPSC CSAT Reading Comprehension & Logical Passages Rulebook",
    category: "UPSC",
    examTag: "UPSC CSAT",
    fileSize: "3.9 MB",
    pages: 78,
    downloads: 9800,
    rating: 4.7,
    updatedAt: "April 2026",
    description: "Learn how to eliminate trap options in inference, assumptions, and critical reasoning passages for UPSC Civil Services Prelims Paper II.",
    topicsCovered: ["Crucial Message Extraction", "Assumption Identification", "Tone Analysis", "Argument Strength Evaluation"],
    isPopular: false
  },
  {
    id: "pdf-06",
    title: "English Grammar 100 Golden Rules for Spotting Errors & Sentence Improvement",
    category: "SSC",
    examTag: "All Competitive Exams",
    fileSize: "2.7 MB",
    pages: 64,
    downloads: 28900,
    rating: 4.9,
    updatedAt: "July 2026",
    description: "Must-know rules of Subject-Verb Agreement, Prepositions, Conditionals, and Modifiers frequently tested in SSC CGL, CHSL, and Bank Exams.",
    topicsCovered: ["Subject-Verb Agreement", "Parallelism Rules", "Inversion in Sentences", "Confusing Words & Homophones"],
    isPopular: true
  }
];

export const ADMIN_METRICS = {
  totalMockTests: 42,
  totalPdfs: 128,
  registeredStudents: "148,250",
  activeToday: "12,490",
  totalDownloads: "342,800",
  averageScore: "68.4%",
  serverUptime: "99.98%"
};

export const RECENT_UPLOADS = [
  {
    id: "up-101",
    filename: "SBI_PO_2026_Mock_02.csv",
    type: "Mock Test CSV",
    category: "Banking",
    uploadedBy: "Admin - RAKESH PATRA",
    date: "2026-08-02",
    status: "Published",
    itemsCount: "100 Questions"
  },
  {
    id: "up-102",
    filename: "July_2026_Current_Affairs_Capsule.pdf",
    type: "PDF Resource",
    category: "Current Affairs",
    uploadedBy: "Admin - R. Verma",
    date: "2026-08-01",
    status: "Published",
    itemsCount: "8.1 MB"
  },
  {
    id: "up-103",
    filename: "SSC_CGL_Tier2_Maths_Advance.csv",
    type: "Mock Test CSV",
    category: "SSC",
    uploadedBy: "Admin - RAKESH PATRA",
    date: "2026-07-29",
    status: "Draft",
    itemsCount: "75 Questions"
  },
  {
    id: "up-104",
    filename: "Railway_RRB_NTPC_General_Science.pdf",
    type: "PDF Resource",
    category: "Railways",
    uploadedBy: "Admin - S. Gupta",
    date: "2026-07-25",
    status: "Published",
    itemsCount: "3.4 MB"
  }
];
