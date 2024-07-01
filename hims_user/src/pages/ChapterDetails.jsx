/* eslint-disable react/prop-types */

import { Element } from "react-scroll";
import TextEditor from "../components/TextEditor";

export default function ChapterDetails({ index, index2, item }) {
  return (
    <Element name={item?.idx} key={index}>
      <div className="mb-8">
        <h1 className=" font-semibold text-blue-700 text-md ">
          {" "}
          {index + 1 + "."}
          {index2 !== -1 && <>{index2 + 1 + "."}</>}
          {item?.title}
        </h1>
        <div className=" overflow-auto no-scrollbar">
          <TextEditor value={item?.content} />
        </div>
      </div>
      {item?.sub_chapter?.map((item2, index2) => {
        return (
          <ChapterDetails
            key={index2}
            index={index}
            index2={index2}
            item={item2}
          />
        );
      })}
    </Element>
  );
}
