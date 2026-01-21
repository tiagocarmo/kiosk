import React from 'react';
import { WavyLine, MinuLogo } from '../components/Shapes';

interface TenureSlideProps {
  title: string;
  personName: string;
  area: string;
  dateLabel: string;
  yearsNumber: number;
  photoAsset?: string;
}

const TenureSlide: React.FC<TenureSlideProps> = ({
  title,
  personName,
  area,
  dateLabel,
  yearsNumber,
  photoAsset,
}) => {
  return (
    <div className="w-full h-full relative bg-[#FEFEF5] flex overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 flex flex-col pt-12 pl-12 relative z-10">
        {/* Header Bar */}
        <div className="bg-[#4a144b] text-white py-4 px-8 w-fit min-w-[600px] mb-4 shadow-sm">
          <h2 className="text-6xl font-bold uppercase tracking-wide">{title}</h2>
        </div>

        {/* Sub Header Date */}
        <div className="bg-[#4a144b] text-white py-2 px-8 w-fit mb-16 opacity-90">
          <span className="text-2xl font-medium">{dateLabel}</span>
        </div>

        {/* Person Card */}
        <div className="ml-32 w-[400px] bg-gray-200 shadow-xl flex flex-col relative">
          {/* Badge */}
          <div className="absolute -right-12 top-0 bg-[#87ceeb] text-black w-24 h-24 flex flex-col items-center justify-center shadow-md z-20 font-bold leading-tight">
            <span className="text-5xl">{yearsNumber}</span>
            <span className="text-lg">anos</span>
          </div>

          {/* Photo Area */}
          <div className="h-[450px] w-full bg-gray-300 relative overflow-hidden">
            {photoAsset ? (
              <img src={photoAsset} alt={personName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-4xl">FOTO</span>
              </div>
            )}
          </div>
          {/* Info Footer */}
          <div className="bg-[#4a144b] p-6 text-white text-center">
            <h3 className="text-3xl font-bold mb-1">{personName}</h3>
            <p className="text-lg opacity-90">{area}</p>
          </div>
        </div>

        <div className="mt-12 ml-32">
          <MinuLogo className="h-12 w-auto" color="black" />
        </div>
      </div>

      {/* Right Decoration */}
      <div className="w-[500px] h-full relative flex flex-col items-center">
        <div className="absolute top-0 right-0 h-[120%] -mr-24 -mt-10">
          <WavyLine color="#8ab4f8" className="h-full w-auto" />
        </div>
      </div>
    </div>
  );
};

export default TenureSlide;
