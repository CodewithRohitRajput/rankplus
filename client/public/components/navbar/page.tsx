'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const router = useRouter()

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Mock",
      href: "/exams",
    },
    {
      name: "PYQs",
      href: "/pyqs",
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
    },
    {
      name: "Profile",
      href: "/profile",
    },
  ]

  useEffect(() => {

    const checkLogin = async () => {

      try {

        const res = await fetch(
          "http://localhost:8000/api/profile",
          {
            method: "GET",
            credentials: "include",
          }
        )

        if (!res.ok) return

        const data = await res.json()

        if (data.userProfile?.username) {
          setIsLoggedIn(true)
        }

      } catch (error) {

        console.log(error)

      }

    }

    checkLogin()

  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        <Link
          href="/"
          className="flex items-center gap-1.5 no-underline"
        >
          <span className="font-display font-extrabold text-2xl text-slate-900">
            Rank<span className="text-blue-600">Plus</span>
          </span>

          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
        </Link>

        <ul className="hidden md:flex gap-8 list-none m-0 p-0">

          {navLinks.map((item) => (

            <li key={item.name}>

              <Link
                href={item.href}
                className="text-slate-500 text-sm font-medium no-underline hover:text-slate-900 transition-colors"
              >
                {item.name}
              </Link>

            </li>

          ))}

        </ul>

        {
          isLoggedIn ? (

            <button
              onClick={() => router.push("/profile")}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors font-display"
            >
              Get Started Free
            </button>

          ) : (

            <button
              onClick={() => router.push("/login")}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors font-display"
            >
              Login
            </button>

          )
        }

      </div>

    </nav>
  )
}