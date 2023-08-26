import { useState, useEffect, useRef } from "react";

type propType = {
  element: React.RefObject<HTMLDivElement>;
  rootMargin: string;
};
export const useIntersection = (
  element: React.RefObject<HTMLDivElement>,
  rootMargin: string
) => {
  const [isVisible, setState] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    element.current && observer.current.observe(element.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [element, rootMargin]);

  return isVisible;
};
