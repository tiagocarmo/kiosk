import React from 'react';
import { MinuLogo } from '../components/Shapes';

interface CoverSlideProps {
  monthLabel: string;
  backgroundColor?: string;
  title?: string;
}

const CoverSlide: React.FC<CoverSlideProps> = ({
  monthLabel,
  backgroundColor = '#00C800',
  title = 'TV CORPORATIVA',
}) => {
  return (
    <div className="w-full h-full flex flex-col relative p-16" style={{ backgroundColor }}>
      <div className="absolute top-12 right-12 text-2xl font-medium tracking-tight">
        {monthLabel}
      </div>

      <div className="mt-48">
        <h1 className="text-[5rem] font-medium leading-tight tracking-tight mb-8 opacity-90">
          {title}
        </h1>
        <div className="w-[800px]">
          <MinuLogo className="w-full h-auto" color="black" />
        </div>
      </div>
    </div>
  );
};

export default CoverSlide;
