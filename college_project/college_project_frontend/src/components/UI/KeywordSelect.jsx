/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";

export default function KeywordSelect(props) {
  const { tags, setTags, title, ...rest } = props;

  const [error, setError] = useState("");

  useEffect(() => {
    if (tags && tags.length > 0) {
      setError("");
    }
  }, [tags, tags?.length]);

  const handleTags = (e) => {
    if (e.code === "Enter" || (e.code === "Space" && e.target.value !== "")) {
      let trimmmedTags = [...tags, e.target.value];
      trimmmedTags = trimmmedTags.map((el) => el.trim());
      setTags(trimmmedTags);
      e.target.value = "";
    } else if (
      e.code === "Backspace" &&
      tags.length > 0 &&
      (e.target.value === "" || e.target.value === 0)
    ) {
      const tagsCopy = [...tags];
      tagsCopy.pop();
      setTags(tagsCopy);
    } else if (tags.length < 1 && e.code === "Backspace") {
      setError("Since there is no tags you can't able to delete any tags");
    } else if (e.target.value === "" && e.code === "Space") {
      setError("The tag should be one character long!");
    }
  };

  const removeTags = (index) => {
    const tagsCopy = [...tags];
    tagsCopy.splice(index, 1);
    setTags(tagsCopy);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="mt-6">
      <h1 className="font-medium text-lg ml-2">{title}</h1>
      <div className="border flex flex-wrap gap-4 mt-2 bg-white px-3 py-2 rounded-md">
        {tags?.map((tag, index) => (
          <div
            className="flex gap-2 px-2 rounded items-center bg-slate-300"
            key={index}
          >
            {tag}
            <div className="close-icon" onClick={() => removeTags(index)}>
              <MdClear />
            </div>
          </div>
        ))}
        <input
          type="text"
          onKeyPress={handleKeyPress}
          className="outline-none w-96  bg-white"
          placeholder='Press "Space or Enter" key to add tags and "Backspace" to remove tags'
          {...rest}
          onKeyDown={(e) => {
            handleTags(e);
          }}
        />
      </div>
      {error && (
        <p style={{ position: "relative", fontSize: "1rem", color: "#e91e63" }}>
          {error}
        </p>
      )}
    </div>
  );
}
