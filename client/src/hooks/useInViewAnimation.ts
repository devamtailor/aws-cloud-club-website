import { useEffect, useRef, useState } from "react";

export const useInViewAnimation = <T extends HTMLElement = HTMLDivElement>(threshold = 0.2) => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};
