'use client'

import { useState } from "react"

export default function Signup() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        try {

            const res = await fetch(
                "http://localhost:8000/api/auth/signup",
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username,
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

            setMessage("Signup Successful")

            setUsername("")
            setEmail("")
            setPassword("")

        } catch (error) {

            console.log(error)

            setMessage("Something went wrong")
        }
    }

    return (
        <div>

            <h1>Signup</h1>

            <form onSubmit={handleSignup}>

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br />

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
                    Signup
                </button>

            </form>

            <p>{message}</p>

        </div>
    )
}