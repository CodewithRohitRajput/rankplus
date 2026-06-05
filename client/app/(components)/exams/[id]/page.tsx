'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface mock {
    _id: string;
    title: string;
    subject: string;
    exam: string;
    description: string;
    isPaid: boolean;
    price: number;
    duration: number;
}

export default function SingleMock(){
    const[mockTest, setMockTest] = useState<mock>()
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
    return(
        <div>
           {mockTest && (

               <div>
                    {mockTest.title}
                    {mockTest.description}
                    {mockTest.price}
                </div>
        
                )}
        </div>
    )
}