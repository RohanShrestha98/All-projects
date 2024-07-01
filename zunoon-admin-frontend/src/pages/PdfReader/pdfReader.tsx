/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiFullscreen, BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "./pdfReader.scss";
import toasts from "../../utils/toast";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfReader = ({ pdfUrl }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [search, setSearch] = useState(false);
  const [pageScale, setPageScale] = useState(1.0);

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

  const zoomOut = () => {
    setPageScale(pageScale * 0.9);
  };

  const zoomIn = () => {
    setPageScale(pageScale * 1.1);
  };

  return (
    <div className={`${pageScale > 1.0 ? "absolute z-[1000]" : "static"}`}>
      <div id="pdfView" className="pdfView">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={err => toasts.error(err?.toString())}
        >
          <Page
            customTextRenderer={textRenderer}
            pageNumber={pageNumber}
            canvasBackground="white"
            scale={pageScale}
          />
        </Document>
      </div>
      <div className=" h-12 bg-gray-16 flex justify-evenly items-center px-2">
        <AiOutlineMinus className="cursor-pointer" onClick={() => setPageScale(pageScale * 0.9)} />
        <div className="cursor-pointer px-[1px] text-xs" onClick={() => setPageScale(1.0)}>
          Adjust Zoom
        </div>
        <AiOutlinePlus className="cursor-pointer" onClick={() => setPageScale(pageScale * 1.1)} />
        <MdKeyboardArrowLeft
          size={20}
          className={`cursor-pointer ${pageNumber === 1 ? "fill-gray-dark2" : ""}`}
          onClick={handlePrevious}
        />
        <MdKeyboardArrowRight
          size={20}
          className={`cursor-pointer ${pageNumber === numPages ? "fill-gray-dark2" : ""}`}
          onClick={handleNext}
        />
        <div className="flex items-center">
          <div className="font-normal text-xs mr-2">Page</div>
          <input
            min={1}
            onChange={e => handleChange(e)}
            type="number"
            value={pageNumber}
            className="w-14 bg-gray-dark3"
          />
        </div>
        <BiSearch onClick={() => setSearch(!search)} />
        <BiFullscreen className="cursor-pointer" onClick={handleFullScreen} />
        <BsThreeDotsVertical />
      </div>
    </div>
  );
};

export default PdfReader;
