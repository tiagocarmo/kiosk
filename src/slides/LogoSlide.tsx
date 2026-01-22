import React from 'react';

export interface LogoSlideProps {
  url: string; // path to logo (svg/png)
  backgroundColor?: string;
  size?: string | number; // CSS percentage or px for max dimension, default '80%'
  title?: string; // optional small title above (not shown by default)
}

const LogoSlide: React.FC<LogoSlideProps> = ({ url, backgroundColor = '#ffffff', size = '80%', title }) => {
  // If size is a percentage string (e.g. '80%') we want the logo to occupy that
  // percentage of the container. Using maxWidth alone does not upscale small SVGs,
  // so when a percent is provided we set width to that percent (and height auto).
  const style: React.CSSProperties = {};
  if (typeof size === 'string' && size.trim().endsWith('%')) {
    style.width = size;
    style.height = 'auto';
    style.maxWidth = size;
    style.maxHeight = size;
  } else if (typeof size === 'number') {
    style.maxWidth = `${size}px`;
    style.maxHeight = `${size}px`;
  } else {
    // fallback: treat as CSS value
    style.maxWidth = size as string;
    style.maxHeight = size as string;
  }

  return (
    <div className="w-[1920px] h-[1080px] flex flex-col items-center justify-center" style={{ background: backgroundColor }}>
      {title && <div className="mb-6 text-3xl font-semibold text-gray-800">{title}</div>}
      <img src={url} alt="logo" style={style} className="block w-auto h-auto" />
    </div>
  );
};

export default LogoSlide;
