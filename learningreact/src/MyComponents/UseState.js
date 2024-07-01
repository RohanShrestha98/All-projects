import React, { useState } from "react";

export default function UseState() {
  // Counter using useState
  // const initialCount = 0
  // const [count,setCounter]= useState(initialCount)
  // changing value of input field when the data is object by useState
  // const [name,setName] = useState({firstName : "",lastName : ""})
  {/* Input and add some product by using useState hook */}
  // const [item,setItem]= useState([])
  // const [valuee,setValue]= useState([])
  // const addProduct = ()=>{
  //   setItem([
  //     ...item,
  //     {id : item.length,
  //     value : valuee}
  //   ])
  // }
  return (
    <div>
      {/*
        Counter using useState
         Count {count}
        <br />
        <button onClick={()=>{setCounter(count + 1)}}>Increment</button>
        <button onClick={()=>{setCounter(count - 1)}}>Decrement</button>
        <button onClick={()=>{setCounter(count + 5)}}>Increment 5</button>
        <button onClick={()=>{setCounter(initialCount)}}>Reset</button> */}
        {/* changing value of input field when the data is object by useState
        <input type="text" value={name.firstName} placeholder="Enter your first name" onChange={e=>setName({...name,firstName : e.target.value})}/>
        <input type="text" value={name.lastName} placeholder="Enter your first name" onChange={e=>setName({...name,lastName : e.target.value})}/>
        {JSON.stringify(name)} */}
        {/* Input and add some product by using useState hook */}
        {/* <input type="text" value={valuee} onChange={e=>setValue(e.target.value)}/>
        <button onClick={addProduct}>Add a product</button>
        <ul>
        {item && item.map(it=>(
          <li key={it.id}>{it.value}</li>
          ))}
        </ul> */}
    </div>
  );
}
