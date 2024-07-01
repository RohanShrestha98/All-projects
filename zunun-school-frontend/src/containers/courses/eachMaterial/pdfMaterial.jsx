import React, { useState, useCallback } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import pdfFile from "/DSA_CompleteNotes.pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiFullscreen, BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Input } from "antd";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import { Viewer } from '@react-pdf-viewer/core';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfMaterial = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [search, setSearch] = useState(false);
  const [active, setActive] = useState(data?.book1?.url);
  const [pageScale, setPageScale] = useState(1.0);

  const width = useWindowsDimensions();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const handlePrevious = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber !== numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleChange = e => {
    setPageNumber(parseInt(e.target.value));
  };

  const handleFullScreen = () => {
    var elem = document.getElementById("pdfView");
    elem.requestFullscreen();
  };

  function highlightPattern(text, pattern) {
    return text.replace(pattern, value => `<mark>${value}</mark>`);
  }

  const textRenderer = useCallback(
    textItem => highlightPattern(textItem.str, searchedText),
    [searchedText],
  );

  // const zoomOut = () => {
  //   setPageScale(pageScale * 0.9);
  // };

  // const zoomIn = () => {
  //   setPageScale(pageScale * 1.1);
  // };

  return (
    <div className={`${pageScale > 1.0 ? "absolute z-[1000]" : "static"}`}>
      <div
        id="pdfView"
        className="flex justify-center h-[480px] w-full overflow-y-auto bg-white"
      >
        {/* <Document
          file={data?.book1?.url ?? active}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={err => console.error(err)}
        >
          <Page
            id="pdf"
            customTextRenderer={textRenderer}
            pageNumber={pageNumber}
            canvasBackground="white"
            width={width > 780 ? width * 0.37 : width}
            scale={pageScale}
          />
        </Document> */}
        {/* <div className="pdf-viewer"> */}

                <Viewer fileUrl={data?.book1?.url ?? active} />
              </div>
      {/* </div> */}
      {/* <div className=" h-12 bg-gray-16 flex justify-evenly items-center px-2">
        <AiOutlineMinus
          className="cursor-pointer"
          onClick={() => setPageScale(pageScale * 0.9)}
        />
        <div
          className="cursor-pointer px-[1px] text-xs"
          onClick={() => setPageScale(1.0)}
        >
          Adjust Zoom
        </div>
        <AiOutlinePlus
          className="cursor-pointer"
          onClick={() => setPageScale(pageScale * 1.1)}
        />
        <MdKeyboardArrowLeft
          size={20}
          className={`cursor-pointer ${
            pageNumber === 1 ? "fill-gray-dark2" : ""
          }`}
          onClick={handlePrevious}
        />
        <MdKeyboardArrowRight
          size={20}
          className={`cursor-pointer ${
            pageNumber === numPages ? "fill-gray-dark2" : ""
          }`}
          onClick={handleNext}
        />
        <div className="flex items-center">
          <div className="font-normal text-xs mr-2">Page</div>
          <input
            min={1}
            onChange={e => handleChange(e)}
            type="number"
            value={pageNumber}
            className="w-14 bg-gray-16"
          />
        </div>
        {search && (
          <Input
            className="w-40"
            value={searchedText}
            onChange={e => setSearchedText(e.target.value)}
          />
        )}
        <BiSearch onClick={() => setSearch(!search)} />
        <BiFullscreen className="cursor-pointer" onClick={handleFullScreen} />
        <BsThreeDotsVertical />
      </div> */}
      <div className="flex gap-3 mb-2">
        <p
          className={`cursor-pointer font-semibold ${
            active === data?.book1?.url && "text-cyan"
          }`}
          onClick={() => setActive(data?.book1?.url)}
        >
          Book 1
        </p>
        {data?.book2?.url && (
          <p
            className={`cursor-pointer font-semibold ${
              active === data?.book2?.url && "text-cyan"
            }`}
            onClick={() => setActive(data?.book2?.url ?? data?.book1?.url)}
          >
            Book 2
          </p>
        )}
        {data?.book3?.url && (
          <p
            className={`cursor-pointer font-semibold ${
              active === data?.book3?.url && "text-cyan"
            }`}
            onClick={() => setActive(data?.book3?.url ?? data?.book1?.url)}
          >
            Book 3
          </p>
        )}
      </div>
    </div>
  );
};

export default PdfMaterial;
