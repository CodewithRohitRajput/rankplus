export default function Footer(){
    return(
      
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
    )
}