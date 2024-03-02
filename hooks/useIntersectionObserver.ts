import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

const useIntersectionObserver = <T extends HTMLElement>(
  options: IntersectionObserverInit,
) => {
  const ref = useRef<T>(null);
  const inView = useSignal(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      inView.value = entries[0].isIntersecting;
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, inView] as const;
};

export default useIntersectionObserver;
