import { useEffect } from "react";

export const useSwipeGestureAi = (onSwipeLeft) => {
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;

      handleGesture();
    };

    const handleGesture = () => {
      const deltaX = touchEndX - touchStartX;

      if (deltaX < -50) {
        onSwipeLeft(); // Swiped right
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft]);
};
