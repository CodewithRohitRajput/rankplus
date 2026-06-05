"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const toppers = [
  { rank: 1, name: "Aarush Singhal", state: "Chandigarh", percentile: 100 },
  { rank: 2, name: "Jonnala Roshan Manideep Reddy", state: "Andhra Pradesh", percentile: 100 },
  { rank: 3, name: "Shreyas Mishra", state: "Delhi (NCT)", percentile: 100 },
  { rank: 4, name: "Mantha Shiva Kamesh", state: "Telangana", percentile: 100 },
  { rank: 5, name: "Siddharth Shrikant Athaley", state: "Maharashtra", percentile: 100 },
  { rank: 6, name: "Narendrababu Gari Mahith", state: "Andhra Pradesh", percentile: 100 },
  { rank: 7, name: "Thunga Durga Suprabhath", state: "Andhra Pradesh", percentile: 100 },
  { rank: 8, name: "Arnav Gandhi", state: "Haryana", percentile: 100 },
  { rank: 9, name: "Shubham Kumar", state: "Bihar", percentile: 100 },
  { rank: 10, name: "Aditya Gupta", state: "Delhi (NCT)", percentile: 100 },
  { rank: 11, name: "Thammina Girish", state: "Tamil Nadu", percentile: 100 },
  { rank: 12, name: "Kabeer Chhillar", state: "Rajasthan", percentile: 100 },
];

const mockTests = {
  JEE: [
    { name: "JEE Main 2025 — Full Mock", questions: 90, hours: 3, attempts: "24,300", difficulty: "Hard" },
    { name: "JEE Advanced 2024 — Paper 1", questions: 54, hours: 3, attempts: "11,800", difficulty: "Hard" },
    { name: "JEE Main Jan 2024 — Shift 1", questions: 90, hours: 3, attempts: "19,400", difficulty: "Medium" },
  ],
  NEET: [
    { name: "NEET 2025 — Full Mock", questions: 180, hours: 3.5, attempts: "31,200", difficulty: "Hard" },
    { name: "NEET 2024 — Biology Block", questions: 60, hours: 1.5, attempts: "18,700", difficulty: "Medium" },
    { name: "NEET 2023 — Chemistry Focus", questions: 45, hours: 1, attempts: "14,300", difficulty: "Medium" },
  ],
  GATE: [
    { name: "GATE CSE 2025 — DS & Algo", questions: 65, hours: 3, attempts: "9,400", difficulty: "Hard" },
    { name: "GATE CSE 2024 — Full Paper", questions: 65, hours: 3, attempts: "12,100", difficulty: "Hard" },
    { name: "GATE CSE — Networks & OS", questions: 40, hours: 1.5, attempts: "7,800", difficulty: "Medium" },
  ],
  SSC: [
    { name: "SSC CGL 2025 — Quantitative", questions: 50, hours: 1, attempts: "11,200", difficulty: "Medium" },
    { name: "SSC CHSL 2024 — Full Mock", questions: 100, hours: 1, attempts: "8,600", difficulty: "Medium" },
    { name: "SSC MTS 2024 — General Awareness", questions: 40, hours: 0.75, attempts: "6,400", difficulty: "Easy" },
  ],
};

type ExamTab = keyof typeof mockTests;

const examCategories = [
  { name: "JEE Main", icon: "⚗️", questions: "2,400+", tag: "Engineering", color: "blue" },
  { name: "JEE Advanced", icon: "🔬", questions: "1,800+", tag: "Engineering", color: "blue" },
  { name: "NEET", icon: "🧬", questions: "3,100+", tag: "Medical", color: "green" },
  { name: "GATE", icon: "💻", questions: "1,600+", tag: "PG Admissions", color: "purple" },
  { name: "SSC", icon: "📋", questions: "800+", tag: "Government", color: "amber" },
  { name: "UPSC", icon: "🏛️", questions: "500+", tag: "Civil Services", color: "red" },
];

const features = [
  {
    icon: "📝",
    title: "Previous Year Papers",
    desc: "Practice real questions from actual exams. Understand patterns, difficulty, and important topics across all years.",
    tag: "10,000+ questions",
    color: "blue",
  },
  {
    icon: "🏆",
    title: "Live Leaderboards",
    desc: "Compete with students across India in real time. See your rank, track progress, and push yourself higher every day.",
    tag: "50K+ students",
    color: "amber",
  },
  {
    icon: "🎯",
    title: "Topic-Wise Quizzes",
    desc: "Focus on weak subjects. Targeted practice per chapter helps you improve exactly where it matters most.",
    tag: "500+ topics",
    color: "green",
  },
  {
    icon: "⚡",
    title: "Instant Analysis",
    desc: "Get your score breakdown immediately after every test. Detailed solutions with explanations for every question.",
    tag: "Detailed breakdown",
    color: "purple",
  },
];

