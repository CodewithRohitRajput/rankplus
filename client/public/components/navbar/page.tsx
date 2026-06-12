'use client'
import { button } from "framer-motion/client"
import { useEffect, useState } from "react"
import {useRouter} from "next/navigation"

export default function Navbar(){

  const[isLoggedin, setIsLoggedIn] = useState(false)
  const router = useRouter()
  
  useEffect(()=>{
    const handleLogin = async () => {
      const res = await fetch('http://localhost:8000/api/profile',{
        method: 'GET',
        credentials : "include"
      })
      const data = await res.json()
      if(data.userProfile.username){
        setIsLoggedIn(true)
      }
    }
    handleLogin()
  },[])
    
return(


      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-1.5 no-underline">
            <span className="font-display font-extrabold text-2xl text-slate-900">
              Exam<span className="text-blue-600">Plus</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          </a>
          <ul className="hidden md:flex gap-8 list-none m-0 p-0">
            {["Home", "Quizzes", "Papers", "Leaderboard"].map((item) => (
              <li key={item}>
                <a href={`${item.toLowerCase()}`} className="text-slate-500 text-sm font-medium no-underline hover:text-slate-900 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {
            isLoggedin ?

            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors font-display">
            Get Started Free
          </button>:

            <button onClick={()=>router.push('/login')} className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors font-display">
              Login
            </button>
          
          }

        </div>
      </nav>

)


}
    
