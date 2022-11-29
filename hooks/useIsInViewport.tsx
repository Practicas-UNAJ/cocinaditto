import { useEffect, useState } from "react";

const useIsInViewport = (
  element: React.MutableRefObject<any>,
  options?: IntersectionObserverInit
) => {
  const [visible, setVisible] = useState(false);

  const checkVisibility: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(checkVisibility, options);

    if (element.current) observer.observe(element.current);

    return () => {
      if (element.current) observer.unobserve(element.current);
    };
  }, [element, options]);

  return {
    visible,
  };
};

export default useIsInViewport;
