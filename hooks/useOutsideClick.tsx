import { useEffect, useRef } from "react";

const useOutsideClick = (callback: (...args: any) => any) => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    const handleClick = (ev: any) => {
      if (ref.current && !ref.current.contains(ev.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
};

export default useOutsideClick;
