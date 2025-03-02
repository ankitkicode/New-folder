import { useEffect, useRef } from 'react';

const TextFlagCursor = ({ text = " Techeunoia International", color = "#000000", font = "monospace", textSize = 12, gap = 14, size = 3, element }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const hasWrapperEl = !!element;
    const cursorElement = hasWrapperEl || document.body;

    const fontFamily = `${textSize}px ${font}`;
    const charArray = [];
    let angle = 0;
    const radiusX = 2;
    const radiusY = 5;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const cursor = { x: width / 2, y: height / 2 };

    for (let i = 0; i < text.length; i++) {
      charArray.push({ letter: text.charAt(i), x: width / 2, y: height / 2 });
    }

    let canvas, context, animationFrame;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const init = () => {
      if (prefersReducedMotion.matches) {
        console.log("Prefers reduced motion enabled; cursor effect not initialized.");
        return;
      }

      canvas = document.createElement("canvas");
      context = canvas.getContext("2d");
      canvas.style.top = "0px";
      canvas.style.left = "0px";
      canvas.style.pointerEvents = "none";

      if (hasWrapperEl) {
        canvas.style.position = "absolute";
        cursorElement.appendChild(canvas);
        canvas.width = cursorElement.clientWidth;
        canvas.height = cursorElement.clientHeight;
      } else {
        canvas.style.position = "fixed";
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
      }

      bindEvents();
      loop();
    };

    const bindEvents = () => {
      cursorElement.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onWindowResize);
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      if (hasWrapperEl) {
        canvas.width = cursorElement.clientWidth;
        canvas.height = cursorElement.clientHeight;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const onMouseMove = (e) => {
      if (hasWrapperEl) {
        const boundingRect = cursorElement.getBoundingClientRect();
        cursor.x = e.clientX - boundingRect.left;
        cursor.y = e.clientY - boundingRect.top;
      } else {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }
    };

    const updateParticles = () => {
      if (!context) return;

      context.clearRect(0, 0, width, height);

      angle += 0.15;
      const locX = radiusX * Math.cos(angle);
      const locY = radiusY * Math.sin(angle);

      for (let i = charArray.length - 1; i > 0; i--) {
        charArray[i].x = charArray[i - 1].x + gap;
        charArray[i].y = charArray[i - 1].y;

        context.fillStyle = color;
        context.font = fontFamily;
        context.fillText(charArray[i].letter, charArray[i].x, charArray[i].y);
      }

      let x1 = charArray[0].x;
      let y1 = charArray[0].y;
      x1 += (cursor.x - x1) / 5 + locX + 2;
      y1 += (cursor.y - y1) / 5 + locY;
      charArray[0].x = x1;
      charArray[0].y = y1;
    };

    const loop = () => {
      updateParticles();
      animationFrame = requestAnimationFrame(loop);
    };

    const destroy = () => {
      canvas.remove();
      cancelAnimationFrame(animationFrame);
      cursorElement.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
    };

    const handleReducedMotionChange = () => {
      if (prefersReducedMotion.matches) {
        destroy();
      } else {
        init();
      }
    };

    prefersReducedMotion.addEventListener("change", handleReducedMotionChange);
    init();

    cursorRef.current = { destroy };

    return () => {
      if (cursorRef.current) {
        cursorRef.current.destroy();
      }
      prefersReducedMotion.removeEventListener("change", handleReducedMotionChange);
    };
  }, [text, color, font, textSize, gap, size, element]);

  return null;
};

export default TextFlagCursor;
