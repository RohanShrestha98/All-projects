import React,{useEffect, useState} from 'react'

export default function UseEffect() {
    const[count, setCount] = useState(0)
    useEffect(()=>{
        document.title = `You have clicked ${count} times`
    })

  return (
    <>
      <button onClick={e=>{setCount(count+1)}}>Count {count}</button>
    </>
  )
}
