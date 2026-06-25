"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? window.scrollY / docH : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed", top: 0, left: 0, height: 2, width: "100%",
        background: "#e85c3a", transformOrigin: "0 50%", transform: "scaleX(0)",
        zIndex: 120, willChange: "transform",
      }}
    />
  );
}
