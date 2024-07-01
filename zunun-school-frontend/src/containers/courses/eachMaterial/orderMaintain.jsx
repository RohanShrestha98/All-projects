import React, { useState } from 'react'
import { GoArrowBoth } from 'react-icons/go'

const OrderMaintain = (props) => {

    const [draggedItem, setDraggedItem] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [start, setStart] = useState(-1)

    const words = [
        {
            content:"Norem ipsum , consectetur adipiscing elit. Nunc vulputate libero et",
            order:1
        },
        {
            content:"dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et",
            order:3
        },
        {
            content:" consectetur adipiscing elit. Nunc vulputate libero et",
            order:4
        },
        {
            content:"Norem ipsum dolor sit amet,  Nunc vulputate libero et",
            order:2
        }
    ]

    const handleDragENd = (e, word) => {
         setDraggedItem(prevState => [...prevState, word]) 
    }


    const handleDragEdit = (e, word) => {
        setStart(e.target.id)
    }

    const handleDragEnd = (e, word) => {
        
        if(start !== -1) {
            const dragged = draggedItem[e.target.id]
            draggedItem[e.target.id] = draggedItem[start]
            draggedItem[start] = dragged
        }
        setStart(-1)
    }

    const checkResults = () => {
        let correctNo = 0
        if(isChecked) {
            setDraggedItem([])
            props.checkResult(0, 0, false)
        } else {
            for(let i = 0; i < draggedItem.length; i++) {
              if(i+1 === draggedItem[i].order){
                correctNo = correctNo+1
              }
            }
            props.checkResult(correctNo, words.length - correctNo, true)
        }
        setIsChecked(!isChecked)
    }

    return (
        <div className='bg-white p-7 rounded-lg'>
           <div className="flex items-center font-medium text-[15px] mb-[17.26px]">
             <div className="w-[55%]">Words:</div>
             <div className="w-[45%]">Contents:</div>
           </div>
           <div className="flex">
             <div className="w-[55%] ">
               {words.map((word, id) => {
                return(
                    <div key={id} className='flex items-center'>
                    <div draggable={draggedItem?.length !== words?.length}
                    onDragEnd={(e) => handleDragENd(e, word)}
                    className={`w-[90%] mb-[17.26px] ${isChecked ? (draggedItem[id].order === id+1) ? "bg-light-green3" : "bg-red-4" : "bg-gray-lighter"} py-2 px-[10px] font-normal text-[13px]`}>
                      {word.content}
                    </div>
                    <div className='w-[10%] mx-[14px]'>
                    <GoArrowBoth/>
                    </div>
                    </div>
                )
               })}
             </div>
             <div className="w-[45%] "  >
             {draggedItem?.length > 0 && draggedItem.map((word, id) => {
                
                return(
                    <div draggable={draggedItem?.length === words?.length && !isChecked}  
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        if(draggedItem?.length === words?.length) {
                            handleDragEnd(e, word)}}
                    }
                    onDragStart={(e) => 
                        handleDragEdit(e, word)
                    }
                    id={id}
                    key={id} className={`mb-[17.26px] ${isChecked ? (draggedItem[id].order === id+1) ? "bg-light-green3" : "bg-red-4" : "bg-gray-lighter"} py-2 px-[10px] font-normal text-[13px]`}>
                      {word.content}
                    </div>
                )
               })}
             </div>
           </div>
           {draggedItem?.length === words?.length && <div onClick={checkResults} className='flex justify-center mt-[12.93px] cursor-pointer'>
                <div className='flex justify-center items-center text-white bg-cyan rounded-[100px] h-[43.16px] w-40'>{isChecked ? "Try Again" : "Find Out"}</div>
           </div>}
        </div>
    )
}

export default OrderMaintain