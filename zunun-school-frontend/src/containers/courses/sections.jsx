import React from "react";
import { FaPlayCircle, FaGamepad } from "react-icons/fa";
import { AiOutlineFilePdf, AiFillFilePdf } from "react-icons/ai";

const Sections = () => {
  return (
    <div className="flex flex-col w-full gap-4 py-8">
      <div className="flex flex-col gap-3 pr-32">
        <div className="flex justify-between">
          <p className=" text-gray-light">Section-1: Introduction</p>
          <p className="text-l text-blue-light order-last ">7 Mins</p>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-white p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">10 Mins</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <FaPlayCircle className="fill-blue text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">40 Mins</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <AiOutlineFilePdf className="fill-blue text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">1 Hrs</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <AiFillFilePdf className="fill-blue text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">30 Mins</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <FaGamepad className="fill-blue text-2xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pr-32">
        <div className="flex justify-between">
          <p className=" text-gray-light">Section-2: Explanation</p>
          <p className="text-l text-blue-light order-last ">17 Mins</p>
        </div>
        <div className="grid grid-cols-2 gap-4  ">
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">10 Mins</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <FaPlayCircle className="fill-blue text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">40 Mins</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <AiOutlineFilePdf className="fill-blue text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">1 Hrs</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <AiFillFilePdf className="fill-blue text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">30 Mins</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <FaGamepad className="fill-blue text-2xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pr-32">
        <div className="flex justify-between">
          <p className=" text-[#686868]">Section-3: Conclusion</p>
          <p className="text-l text-blue-light order-last ">27 Mins</p>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">10 Mins</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <FaPlayCircle className="fill-blue text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">40 Mins</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <AiOutlineFilePdf className="fill-blue text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">1 Hrs</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <AiFillFilePdf className="fill-blue text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-lg h-20 gap-4 flex items-center justify-center">
            <span className="flex-1/4 rounded-full bg-teal p-2 ml-5 text-blue-light">
              01
            </span>
            <div className="flex-1/2 flex-grow flex-col flex-start ">
              <p className="text-lg font-bold">Why Using 3D Blender</p>
              <p className="text-sm text-neutral-300">30 Mins</p>
            </div>
            <div className="flex-1/4 mr-7 ">
              <FaGamepad className="fill-blue text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sections;
