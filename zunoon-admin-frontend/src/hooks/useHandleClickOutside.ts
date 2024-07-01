import { useEffect, RefObject } from "react";

const useHandleClickOutside = (
  wrapperRef: RefObject<HTMLElement>,
  props: { toggle: Function }
) => {
  useEffect(() => {
    // Alert if clicked on outside of element
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        props.toggle();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, props]);
};

export default useHandleClickOutside;
