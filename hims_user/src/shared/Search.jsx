/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { CrossSvg, SearchSvg } from "../../assets/";

export default function Search({
  placeholder,
  searchHandler,
  classname = "",
  disabled = false,
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search === "") searchHandler(""); // Not debounce when search is cleared
    const timerId = setTimeout(() => searchHandler(search), 500);

    return () => clearTimeout(timerId);
  }, [search, searchHandler]);

  return (
    <form className={`relative flex items-center ${classname}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        spellCheck="false"
        className="peer h-8 w-full rounded-md border border-gray-200 px-8 text-[13px] placeholder:text-grayText  focus:border-primary focus:outline-none disabled:pointer-events-none disabled:select-none"
        name="search"
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("search")?.click();
          }
        }}
      />
      {/* <SearchSvg className="absolute left-2.5 h-4 text-grayText peer-hover:text-blackText peer-focus:text-primary" /> */}
      {search ? (
        <button
          type="reset"
          className="absolute right-3 text-grayText peer-hover:text-blackText peer-focus:text-primary"
          onClick={() => setSearch("")}
        >
          {/* <CrossSvg className="h-6" /> */}
        </button>
      ) : null}
    </form>
  );
}
