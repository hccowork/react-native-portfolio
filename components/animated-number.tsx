"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  prefix?: string;
  suffix?: string;
  value: number;
};

export function AnimatedNumber({ prefix = "", suffix = "", value }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setHasStarted(true);
        observer.disconnect();
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const frame = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    const frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, value]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
