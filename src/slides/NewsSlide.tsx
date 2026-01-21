import React from 'react';
import { ArchShape } from '../components/Shapes';

interface NewsSlideProps {
  title: string;
  monthLabel: string;
  bullets: string[];
  themeColor?: string;
}

const NewsSlide: React.FC<NewsSlideProps> = ({
  title,
  monthLabel,
  bullets,
  themeColor = '#ff66b2', // Hot pink default
}) => {
  return (
    <div className="w-full h-full relative bg-[#FEFEF5] flex overflow-hidden p-16">
      <div className="w-1/2 flex flex-col pt-8">
        <h2 className="text-6xl font-bold uppercase mb-16 tracking-tight text-black">
          {title}
        </h2>

        <div className="space-y-8 pl-4">
          {bullets.map((bullet, idx) => (
            <div key={idx} className="text-3xl font-medium tracking-wide text-gray-800 uppercase">
              {bullet}
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/2 relative h-full flex justify-center items-end">
        <div className="absolute top-0 right-0 text-3xl font-bold">
            {monthLabel}
        </div>
        <div className="h-[90%] w-full flex justify-center items-end relative">
             <ArchShape color={themeColor} className="h-full w-auto" />
        </div>
      </div>
    </div>
  );
};

export default NewsSlide;