import React from 'react'
import Header from '../../components/Header'
import teammember1 from "../../assets/teammember/teammember1.svg";
import teammember2 from "../../assets/teammember/teammember2.svg";
import teammember3 from "../../assets/teammember/teammember3.svg";
import teammember4 from "../../assets/teammember/teammember4.svg";
import teammember5 from "../../assets/teammember/teammember5.svg";
import TeamMember from '../../components/TeamMember';

export default function BOD() {
    const BODImages = [
        {
            id: 1,
            name: "Aadarsha Lamichhane",
            img: teammember1,
            positionName: "POSITION NAME",
            facebook : "www.facebook.com", 
            insta : "www.instagram.com", 
            linkedIn:"www.linkedIn.com" 
        },
        {
            id: 2,
            name: "Emery Gouse",
            img: teammember2,
            positionName: "POSITION NAME",
            facebook : "www.facebook.com", 
            insta : "www.instagram.com", 
            linkedIn:"www.linkedIn.com" 
        },
        {
            id: 3,
            name: "Kritartha KC",
            img: teammember3,
            positionName: "POSITION NAME",
            facebook : "www.facebook.com", 
            insta : "www.instagram.com", 
            linkedIn:"www.linkedIn.com" 
        },
        {
            id: 4,
            name: "Rohan Shrestha",
            img: teammember4,
            positionName: "POSITION NAME",
            facebook : "www.facebook.com", 
            insta : "www.instagram.com", 
            linkedIn:"www.linkedIn.com" 
        },
        {
            id: 5,
            name: "Kripa Thapa",
            img: teammember5,
            positionName: "POSITION NAME",
            facebook : "www.facebook.com", 
            insta : "www.instagram.com", 
            linkedIn:"www.linkedIn.com" 
        }
    ];
    return (
        <div className='px-32 flex flex-col gap-10'>
            <Header title={"Board of Directors"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"}/>
            <TeamMember data={BODImages} socials/>
        </div>
    )
}
