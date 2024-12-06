import { useEffect } from "react";

// Throttle function to limit execution
const throttle = (func: Function, delay: number) => {
  let lastTime = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      func(...args);
    }
  };
};

const MyComponent = () => {
  useEffect(() => {
    const dotcursor = document.querySelector(".dotcursor") as HTMLElement;
    if (!dotcursor) return;

    let mouseX = 0, mouseY = 0, isOffScreen = false;

    // Handle mouse movement with throttling
    const handleMouseMove = throttle((e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotcursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      const isMouseOffScreen = mouseX < 0 || mouseX > window.innerWidth || mouseY < 0 || mouseY > window.innerHeight;
      if (isMouseOffScreen !== isOffScreen) {
        isOffScreen = isMouseOffScreen;
        dotcursor.style.transition = isMouseOffScreen
          ? "background-color 0.4s ease-out"
          : "background-color 0.4s ease-out, transform 0.05s ease-out";
        dotcursor.offsetHeight; // Forces reflow
      }
    }, 8); // Throttled to 125Hz

    // Handle touch movement with throttling
    const handleTouchMove = throttle((e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        dotcursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`; // UX offset for finger obstruction
      }
    }, 8); // Throttled to 125Hz for touch as well

    const reveal = () => dotcursor.classList.add("show");
    const hide = () => dotcursor.classList.remove("show");

    document.body.addEventListener("mouseenter", reveal);
    document.body.addEventListener("mouseleave", hide);
    document.body.addEventListener("mousemove", handleMouseMove);

    // Touch events
    document.body.addEventListener("touchstart", (e: TouchEvent) => {
      reveal();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        dotcursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    });

    document.body.addEventListener("touchend", hide);
    document.body.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.body.removeEventListener("mouseenter", reveal);
      document.body.removeEventListener("mouseleave", hide);
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("touchstart", reveal);
      document.body.removeEventListener("touchend", hide);
      document.body.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      <a href="/Projects/" className="dotcursor"></a>
      <div></div>
    </>
  );
};

export default MyComponent;
