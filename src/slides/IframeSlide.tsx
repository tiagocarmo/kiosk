import React from 'react';

interface IframeSlideProps {
  url: string;
  title?: string;
  backgroundColor?: string;
  allow?: string;
  allowFullScreen?: boolean;
}

const IframeSlide: React.FC<IframeSlideProps> = ({
  url,
  title,
  backgroundColor = '#000000',
  allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen; display-capture; microphone; camera; geolocation',
  allowFullScreen = true,
}) => {
  return (
    <div className="w-full h-full relative" style={{ backgroundColor }}>
      {title && (
        <div className="absolute top-4 left-4 z-20 text-white text-xl font-semibold">{title}</div>
      )}

      <iframe
        src={url}
        title={title ?? url}
        className="w-full h-full border-none"
        style={{ width: '100%', height: '100%', border: 'none' }}
        allow={allow}
        allowFullScreen={allowFullScreen}
      />
    </div>
  );
};

export default IframeSlide;
