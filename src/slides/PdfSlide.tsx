import React from 'react';

interface PdfSlideProps {
  url: string;
  title?: string;
  backgroundColor?: string;
}

const PdfSlide: React.FC<PdfSlideProps> = ({ url, title = 'Documento', backgroundColor = '#FEFEF5' }) => {
  return (
    <div className="w-full h-full relative" style={{ backgroundColor }}>
      <div className="p-8">
        <h2 className="text-5xl font-bold">{title}</h2>
      </div>

      <div className="absolute inset-0 p-16 pt-24">
        {/*
          Use iframe to embed the PDF. Browser (Chromium) will usually display PDFs inline.
          Use sandbox attributes conservatively; we keep it simple so printing/rotation still works.
        */}
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-none"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />

        {/* Fallback link in case embedding is blocked */}
        <div className="sr-only">
          <a href={url} target="_blank" rel="noopener noreferrer">Abrir PDF</a>
        </div>
      </div>
    </div>
  );
};

export default PdfSlide;
