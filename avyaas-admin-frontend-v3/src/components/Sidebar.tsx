import { useEffect, useState } from "react"
import logo from '../assets/logo.svg'
import { useNavigate } from "react-router-dom"
import { IoIosLogOut, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import LogoutModal from "./LogoutModal";
// import { MdOutlineDashboard } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

import { FaUserGroup } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { HiBookOpen } from "react-icons/hi2";
import { PiListFill } from "react-icons/pi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdQuiz } from "react-icons/md";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa";
import { FaBookMedical } from "react-icons/fa6";
import { TbPackageExport } from "react-icons/tb";
import { PiShareFatFill } from "react-icons/pi";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { IoRadio } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { MdFeedback } from "react-icons/md";

import SideBarItems from "./SideBarItems";

export default function Sidebar({ hideSidebar, setHideSidebar }) {
  const [active, setActive] = useState(window.location.pathname)
  const [activeContent, setActiveContent] = useState(true);
  const [activeContentId, setActiveContentId] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    setActive(window.location.pathname)
  }, [window.location.pathname])

  const sideBarList = [
    {
      id: 1, title: "General", contents: [
        { id: 2, name: "Users", icon: <FaUserGroup />, link: "/users" },
        { id: 3, name: "Instructors", icon: <FaChalkboardTeacher />, link: "/instructors" },
      ]
    },
    {
      id: 2, title: "Content", contents: [
        { id: 4, name: "Course Groups", icon: <FaLayerGroup />, link: "/course-group" },
        { id: 5, name: "Courses", icon: <FaBook />, link: "/courses" },
        { id: 6, name: "Subjects", icon: <ImBooks />, link: "/subjects" },
        { id: 7, name: "Units", icon: <HiBookOpen />, link: "/units" },
        { id: 8, name: "Chapters", icon: <PiListFill />, link: "/chapters" },
        { id: 9, name: "Test Types", icon: <HiClipboardDocumentList />, link: "/test-type" },
        { id: 9, name: "Test Series", icon: <MdQuiz />, link: "/test-series" },
        { id: 9, name: "Tests", icon: <FaFileCircleQuestion />, link: "/test" },
        { id: 17, name: "Live Groups", icon: <IoRadio />, link: "/live-group" },
        { id: 18, name: "Lives", icon: <IoRadio />, link: "/live" },
        { id: 10, name: "Question Sets", icon: <FaFolder />, link: "/question-bank" },
        { id: 11, name: "Questions", icon: <FaBookMedical />, link: "/question" },
      ]
    },
    {
      id: 3, title: "Other", contents: [
        { id: 12, name: "Packages", icon: <TbPackageExport />, link: "/package" },
        { id: 13, name: "Referral Codes", icon: <PiShareFatFill />, link: "/referal-codes" },
        { id: 14, name: "Payment Logs", icon: <BsFillJournalBookmarkFill />, link: "/payment" },
        { id: 15, name: "Notifications", icon: <IoMdNotifications />, link: "/notification" },
        { id: 16, name: "Feedbacks", icon: <MdFeedback />, link: "/feedbacks" }
      ]
    }
  ]

  const handleActive = (item) => {
    setActive(item?.link)
    navigate(`${item?.link}`)
  }

  return (
    <div className="border-r h-full w-full flex flex-col ">
      <div className="flex items-center justify-between">
        <img onClick={() => {
          setActive("/")
          navigate("/")
        }} src={logo} alt="" className=" px-4 pt-4 pb-2 w-[120px]" />
        {/* <div className="w-8 h-8 rounded-full bg-red-500" onClick={() => setHideSidebar(!hideSidebar)}></div> */}
      </div>
      <div className="flex  flex-col gap-2 h-[84vh] overflow-auto no-scrollbar ">
        <div onClick={() => {
          setActive(`/`)
          navigate(`/`)
        }}
          className={`flex  px-4 py-[2px] font-medium items-center  gap-2 
                  ${"/" === active ? "text-[#4365A7] cursor-default border-l-4 border-[#4365A7]"
              : "text-[#333333] border-l-4 border-transparent cursor-pointer hover:text-[#4365A7]"}`}>
          <div className="text-lg"><MdDashboard /></div>
          {
            !hideSidebar && <div className="line-clamp-1 font-semibold">Dashboard</div>
          }
        </div>
        {sideBarList?.map((items) => {
          return (
            <div key={items?.id} className="flex flex-col gap-2 ">
              <div onClick={() => {
                setActiveContentId(items?.id)
                setActiveContent(true)
              }}
                className="flex items-center justify-between  text-sm text-[#696969] leading-5 py-1 px-5 uppercase cursor-pointer">
                <p>{items?.title}</p>
              </div>
              {
                items?.contents?.map((item) => {
                  return (
                    <SideBarItems
                      item={item}
                      handleActive={handleActive}
                      active={active}
                      hideSidebar={hideSidebar}
                    />
                  )
                })
              }
            </div>
          )
        })}
      </div>
      <LogoutModal asChild>
        <div onClick={() => { }} className={`flex  px-4 py-[2px] font-medium items-center  gap-2 text-red-600  mt-4  border-l-4 border-transparent cursor-pointer `}>
          <div className="text-lg"><IoIosLogOut /></div>
          {
            !hideSidebar && <div className="line-clamp-1">Logout</div>
          }
        </div>
      </LogoutModal>
    </div>
  )
}
