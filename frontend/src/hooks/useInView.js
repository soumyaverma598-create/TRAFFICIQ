import { useEffect, useRef, useState } from "react";

// Minimal IntersectionObserver hook: returns a ref to attach and a
// boolean that flips to true once the element enters the viewport.
// Used by every scroll-triggered section (How It Works, Key Features,
// Technology Stack) so their card grids animate in only when actually
// visible, not immediately on page load.
export function useInView({ threshold = 0.2, triggerOnce = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return [ref, inView];
}