const howItWorks = [
  { step: 1, icon: "🎯", title: "Choose Your Exam", desc: "Select from JEE, NEET, GATE, SSC, or UPSC. Pick a full mock or topic-wise quiz." },
  { step: 2, icon: "📝", title: "Attempt the Quiz", desc: "Solve real past-year questions under timed conditions, just like the actual exam." },
  { step: 3, icon: "⚡", title: "Get Instant Score", desc: "Detailed breakdown with correct answers, solutions, and topic-level analysis." },
  { step: 4, icon: "📈", title: "Track Your Rank", desc: "See how you compare with thousands of aspirants across India on live leaderboards." },
];

const testimonials = [
  { name: "Priya Sharma", exam: "JEE Main 2024", rank: "AIR 342", text: "ExamPlus PYQs were spot on. At least 30% of questions in my actual exam felt familiar. The leaderboard kept me competitive.", state: "Rajasthan" },
  { name: "Arjun Nair", exam: "NEET 2024", rank: "AIR 891", text: "The topic-wise quizzes helped me fix my weak spots in Organic Chemistry. Best platform for targeted practice.", state: "Kerala" },
  { name: "Sneha Reddy", exam: "GATE CSE 2024", rank: "AIR 156", text: "Solved every GATE paper from 2015 onwards on ExamPlus. The instant analysis showed me exactly where I was losing marks.", state: "Telangana" },
];

function getRankStyle(rank: number) {
  if (rank === 1) return { color: "#F59E0B", label: "🥇" };
  if (rank === 2) return { color: "#94A3B8", label: "🥈" };
  if (rank === 3) return { color: "#CD7F32", label: "🥉" };
  return { color: "#64748B", label: String(rank) };
}

