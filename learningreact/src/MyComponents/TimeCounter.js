import React, { useEffect, useState } from 'react'

export default function TimeCounter() {
    const[count , setCount]= useState(0)
    const[count1 , setCount1]= useState(0)
    const tick = ()=>{
        setCount(prevCount => prevCount + 1)
    }
    const tick1 = ()=>{
        setCount1(prevCount => prevCount + 1)
    }
    useEffect(()=>{
        const interval = setInterval(tick,1000)
        const interval1 = setInterval(tick1,100)
        return ()=>{
            clearInterval(interval)
            clearInterval(interval1)
        }
    },[])
  return (
    <div>
     <h1>{count}</h1> 
     <h1>{count1}</h1> 
    </div>
  )
}
