import React, { useRef } from 'react';

const BASE_WIDTH = '100%';
const BASE_HEIGHT = '100%';

interface StageProps {
  children: React.ReactNode;
}

const Stage: React.FC<StageProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
