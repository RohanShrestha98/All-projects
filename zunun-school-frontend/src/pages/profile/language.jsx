import React, { useState, useEffect } from "react";
import { Radio } from 'antd';
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { ShimmerCircularImage, ShimmerText, ShimmerTitle } from "react-shimmer-effects";
import LeftMenu from "../../containers/profile/leftMenu";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";

const LanguageSettings = () => {

  const [checked, setChecked] = useState("")

  const width = useWindowsDimensions()

  const { changeLayout } = useChangeLayout()

  const [initial, setInitial] = useState(true)

    useEffect(() => {
      setTimeout(() => {
        if(initial) {
          setInitial(false)
        }
      }, [500])
    }, [])

  useEffect(() => {
    changeLayout(width, false, false, "white")
  }, [width]) 

  const handleClick = (settings) => {
    localStorage.setItem("language", settings)
    setChecked(settings)
  }

  useEffect(() => {
    const lang = localStorage.getItem('language')
   if(lang !== undefined && lang !== null) {
    setChecked(lang)
   } else {
    setChecked("English(US)")
   }
  }, [])

    const EachSettings = (props) => {
        return (
            <div className="flex justify-between w-[70%] mb-7 language-radio sm:w-full">
                {initial ? <div className="w-32"><ShimmerText line={1}/></div> :<div className="font-semibold text-[16px] text-black-gray">{props.settings}</div>}
                {initial ? <ShimmerCircularImage size={20}/> :<Radio checked={props.checked} onClick={() => handleClick(props.settings)}/>}            </div>
        )
    }

        return (
            <div className="flex flex-col">
               {/* {!initial && <p className="font-bold text-3xl block sm:hidden md:pl-3">Profile</p>} */}
               <div className="flex gap-20 sm:block">
                  <div className="min-w-fit block sm:hidden">
                    <LeftMenu initial={initial}/>
                  </div>
                  <div className="w-[80%]   sm:ml-0 sm:mt-0 sm:w-full">
                    <div className="mb-7 px-6 flex items-center sm:fixed sm:top-0 sm:shadow-md sm:w-full sm:pt-[28px] sm:pb-3 sm:z-[1000] sm:bg-white">
                          {!initial &&<Link to="/profile"><HiOutlineArrowLeft className="cursor-pointer mr-[15px] hidden sm:inline" /></Link>}
                          {initial ? <div className="w-32"><ShimmerTitle line={1}/></div> : <div className="font-bold tracking-[0.03em] sm:text-black-gray  text-2xl sm:text-xl">Language</div>}
                      </div>
                    <div className="px-6 sm:mt-28">
                      {!initial && <div className="font-bold text-lg text-black-gray mb-9">Suggested</div>}
                      <EachSettings settings="English(US)" checked={checked === "English(US)" ? true : false}/>
                      <EachSettings settings="English(UK)" checked={checked === "English(UK)" ? true : false}/>
                      <EachSettings settings="English(Spanish)" checked={checked === "English(Spanish)" ? true : false}/>
                    </div>
                  </div>
               </div>
            </div>
          );
}

export default LanguageSettings