'use client'

import { useState } from "react"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {

            const res = await fetch(
                "http://localhost:8000/api/auth/login",
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            )

            const data = await res.json()

            if (!res.ok) {
                setMessage(data.message)
                return
            }

            setMessage("Login Successful")
            window.location.href='/exams'            

        } catch (error) {

            console.log(error)

            setMessage("Something went wrong")
        }
    }

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />

                <button type="submit">
                    Login
                </button>

            </form>

            <p>{message}</p>

        </div>
    )
}