import { useEffect, useRef } from "react";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const state   = useRef({ rx: 0, ry: 0, mx: 0, my: 0, scale: 1, raf: 0 });

  useEffect(() => {
    const hoverable = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (!hoverable) return;

    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    const s = state.current;

    const onMove = (e: MouseEvent) => {
      s.mx = e.clientX;
      s.my = e.clientY;
      dot.style.transform = `translate(${s.mx}px,${s.my}px) translate(-50%,-50%)`;
    };

    const loop = () => {
      s.rx += (s.mx - s.rx) * 0.18;
      s.ry += (s.my - s.ry) * 0.18;
      if (ring) ring.style.transform = `translate(${s.rx}px,${s.ry}px) translate(-50%,-50%) scale(${s.scale})`;
      s.raf = requestAnimationFrame(loop);
    };

    const onEnter = () => { s.scale = 2.3; if (ring) ring.style.borderColor = "#e85c3a"; };
    const onLeave = () => { s.scale = 1;   if (ring) ring.style.borderColor = "rgba(244,240,232,0.4)"; };

    document.querySelectorAll("[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    s.raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(s.raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0, width: 34, height: 34,
          border: "1px solid rgba(244,240,232,0.4)", borderRadius: "50%",
          pointerEvents: "none", zIndex: 130, willChange: "transform",
          mixBlendMode: "difference", transition: "border-color .2s",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0, width: 5, height: 5,
          background: "#e85c3a", borderRadius: "50%",
          pointerEvents: "none", zIndex: 131, willChange: "transform",
        }}
      />
    </>
  );
}
