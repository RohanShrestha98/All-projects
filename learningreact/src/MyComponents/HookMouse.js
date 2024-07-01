import React, { useEffect, useState } from 'react'

export default function HookMouse() {
    const [x,setX] = useState()
    const [y,setY] = useState()
    const logMousePosition = (e)=>{
        console.log("logMousePosition Called")
        setX(e.clientX)
        setY(e.clientY)
    }
    
    useEffect(()=>{
        window.addEventListener("mousemove",logMousePosition)
        return ()=>{
            console.log("Component will unmount")
        window.removeEventListener("mousemove",logMousePosition)
        }
    },[])
  return (

    <div>
      X - {x} Y - {y}
    </div>
  )
}
