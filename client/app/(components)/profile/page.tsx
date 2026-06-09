'use client'

import { useEffect, useState } from "react"

interface UserProfile {
    _id: string
    username: string
    email: string
}

interface Submission {
    _id: string
    score: number
    totalQuestions: number
    createdAt: string
}

export default function Profile() {

    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [mocks, setMocks] = useState<Submission[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await fetch(
                    "http://localhost:8000/api/profile",
                    {
                        credentials: "include"
                    }
                )

                const data = await res.json()

                setProfile(data.userProfile)

                setMocks(data.userMock)

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)
            }
        }

        fetchProfile()

    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>

            <h1>Profile</h1>

            {profile && (
                <div>

                    <h2>{profile.username}</h2>

                    <p>{profile.email}</p>

                </div>
            )}

            <hr />

            <h2>My Mock Attempts</h2>

            {mocks.length === 0 ? (
                <p>No attempts yet</p>
            ) : (
                mocks.map((mock) => (
                    <div key={mock._id}>

                        <h3>
                            Score:
                            {" "}
                            {mock.score}
                            /
                            {mock.totalQuestions}
                        </h3>

                        <p>
                            Attempted:
                            {" "}
                            {new Date(
                                mock.createdAt
                            ).toLocaleDateString()}
                        </p>

                    </div>
                ))
            )}

        </div>
    )
}