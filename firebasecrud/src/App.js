import { useEffect, useState } from "react";
import { db } from "./firebase-config";
import {collection, getDocs} from "firebase/firestore"
function App() {
  const [user,setUser]= useState([])
  const userCollectionRef = collection(db,"user")
  useEffect(()=>{
    const getUsers = async()=>{
      const data = await getDocs(userCollectionRef)
      setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    getUsers()
  },[])
  return (
    <div className="App">
      {
        user.map((users)=>{
          return(
          <div>
            <h1>Name : {users.name}</h1>
            <h1>Age : {users.age}</h1>
          </div>)

          
        })
      }
    </div>
  );
}

export default App;
