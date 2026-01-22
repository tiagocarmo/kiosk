import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface MotivationalSlideProps {
  title?: string;
  backgroundColor?: string;
  url?: string; // optional URL to a JSON with { locale, total, frases: [{dia, texto}] }
  frases?: Array<{ dia: number; texto: string }>; // optional inline data
  day?: number; // override day-of-year (1..365)
  backgroundImage?: string; // optional background image URL
}

function getDayOfYear(d = new Date()) {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = Number(d) - Number(start) + (start.getTimezoneOffset() - d.getTimezoneOffset()) * 60000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const MotivationalSlide: React.FC<MotivationalSlideProps> = ({ title, backgroundColor = '#071E3D', url, frases, day, backgroundImage }) => {
  const [data, setData] = useState<{ frases?: Array<{ dia: number; texto: string }>; locale?: string } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [fontSizePx, setFontSizePx] = useState<number | null>(null);

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

  // pick phrase based on day-of-year
  const phraseText = React.useMemo(() => {
    if (!data?.frases || data.frases.length === 0) return 'Mantenha-se em frente.';
    const idx = (day ?? getDayOfYear()) - 1; // 0-based
    const safeIdx = ((idx % data.frases.length) + data.frases.length) % data.frases.length;
    const item = data.frases[safeIdx];
    return item?.texto || 'Mantenha-se em frente.';
  }, [data, day]);

  // adjust font size to fit the container (simple shrink loop)
  useLayoutEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    // start big
    const maxInitial = Math.min(container.clientWidth, container.clientHeight) * 0.18; // heuristic
    let size = clamp(Math.floor(maxInitial), 18, 400);
    const padding = 80; // leave space for title and note
    let iterations = 0;
    // apply and shrink until fits or iterations exhausted
    while (iterations < 60) {
      textEl.style.fontSize = `${size}px`;
      // measure
      const fitsHeight = textEl.scrollHeight <= (container.clientHeight - padding);
      const fitsWidth = textEl.scrollWidth <= (container.clientWidth - 40);
      if (fitsHeight && fitsWidth) break;
      size = Math.max(18, Math.floor(size * 0.92));
      iterations += 1;
    }
    setFontSizePx(size);
  }, [phraseText]);

  return (
    <div ref={containerRef} className="relative w-[1920px] h-[1080px] flex flex-col" style={{ background: backgroundColor }}>
      {/* full-bleed background image (simple implementation) */}
      {backgroundImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={backgroundImage}
          alt="background"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      <div className="relative px-12 pt-8 z-10">
        {title && <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 28 }}>{title}</div>}
      </div>

      <div className="relative flex-1 flex items-center justify-center px-16 z-10">
        <div
          ref={textRef}
          style={{
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.05,
            whiteSpace: 'pre-wrap',
            fontWeight: 500,
            fontSize: fontSizePx ? `${fontSizePx}px` : '48px',
            maxWidth: '1400px',
          }}
        >
          {phraseText}
        </div>
      </div>

      <div className="relative px-12 pb-8 z-10">
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Frase criada por IA, pode conter erros ✨</div>
      </div>
    </div>
  );
};

export default MotivationalSlide;
