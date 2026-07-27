import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function LiveNumber({ value, prefix = "", suffix = "", decimals = 0, duration = 1.4, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const committedRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const from = committedRef.current;
    const to = value;
    let raf;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min(Math.max((now - start) / (duration * 1000), 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        committedRef.current = to;
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
