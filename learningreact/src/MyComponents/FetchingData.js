import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function FetchingData() {
    const [post,setPost] = useState([])
    const [id,setId] = useState(1)
    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res=>{
            console.log(res)
            setPost(res.data)
        })
        .catch(error =>{
            console.log(error)
        })
    },[id])
  return (
    <div>
        <input value={id} onChange={e => setId(e.target.value)} />
        <div>{post.title}</div>
      {/* <ul>
        {
            post &&
            post.map(name=>(
                <li key={name.id}>{name.title}</li>
                ))
        }
      </ul> */}
    </div>
  )
}