function getDiffStyle(diff: string) {
  if (diff === "Hard") return "bg-red-50 text-red-800";
  if (diff === "Medium") return "bg-yellow-50 text-yellow-800";
  return "bg-green-50 text-green-800";
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ExamTab>("JEE");
  const [visibleToppers, setVisibleToppers] = useState<typeof toppers>([]);
  const tickerRef = useRef<HTMLDivElement>(null);
  const featuresView = useInView();
  const examsView = useInView();
  const howView = useInView();
  const testiView = useInView();

  useEffect(() => {
    setVisibleToppers([]);
    let i = 0;
    const iv = setInterval(() => {
      if (i >= toppers.length) { clearInterval(iv); return; }
      setVisibleToppers((p) => [...p, toppers[i]]);
      i++;
    }, 160);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .animate-ticker { animation: ticker 28s linear infinite; }
        .section-fade { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .section-fade.visible { opacity: 1; transform: translateY(0); }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-1.5 no-underline">
            <span className="font-display font-extrabold text-2xl text-slate-900">
              Exam<span className="text-blue-600">Plus</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          </a>
          <ul className="hidden md:flex gap-8 list-none m-0 p-0">
            {["Home", "Quizzes", "Papers", "Leaderboard", "Login"].map((item) => (
              <li key={item}>
                <a href="#" className="text-slate-500 text-sm font-medium no-underline hover:text-slate-900 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors font-display">
            Get Started Free
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-20 pb-0 text-center px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[420px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

        <motion.div initial={{ y: 6 }} animate={{ y: 0 }} transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-950 rounded-full text-xs font-bold px-3.5 py-1.5 mb-5 uppercase tracking-wider font-display shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
          India&apos;s #1 Exam Practice Platform
        </motion.div>

        <motion.h1 initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] text-slate-950 mb-5">
          Crack Your Exam.<br />
          <span className="text-blue-600">Practice Smarter.</span>
        </motion.h1>

        <motion.p initial={{ y: 8 }} animate={{ y: 0 }} transition={{ delay: 0.25 }}
          className="text-slate-700 text-lg max-w-xl mx-auto mb-5 leading-relaxed">
          10,000+ previous year questions, topic-wise quizzes, and live leaderboards for JEE, NEET, GATE and more.
        </motion.p>

        <motion.div initial={{ y: 6 }} animate={{ y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-7">
          {["JEE Main", "JEE Advanced", "NEET", "GATE", "SSC", "UPSC"].map((exam) => (
            <span key={exam} className="bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold px-3 py-1 rounded-full font-display shadow-sm">
              {exam}
            </span>
          ))}
        </motion.div>

        <motion.div initial={{ y: 8 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}
          className="flex justify-center gap-3 mb-12 flex-wrap">
          <button className="font-display bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all hover:-translate-y-0.5">
            ▶ Start Free Quiz
          </button>
          <button className="font-display bg-white text-slate-900 border-2 border-slate-200 px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-blue-500 hover:text-blue-600 transition-all hover:-translate-y-0.5">
            Browse Papers →
          </button>
        </motion.div>

        {/* Browser mockup */}
        <motion.div initial={{ y: 28 }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.65 }}
          className="max-w-5xl mx-auto relative z-10">
          <div className="bg-slate-100 border border-b-0 border-slate-200 rounded-t-xl px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
            </div>
            <div className="flex-1 bg-white border border-slate-200 rounded text-xs text-slate-400 px-3 py-1 text-left">
              examplus.in/dashboard
            </div>
          </div>

          <div className="border border-slate-200 rounded-b-xl overflow-hidden text-left">
            <div className="bg-slate-900 px-5 flex items-center justify-between h-12">
              <span className="font-display font-extrabold text-sm text-white">Exam<span className="text-blue-400">Plus</span></span>
              <div className="flex gap-5">
                {["Dashboard", "Quizzes", "Papers", "Leaderboard"].map((item, i) => (
                  <span key={item} className={`text-xs font-medium cursor-pointer ${i === 0 ? "text-white" : "text-slate-400"}`}>{item}</span>
                ))}
              </div>
              <button className="bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-md font-display">Start Quiz</button>
            </div>

            <div className="grid grid-cols-[1fr_300px]">
              {/* Left */}
              <div className="p-5 bg-white">
                <div className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1 font-display">Live Mock Tests</div>
                <h2 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight leading-tight mb-1.5">Rank Higher.<br />Practice Smarter.</h2>
                <p className="text-slate-500 text-sm mb-3 max-w-xs leading-relaxed">Real PYQs. Compete with 50,000+ students and track your rank live.</p>
                <div className="flex gap-2 mb-3">
                  <button className="font-display bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg">▶ Start Free Quiz</button>
                  <button className="font-display bg-white text-slate-900 border border-slate-200 text-xs font-semibold px-4 py-2 rounded-lg">Browse Papers</button>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <span className="text-xs text-slate-500"><strong className="text-slate-900">2,847 students</strong> currently attempting JEE Mock Test #12</span>
                </div>
                <div className="flex rounded-lg overflow-hidden border border-slate-200 mb-3 w-fit">
                  {(Object.keys(mockTests) as ExamTab[]).map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-3.5 py-1.5 text-xs font-bold border-r border-slate-200 last:border-r-0 transition-colors font-display ${activeTab === tab ? "bg-slate-900 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <AnimatePresence mode="wait">
                    {mockTests[activeTab].map((test, i) => (
                      <motion.div key={test.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ delay: i * 0.06 }}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex items-center justify-between hover:border-blue-400 transition-colors cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide font-display">{activeTab}</span>
                          <div>
                            <div className="text-xs font-bold text-slate-900 font-display">{test.name}</div>
                            <div className="text-[11px] text-slate-400">{test.questions} Qs · {test.hours}h · {test.attempts} attempts</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-display ${getDiffStyle(test.difficulty)}`}>{test.difficulty}</span>
                          <button className="font-display bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded">Start</button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right — leaderboard */}
              <div className="bg-slate-800 border-l border-slate-700 p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-display text-white font-extrabold text-sm">JEE 2025 Toppers</div>
                    <div className="text-slate-400 text-[11px]">Official NTA Results</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-green-400 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Live
                  </div>
                </div>
                <div className="flex gap-1.5 mb-3">
                  {["All India", "State", "100%ile"].map((f, i) => (
                    <button key={f} className={`font-display text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors ${i === 0 ? "bg-blue-500 text-white border-blue-500" : "bg-transparent text-slate-400 border-slate-600 hover:border-slate-400"}`}>{f}</button>
                  ))}
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="font-display text-[10px] text-slate-400 font-semibold pb-2 uppercase tracking-wide">#</th>
                      <th className="font-display text-[10px] text-slate-400 font-semibold pb-2 uppercase tracking-wide">Name</th>
                      <th className="font-display text-[10px] text-slate-400 font-semibold pb-2 uppercase tracking-wide text-right">%ile</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {visibleToppers.map((topper, idx) => {
                        if (!topper) return null;
                        const rs = getRankStyle(topper.rank ?? idx + 1);
                        return (
                          <motion.tr key={topper.rank ?? idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="border-t border-white/5 hover:bg-white/5 cursor-pointer">
                            <td className="py-1.5 pr-2 font-extrabold text-sm w-7" style={{ color: rs.color }}>{rs.label}</td>
                            <td className="py-1.5">
                              <div className="text-white text-xs font-medium leading-tight">{topper.name}</div>
                              <div className="text-slate-400 text-[10px]">{topper.state}</div>
                            </td>
                            <td className="py-1.5 text-right">
                              <span className="bg-green-500/15 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded font-display">{topper.percentile}</span>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-slate-800 border-t border-slate-700 py-2.5 overflow-hidden">
        <div ref={tickerRef} className="animate-ticker flex gap-10 whitespace-nowrap" style={{ width: "max-content" }}>
          {[...toppers, ...toppers].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-xs text-slate-400">
              <span className="text-amber-400 font-bold font-display">#{t.rank}</span>
              <span className="text-white font-semibold">{t.name}</span>
              <span>from {t.state}</span>
              <span className="text-green-400 font-bold font-display">{t.percentile}%ile</span>
              <span className="text-slate-600 mx-1">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="bg-slate-900 py-14 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-px bg-slate-700 rounded-xl overflow-hidden">
          {[["10K+","Questions"],["500+","Mock Tests"],["50K+","Students"],["6+","Exam Categories"],["24/7","Practice Anytime"]].map(([num, label]) => (
            <div key={label} className="bg-slate-900 px-6 py-8 text-center hover:bg-slate-800 transition-colors">
              <div className="font-display text-3xl font-extrabold text-white">
                {num.replace(/[+/7]/g, "")}<span className="text-amber-400">{num.includes("+") ? "+" : num.includes("/7") ? "/7" : ""}</span>
              </div>
              <div className="text-slate-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXAM CATEGORIES ── */}
      <section className="bg-slate-50 py-20 px-6">
        <div
          ref={examsView.ref}
          className={`max-w-6xl mx-auto section-fade ${examsView.inView ? "visible" : ""}`}
        >
          <div className="font-display text-blue-600 text-xs font-bold uppercase tracking-widest mb-2 text-center">Exam Categories</div>
          <h2 className="font-display text-4xl font-extrabold text-slate-900 text-center tracking-tight mb-2">Pick Your Exam</h2>
          <p className="text-slate-500 text-center mb-10 max-w-md mx-auto">Curated content for every major competitive exam in India.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {examCategories.map((exam, i) => (
              <motion.div
                key={exam.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="bg-white border-2 border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-400 hover:shadow-lg hover:shadow-blue-50 transition-all"
              >
                <div className="text-4xl mb-3">{exam.icon}</div>
                <div className="font-display font-bold text-slate-900 text-base">{exam.name}</div>
                <div className="text-slate-400 text-xs mt-1 mb-2">{exam.tag}</div>
                <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full font-display">{exam.questions} questions</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-white py-20 px-6">
        <div
          ref={featuresView.ref}
          className={`max-w-6xl mx-auto section-fade ${featuresView.inView ? "visible" : ""}`}
        >
          <div className="font-display text-blue-600 text-xs font-bold uppercase tracking-widest mb-2 text-center">Why ExamPlus</div>
          <h2 className="font-display text-4xl font-extrabold text-slate-900 text-center tracking-tight mb-2">Everything to rank higher</h2>
          <p className="text-slate-500 text-center mb-12 max-w-md mx-auto">Built specifically for Indian competitive exam aspirants.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="border-2 border-slate-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">{f.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-display font-bold text-slate-900 text-lg">{f.title}</h3>
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full font-display">{f.tag}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TESTS ── */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="font-display text-blue-600 text-xs font-bold uppercase tracking-widest mb-2 text-center">Trending Now</div>
          <h2 className="font-display text-4xl font-extrabold text-slate-900 text-center tracking-tight mb-2">Popular Tests</h2>
          <p className="text-slate-500 text-center mb-10 max-w-md mx-auto">Most attempted tests this week by students across India.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { exam: "JEE", name: "JEE Main 2025 — Full Mock", meta: "90 Questions · 3 Hours", attempts: "24,300", diff: "Hard", color: "bg-blue-50 text-blue-800" },
              { exam: "NEET", name: "NEET 2025 — Full Mock", meta: "180 Questions · 3.5 Hours", attempts: "31,200", diff: "Hard", color: "bg-yellow-50 text-yellow-800" },
              { exam: "GATE", name: "GATE CSE 2025 — DS & Algo", meta: "65 Questions · 3 Hours", attempts: "9,400", diff: "Hard", color: "bg-green-50 text-green-800" },
              { exam: "SSC", name: "SSC CGL 2025 — Quantitative", meta: "50 Questions · 1 Hour", attempts: "11,200", diff: "Medium", color: "bg-purple-50 text-purple-800" },
              { exam: "JEE", name: "JEE Advanced 2024 — Paper 1", meta: "54 Questions · 3 Hours", attempts: "11,800", diff: "Hard", color: "bg-blue-50 text-blue-800" },
              { exam: "NEET", name: "NEET 2024 — Biology Block", meta: "60 Questions · 1.5 Hours", attempts: "18,700", diff: "Medium", color: "bg-yellow-50 text-yellow-800" },
            ].map((test, i) => (
              <motion.div
                key={test.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white border-2 border-slate-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg font-display ${test.color}`}>{test.exam}</span>
                  <div>
                    <div className="font-display font-bold text-slate-900 text-sm">{test.name}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{test.meta} · <span className="text-slate-600 font-medium">{test.attempts} attempts</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded font-display ${getDiffStyle(test.diff)}`}>{test.diff}</span>
                  <span className="text-slate-300 group-hover:text-blue-500 text-lg transition-colors">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-20 px-6">
        <div
          ref={howView.ref}
          className={`max-w-6xl mx-auto section-fade ${howView.inView ? "visible" : ""}`}
        >
          <div className="font-display text-blue-600 text-xs font-bold uppercase tracking-widest mb-2 text-center">How It Works</div>
          <h2 className="font-display text-4xl font-extrabold text-slate-900 text-center tracking-tight mb-2">Start in 60 seconds</h2>
          <p className="text-slate-500 text-center mb-12 max-w-md mx-auto">No friction. Pick an exam, attempt, and track your growth instantly.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+0px)] w-full h-px bg-slate-200 z-0" style={{ width: "calc(100% - 2rem)", left: "calc(100% - 0.5rem)" }} />
                )}
                <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-center hover:border-blue-200 transition-all relative z-10">
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-display font-extrabold text-sm flex items-center justify-center mx-auto mb-3">{step.step}</div>
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <h3 className="font-display font-bold text-slate-900 text-sm mb-1.5">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-slate-50 py-20 px-6">
        <div
          ref={testiView.ref}
          className={`max-w-6xl mx-auto section-fade ${testiView.inView ? "visible" : ""}`}
        >
          <div className="font-display text-blue-600 text-xs font-bold uppercase tracking-widest mb-2 text-center">Student Stories</div>
          <h2 className="font-display text-4xl font-extrabold text-slate-900 text-center tracking-tight mb-2">Real results, real ranks</h2>
          <p className="text-slate-500 text-center mb-12 max-w-md mx-auto">Students who practiced on ExamPlus and cracked their exams.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border-2 border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-display font-bold text-xs flex items-center justify-center">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-display font-bold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-slate-400 text-xs">{t.state}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-green-600 text-sm">{t.rank}</div>
                    <div className="text-slate-400 text-xs">{t.exam}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-900 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-blue-600 opacity-10 blur-3xl pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10">
          <div className="font-display text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Get Started Today</div>
          <h2 className="font-display text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Ready to crack<br />your exam?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
            Join 50,000+ students already practicing on ExamPlus. It&apos;s free to start.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button className="font-display bg-amber-400 text-slate-900 px-9 py-4 rounded-xl font-bold text-base hover:bg-amber-300 transition-all hover:-translate-y-0.5">
              ▶ Start Free Quiz
            </button>
            <button className="font-display bg-transparent text-white border-2 border-slate-600 px-8 py-4 rounded-xl font-semibold text-base hover:border-slate-400 transition-all hover:-translate-y-0.5">
              Browse Papers →
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-5">No signup required · Free forever · 10,000+ questions</p>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 px-6 pt-14 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="font-display font-extrabold text-xl text-white">Exam<span className="text-blue-400">Plus</span></span>
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">India&apos;s most trusted platform for competitive exam preparation. Practice smarter, rank higher.</p>
            </div>
            {[
              { title: "Exams", links: ["JEE Main", "JEE Advanced", "NEET", "GATE", "SSC", "UPSC"] },
              { title: "Practice", links: ["Mock Tests", "Previous Papers", "Topic Quizzes", "Leaderboard"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="font-display font-bold text-white text-sm mb-3">{col.title}</div>
                <ul className="space-y-2 list-none p-0 m-0">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-slate-500 text-sm no-underline hover:text-white transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-xs">© 2026 ExamPlus. All rights reserved.</p>
            <p className="font-display text-slate-600 text-xs">Practice. Compete. Succeed.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}