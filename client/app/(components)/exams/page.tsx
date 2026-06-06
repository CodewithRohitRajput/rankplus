'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
interface Quiz {
    _id: string;
    title: string;
    subject: string;
    exam: string;
    description: string;
    isPaid: boolean;
    price: number;
    duration: number;
}

export default function Exams(){
    const [mock, setMock] = useState<Quiz[]>([])
    const exams = [
  {
    id: 'jeem',
    name: "JEE MAINS"
  },
  {
    id: 'jeea',
    name: "JEE ADVANCE"
  },
  {
    id: 'neet',
    name: "NEET"
  },
  {
    id: 'upsc',
    name: "UPSC"
  },
  {
    id: 'ssc',
    name: "SSC"
  },
  {
    id: 'gate',
    name: "GATE"
  }
];
    useEffect(()=>{
        const getMocks = async () =>{
            const res = await fetch(`http://localhost:8000/api/quiz/getall`, {
                method : "GET"
            })
            const data = await res.json()
            if(res.ok){
                setMock(data)
            }
        }
        getMocks()
    },[])
    return (
        <div>

            {
                exams.map((exam)=>(
                    <div key={exam.id}>
                        <h1>{exam.name}</h1>
               

            {mock
            .filter((mockName)=>mockName.exam == exam.id)
            .map((m,idx)=>(
                
                <Link key={idx} 
                href={`exams/${m._id}`}
                 >
                    {m.title}

                
               
                </Link>
            ))}
            </div>

             ))
            }

        </div>
    );
}