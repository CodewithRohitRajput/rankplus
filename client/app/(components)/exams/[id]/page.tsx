'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Question {
    question : string,
    options : string[],
    correctAnswer : string
}

interface mock {
    _id: string;
    title: string;
    subject: string;
    exam: string;
    description: string;
    isPaid: boolean;
    questions: Question[],
    price: number;
    duration: number;
}

export default function SingleMock(){
    const[mockTest, setMockTest] = useState<mock>()
    const [attempt, setAttempt] = useState(false)
    const [answers, setAnswers] = useState([])
    const [error, setError] = useState('')
    const params = useParams()
    const {id} =  params
    useEffect(()=>{
        const mock = async () => {
            const res = await fetch(`http://localhost:8000/api/quiz/getone/${id}`)
            const data = await res.json()
            setMockTest(data)
        }
        mock()
    },[])

const handleAttempt = () => {
    {!attempt ? setAttempt(true) : setError('already attempting') }
}

    return(
        <div>
           {mockTest && (

               <div>
                    <h1>{mockTest.title}</h1>
                    <h1>{mockTest.description}</h1>
                    <h1>{mockTest.price}</h1>
                    <button onClick={()=>{handleAttempt()}} >attempt</button>
                </div>
        
                )}
                <div>
                    {attempt? <>
                    {mockTest && (

                        mockTest.questions.map((mt,idx)=>(
                            <div>

                            <p>{mt.question}</p>

                            <select  onChange={(e)=>{
                                const newAnswers = [...answers];
                                newAnswers[idx] = Number(e.target.value);
                                setAnswers[newAnswers]
                            }} id="">
                                <option value="">Select answer</option>
                                    {mt.options.map((opt,idx)=>(
                                        <option key={idx} value={idx} >{opt}</option>
                                    ))}
                            </select>

                            </div>

                        ))
                    )}
                    </> : <></>}
                </div>
        </div>
    )
}