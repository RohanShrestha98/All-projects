import { useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { HiOutlineArrowLeft } from "react-icons/hi"

const ScriptDesign =  (props) => {

    const [files, setFiles] = useState([])
    const inputRef = useRef()

    const handleBrowse = () => {
        inputRef.current.click()
    }

    const handleChange = (e) => {
         setFiles([...e.target.files])
    }

    return (
        
           <div className="flex flex-col gap-[25px]">
               <div className="bg-white rounded-md p-7">
                  <div className="mb-7 flex">
                  <NavLink  to={props.url} state={{subject: props.subject}} className="sm:inline hidden mr-2">
                    <HiOutlineArrowLeft/>
                 </NavLink>
                  <div className="font-bold text-[15px] uppercase">Script Design and Preparation</div>
                  </div>
                  <div className="font-semibold text-lg">Instructions:</div>
                  <div className="font-medium text-[15px] text-gray-dark">Today you will begin your preparations for the presentation in lesson 5. In the demonstrations in lesson 1 to 5 we use words, phrases and sentences that you have to write down and learn the best you can. It’s not necessary that you memorize all of them, but you can if you want to. At the end of these instructions you will find a list of words, phrases or sentences that correspond to lessons 1 to 5. Today’s assignment is to design your weekly presentation. The first thing you have to do is imagine a situation that you can dramatize in which you´ll use the words, phrases and sentences you’ve learned. You need to use your imagination and creativity. Invent something funny, fantastic, fictitious and even ridiculous if you want. We give you two examples below:
                  <br/>
                  <br/>
                  (1) You have been kidnapped by extraterrestrials and you’ve awakened in a dark room. You have to rely on your hearing, touch, sense of smell and taste to determine what is going on. Someone talks to you through a speaker, certain images are projected and you’re asked about the meaning of certain smells, flavors, sounds and textures and you have to tell them what it is you perceive.
                  <br/>
                  <br/>
                  (2) You’re in your house and there is an explosion. You wake up in a hospital and an FBI agent is next to you and starts asking you questions. You have to tell him what you saw, heard, felt with your hands and the smells you perceived before the explosion.
                   You must write your “script”. The script is a written version of a dramatization where each actor or actress has a part in which you assign each one something to say. You may design your script with a team of two or four people. You may use words or phrases in Spanish but try to use the most English you can. You may consult your tutor if you have any questions in regards to turning in your work. Try to be creative and to do more than what you’re asked.LIST OF WORDS, PHRASES AND SENTENCES IN LESSONS 1 TO 5: Hello, I need your help, please, what can I do for you?, what is your name, what is that?, he is a good friend, what is this?, it's a, pick it up, do you know who she is?, they are very wealthy, I do not know who she is</div>
               </div>
               <div>
                  <div className="font-semibold text-lg mb-2">Upload your Script</div>
                  <div className="font-medium text-[15px] text-gray-dark">Click the Browse button , choose a file and press the Save button.</div>
                  <div className="flex gap-4 my-4">
                    <input onChange={(e) => handleChange(e)} type="file" ref={inputRef} className="hidden"/>
                     <div onClick={() => handleBrowse()} className="w-40 h-9 cursor-pointer flex justify-center items-center rounded-[100px] border border-cyan bg-cyan-lighter text-cyan font-bold text-[16px]">
                        Browse
                     </div>
                     <div className={`w-40 h-9 cursor-pointer flex justify-center items-center rounded-[100px] border  text-white font-bold text-[16px] ${files?.length > 0 ? "bg-cyan" : "bg-gray-6"}`}>
                        Save
                     </div>
                  </div>
                  {files?.length > 0 && 
                  <a href={URL.createObjectURL(files[0])} target="_blank">
                    <div className="tracking-[0.01em] font-semibold text-lg underline text-cyan">View File</div>
                  </a>}
               </div>
           </div>
    )
}

export default ScriptDesign