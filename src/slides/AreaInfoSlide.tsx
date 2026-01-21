import React from 'react';
import { WavyLine } from '../components/Shapes';

interface AreaInfoSlideProps {
  title: string;
  bodyText: string;
  themeColor?: string;
}

const AreaInfoSlide: React.FC<AreaInfoSlideProps> = ({
  title,
  bodyText,
  themeColor = '#87ceeb',
}) => {
  return (
    <div className="w-full h-full relative bg-[#FEFEF5] flex overflow-hidden">
      {/* Left Text Content */}
      <div className="w-1/2 p-16 flex flex-col justify-center">
        <h2 className="text-7xl font-bold uppercase mb-12 tracking-tight">
          {title}
        </h2>
        <div className="text-3xl font-medium leading-relaxed uppercase text-gray-800 break-words whitespace-pre-line">
          {bodyText}
        </div>
      </div>

      {/* Right Graphic Content */}
      <div
        className="w-1/2 h-full relative flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: themeColor }}
      >
        {/* A stylized graphic using the WavyLine but thicker/black as per screenshot */}
        <div className="absolute h-[130%] scale-150 rotate-90">
          <WavyLine color="black" className="h-full w-auto" />
        </div>
      </div>
    </div>
  );
};

export default AreaInfoSlide;
