import React, { useState } from 'react'
import HookMouse from './HookMouse'

export default function MouseArea() {
    const[display,setDisplay]= useState(true)

  return (
    <>
    <button onClick={()=>{setDisplay(!display)}} >
      Display
    </button>
    {display && <HookMouse/>}
    </>
  )
}
