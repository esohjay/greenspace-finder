// import { useState, useEffect } from "react";

// type propType = {
//     element: React.RefObject<HTMLDivElement>
//     rootMargin: string
// }
// export const useIntersection = ({element, rootMargin}: propType) => {
//   const [isVisible, setState] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setState(entry.isIntersecting);
//       },
//       { rootMargin }
//     );

//     element.current && observer.observe(element.current);

//     return () => element.current && observer.unobserve(element.current);
//   }, []);

//   return isVisible;
// };
