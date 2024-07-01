import React from "react";
import Sections from "./sections";
import { BsArrowLeft } from "react-icons/bs";
import './courses.css'

const Courses = () => {


  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <BsArrowLeft />
        <h3 className="font-bold text-xl">3D Design Illustration</h3>
      </div>
      <div className="">
        <Sections />
      </div>
    </>
  );
};

export default Courses;
