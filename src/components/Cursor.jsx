import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };

    const onOver = (e) => {
      if (e.target.closest("a, button, [data-cursor]")) cursor.classList.add("expanded");
    };
    const onOut = (e) => {
      if (e.target.closest("a, button, [data-cursor]")) cursor.classList.remove("expanded");
    };

    const animate = () => {
      const ease = 0.12;
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * ease;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * ease;
      cursor.style.left = smoothPos.current.x + "px";
      cursor.style.top = smoothPos.current.y + "px";
      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
