import React, { useEffect, useMemo, useState } from 'react';
import { WavyLine } from '../components/Shapes';

export interface MotivationalSlideProps {
  title?: string;
  backgroundColor?: string; // used as the right-side theme color (maps to area-info.themeColor)
  url?: string; // optional URL to a JSON with { locale, total, frases: [{dia, texto}] }
  frases?: Array<{ dia: number; texto: string }>; // optional inline data
  day?: number; // override day-of-year (1..365)
}

function getDayOfYear(d = new Date()) {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = Number(d) - Number(start) + (start.getTimezoneOffset() - d.getTimezoneOffset()) * 60000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

const MotivationalSlide: React.FC<MotivationalSlideProps> = ({ title = 'Frase do Dia', backgroundColor = '#071E3D', url, frases, day }) => {
  const [data, setData] = useState<{ frases?: Array<{ dia: number; texto: string }>; locale?: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (frases && frases.length) {
      setData({ frases });
      return;
    }
    if (url) {
      fetch(url)
        .then((r) => r.json())
        .then((json) => {
          if (!cancelled) setData(json);
        })
        .catch(() => {
          if (!cancelled) setData(null);
        });
    }
    return () => {
      cancelled = true;
    };
  }, [url, frases]);

  const phraseText = useMemo(() => {
    if (!data?.frases || data.frases.length === 0) return 'Mantenha-se em frente.';
    const idx = (day ?? getDayOfYear()) - 1; // 0-based
    const safeIdx = ((idx % data.frases.length) + data.frases.length) % data.frases.length;
    const item = data.frases[safeIdx];
    return item?.texto || 'Mantenha-se em frente.';
  }, [data, day]);

  return (
    <div className="w-full h-full relative bg-[#FEFEF5] flex overflow-hidden">
      {/* Left Text Content (title + phrase) */}
      <div className="w-1/2 p-16 flex flex-col justify-center">
        {title && <h2 className="text-7xl font-bold uppercase mb-12 tracking-tight">{title}</h2>}
        <div className="text-3xl font-medium leading-relaxed uppercase text-gray-800 break-words whitespace-pre-line">
          {phraseText}
        </div>
      </div>

      {/* Right Graphic Content (styled like AreaInfo) */}
      <div className="w-1/2 h-full relative flex items-center justify-center overflow-hidden" style={{ backgroundColor }}>
        <div className="absolute h-[130%] scale-150 rotate-90">
          <WavyLine color="black" className="h-full w-auto" />
        </div>
      </div>
    </div>
  );
};

export default MotivationalSlide;
