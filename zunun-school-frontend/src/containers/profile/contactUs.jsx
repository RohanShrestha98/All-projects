import React from "react"
import { BsHeadphones, BsFacebook, BsGlobe, BsWhatsapp, BsTwitter, BsInstagram } from "react-icons/bs"
import { Link } from "react-router-dom"

const ContactUs = () => {
    const items = [
        {
            item:"Customer Service",
            itemImg:<BsHeadphones  className="w-5 h-[20.86px] fill-cyan"/>,
            to:"/customerService"
        },
        {
            item:"Whatsapp",
            itemImg:<BsWhatsapp  className="w-5 h-[20.86px] fill-cyan"/>
        },
        {
            item:"Website",
            itemImg:<BsGlobe  className="w-5 h-[20.86px] fill-cyan"/>
        },
        {
            item:"Facebook",
            itemImg:<BsFacebook  className="w-5 h-[20.86px] fill-cyan"/>
        },
        {
            item:"Twitter",
            itemImg:<BsTwitter  className="w-5 h-[20.86px] fill-cyan"/>
        },
        {
            item:"Instagram",
            itemImg:<BsInstagram  className="w-5 h-[20.86px] fill-cyan"/>
        },
    ]
    
    return (
        <div className="mt-7">
         {
            items.map((item, id) => {
                return (
                   <Link to={item.to} key={id}>
                   <div className="flex items-center h-[72px] pl-5 bg-white mb-6 rounded-[20px]">
                     {item.itemImg}
                     <div className="ml-5 text-black-gray font-bold text-lg">{item.item}</div>
                   </div>
                   </Link>
                )
            })
          }
        </div>
    )
}

export default ContactUs