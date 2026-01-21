import React from 'react';
import { WavyLine, MinuLogo } from '../components/Shapes';
import { cn } from '../lib/utils';

interface BirthdaySlideProps {
  title: string;
  personName: string;
  area: string;
  dateLabel: string;
  photoAsset?: string;
}

const BirthdaySlide: React.FC<BirthdaySlideProps> = ({
  title,
  personName,
  area,
  dateLabel,
  photoAsset,
}) => {
  return (
    <div className="w-full h-full relative bg-[#FEFEF5] flex overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 flex flex-col pt-12 pl-12 relative z-10">
        {/* Header Bar */}
        <div className="bg-[#1a73e8] text-white py-4 px-8 w-fit min-w-[600px] mb-20 shadow-sm">
          <h2 className="text-6xl font-bold uppercase tracking-wide">{title}</h2>
        </div>

        {/* Person Card */}
        <div className="ml-32 w-[400px] bg-gray-200 shadow-xl flex flex-col">
          {/* Photo Area */}
          <div className="h-[500px] w-full bg-gray-300 relative overflow-hidden">
            {photoAsset ? (
              <img src={photoAsset} alt={personName} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-400">
                 <span className="text-4xl">FOTO</span>
               </div>
            )}
          </div>
          {/* Info Footer */}
          <div className="bg-[#1a73e8] p-6 text-white text-center">
            <h3 className="text-3xl font-bold mb-1">{personName}</h3>
            <p className="text-lg opacity-90">{area}</p>
          </div>
        </div>

        <div className="mt-12 ml-32">
             <MinuLogo className="h-12 w-auto" color="black" />
        </div>
      </div>

      {/* Right Decoration */}
      <div className="w-[500px] h-full relative flex flex-col items-center pt-12">
        <div className="bg-white px-8 py-3 rounded-full shadow-md text-3xl font-bold mb-4 z-20 relative">
          {dateLabel}
        </div>
        <div className="absolute top-0 right-0 h-[120%] -mr-24 -mt-10">
           <WavyLine color="#ff66b2" className="h-full w-auto" />
        </div>
      </div>
    </div>
  );
};

export default BirthdaySlide;