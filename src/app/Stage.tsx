import React, { useEffect, useState, useRef } from 'react';

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

interface StageProps {
  children: React.ReactNode;
}

const Stage: React.FC<StageProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const scaleX = windowWidth / BASE_WIDTH;
      const scaleY = windowHeight / BASE_HEIGHT;

      // Fit within viewport while maintaining aspect ratio (letterboxing if needed)
      // Or cover viewport if prefered? The requirement says "adjust automatically... preserving proportion".
      // Usually "contain" logic is safer for information displays so nothing gets cut off.
      const newScale = Math.min(scaleX, scaleY);

      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center w-full h-full bg-black overflow-hidden"
    >
      <div
        ref={containerRef}
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transformOrigin: 'center center',
        }}
        className="bg-[#FEFEF5] relative shadow-2xl overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
};

export default Stage;
