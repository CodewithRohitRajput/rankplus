// app/pyqs/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Paper = {
  id: string;
  exam: string;
  year: string;
  title: string;
  subject: string;
  fileUrl: string;
  attempts: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

const papers: Paper[] = [
  {
    id: "1",
    exam: "JEE Main",
    year: "2024",
    title: "JEE Main 2024 (Jan Shift 1)",
    subject: "Physics",
    fileUrl: "/papers/jee-main-2024-jan-shift1-physics.pdf",
    attempts: "24.3k",
    difficulty: "Hard",
  },
  {
    id: "2",
    exam: "JEE Main",
    year: "2024",
    title: "JEE Main 2024 (Jan Shift 2)",
    subject: "Chemistry",
    fileUrl: "/papers/jee-main-2024-jan-shift2-chem.pdf",
    attempts: "18.7k",
    difficulty: "Hard",
  },
  {
    id: "3",
    exam: "JEE Advanced",
    year: "2023",
    title: "JEE Advanced 2023 Paper 1",
    subject: "Full Paper",
    fileUrl: "/papers/jee-advanced-2023-paper1.pdf",
    attempts: "11.8k",
    difficulty: "Hard",
  },
  {
    id: "4",
    exam: "JEE Advanced",
    year: "2023",
    title: "JEE Advanced 2023 Paper 2",
    subject: "Full Paper",
    fileUrl: "/papers/jee-advanced-2023-paper2.pdf",
    attempts: "9.2k",
    difficulty: "Hard",
  },
  {
    id: "5",
    exam: "NEET",
    year: "2024",
    title: "NEET UG 2024",
    subject: "Full Paper",
    fileUrl: "/papers/neet-2024.pdf",
    attempts: "31.2k",
    difficulty: "Hard",
  },
  {
    id: "6",
    exam: "NEET",
    year: "2023",
    title: "NEET UG 2023",
    subject: "Biology Focus",
    fileUrl: "/papers/neet-2023-bio.pdf",
    attempts: "27.5k",
    difficulty: "Medium",
  },
  {
    id: "7",
    exam: "BITSAT",
    year: "2024",
    title: "BITSAT 2024 (Session 1)",
    subject: "Full Paper",
    fileUrl: "/papers/bitsat-2024-session1.pdf",
    attempts: "15.3k",
    difficulty: "Medium",
  },
  {
    id: "8",
    exam: "VITEEE",
    year: "2024",
    title: "VITEEE 2024 (Slot 1)",
    subject: "Full Paper",
    fileUrl: "/papers/viteee-2024-slot1.pdf",
    attempts: "12.1k",
    difficulty: "Medium",
  },
  {
    id: "9",
    exam: "GATE CSE",
    year: "2024",
    title: "GATE CSE 2024",
    subject: "Full Paper",
    fileUrl: "/papers/gate-cse-2024.pdf",
    attempts: "9.4k",
    difficulty: "Hard",
  },
  {
    id: "10",
    exam: "SSC CGL",
    year: "2024",
    title: "SSC CGL 2024 Tier 1",
    subject: "Quantitative Aptitude",
    fileUrl: "/papers/ssc-cgl-2024-quant.pdf",
    attempts: "11.2k",
    difficulty: "Medium",
  },
];

const getDifficultyColor = (diff: string) => {
  switch (diff) {
    case "Hard":
      return "bg-red-50 text-red-700";
    case "Medium":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-green-50 text-green-700";
  }
};

export default function PYQsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState<string>("All");

  const examsList = ["All", ...new Set(papers.map((p) => p.exam))];

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = selectedExam === "All" || paper.exam === selectedExam;
    return matchesSearch && matchesExam;
  });

  const groupedPapers = filteredPapers.reduce((acc, paper) => {
    if (!acc[paper.exam]) acc[paper.exam] = [];
    acc[paper.exam].push(paper);
    return acc;
  }, {} as Record<string, Paper[]>);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">
            Previous Year Papers
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl">
            Real exam papers from the last 5 years — practice with actual questions and detailed solutions.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[73px] z-10 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {examsList.map((exam) => (
                <button
                  key={exam}
                  onClick={() => setSelectedExam(exam)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all font-display ${
                    selectedExam === exam
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-full border border-slate-200 bg-white text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {Object.entries(groupedPapers).map(([examName, examPapers], idx) => (
          <motion.div
            key={examName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-display text-2xl font-bold text-slate-900">{examName}</h2>
              <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
                {examPapers.length} papers
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {examPapers.map((paper, i) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + i * 0.03 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {paper.year}
                          </span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getDifficultyColor(paper.difficulty)}`}>
                            {paper.difficulty}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-slate-900 text-base leading-tight mb-1">
                          {paper.title}
                        </h3>
                        <p className="text-slate-500 text-sm">{paper.subject}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">attempts</div>
                        <div className="font-bold text-slate-700">{paper.attempts}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>PDF</span>
                      </div>
                      <a
                        href={paper.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View Paper
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {filteredPapers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No papers found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}