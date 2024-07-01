import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({
  label,
  value,
  onChange,
  placeholder,
  errorMessage = "",
  theme = "snow",
  readOnly,
  showBorder,
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-grow flex-col-reverse gap-2">
        <ReactQuill
          readOnly={readOnly}
          theme={theme}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline"],
              ["link", "image", "video"],
              [{ list: "ordered" }, { list: "bullet" }],
            ],
          }}
          className={`h-full ${showBorder ? "" : "border-none"}`}
        />
        <label className="font-medium md:text-xs">{label}</label>
      </div>
      {errorMessage ? (
        <div className={`text-xs italic text-danger`}>{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default TextEditor;
