import React, { useState } from 'react';

interface ImageSlideProps {
  url: string;
  alt?: string;
  mode?: 'cover' | 'contain';
  backgroundColor?: string;
  title?: string;
}

const ImageSlide: React.FC<ImageSlideProps> = ({ url, alt = '', mode = 'cover', backgroundColor = '#000000', title }) => {
  const [errored, setErrored] = useState(false);

  return (
    <div className="w-full h-full relative flex items-center justify-center" style={{ backgroundColor }}>
      {title && (
        <div className="absolute top-8 left-8 text-3xl font-bold text-white z-10">{title}</div>
      )}

      {!errored ? (
        <img
          src={url}
          alt={alt}
          onError={() => setErrored(true)}
          className={`w-full h-full ${mode === 'contain' ? 'object-contain' : 'object-cover'} object-center`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white text-2xl">Imagem não disponível</div>
      )}
    </div>
  );
};

export default ImageSlide;
