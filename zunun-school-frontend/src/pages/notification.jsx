import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShimmerSectionHeader, ShimmerTitle } from 'react-shimmer-effects'
import useWindowsDimensions from "../components/customHooks/windowsDimesnions";
import useChangeLayout from "../components/customHooks/changeLayout";
import { HiOutlineArrowLeft, HiOutlineDotsCircleHorizontal } from "react-icons/hi";

const NotificationDisplay = () => {

const [initial, setInitial] = useState(true)
const width = useWindowsDimensions()
const { changeLayout } = useChangeLayout()

useEffect(() => {
  setTimeout(() => {
    if(initial) {
      setInitial(false)
    }
  }, [200])
}, [])

useEffect(() => {
     changeLayout(width, false, false, "white")
}, [width])

const NotificationCard = (props) => {
  if(initial) {
    return (
      <div className="bg-white px-7 pt-3 pb-1 mt-4 rounded-[15px]">
      <ShimmerSectionHeader
      center={false}
      />
      </div>
    )
  } else {
    return (
      <NavLink to="/">
        <div className="bg-white rounded-[15px] mt-4 px-7 py-[25px] shadow-md">
          
              <div className="font-bold text-lg mb-2">{props.title}</div>
              <div className="font-medium text-[15px] text-gray-1">{props.description}</div>
           
        </div>
      </NavLink>
  )
  }
}

  return (
    <div className="h-full w-[100%]">
      <div className="sm:bg-white sm:shadow-md sm:fixed sm:z-[1000] sm:top-0 sm:sm:w-full sm:pb-3 sm:pt-[28px] md:px-6">
      {!initial && <div className="flex items-center justify-between font-bold text-2xl sm:text-xl">
          <div className="flex items-center">
            <NavLink to="/" className="mr-[15px] hidden sm:inline">
              <HiOutlineArrowLeft/>
            </NavLink>
            <div>Notifications</div>
          </div>
          <HiOutlineDotsCircleHorizontal className="hidden sm:inline"/>
        </div>}
        </div>
        <div className="md:px-6 sm:pt-24">
      {initial ? <div className="w-32"><ShimmerTitle /></div> : 
        
        <div className="font-semibold text-[16px] text-black-gray mt-7 sm:mt-0">Today</div>
      }
      <NotificationCard title="Payment Successful" description="You have made a course payment" />
      <NotificationCard title="Payment Successful" description="You have made a course payment" />
      {initial ? <div className="w-32"><ShimmerTitle line={1} className="mt-7"/></div> : 
      <div className="font-bold text-lg text-black-gray mt-7">Yesterday</div>
      }
      <NotificationCard title="Payment Successful" description="You have made a course payment" />
      <NotificationCard title="Payment Successful" description="You have made a course payment" />
    </div>
    </div>
  );
};

export default NotificationDisplay
