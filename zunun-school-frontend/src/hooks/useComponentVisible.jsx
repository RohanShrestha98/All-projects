import { useEffect } from "react";

export const useComponentVisible = (wrapperRef, props) => {
  useEffect(() => {
    // Alert if clicked on outside of element
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        props.toggle();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, props]);
};
