import React from 'react';

interface ShapeProps {
  color: string;
  className?: string;
}

export const WavyLine: React.FC<ShapeProps> = ({ color, className }) => (
  <svg
    viewBox="0 0 200 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      d="M100 50 C 180 50, 180 150, 100 150 C 20 150, 20 250, 100 250 C 180 250, 180 350, 100 350 C 20 350, 20 450, 100 450 C 180 450, 180 550, 100 550 C 20 550, 20 650, 100 650 C 180 650, 180 750, 100 750 C 20 750, 20 850, 100 850 C 180 850, 180 950, 100 950 C 20 950, 20 1050, 100 1050"
      stroke={color}
      strokeWidth="60"
      strokeLinecap="round"
    />
  </svg>
);

export const ArchShape: React.FC<ShapeProps> = ({ color, className }) => (
  <svg
    viewBox="0 0 400 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      d="M50 800 L50 400 C 50 200, 350 200, 350 400 L350 800"
      stroke={color}
      strokeWidth="100"
    />
  </svg>
);

export const MinuLogo: React.FC<{ color?: string; className?: string }> = ({ color = "black", className }) => (
  <svg viewBox="0 0 400 150" className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M40 140 V 60 C 40 30, 90 30, 90 60 V 140 M90 140 V 60 C 90 30, 140 30, 140 60 V 140" stroke={color} strokeWidth="35" strokeLinecap="round" fill="none" />
    <line x1="190" y1="40" x2="190" y2="140" stroke={color} strokeWidth="35" strokeLinecap="round" />
    <path d="M240 140 V 60 C 240 30, 290 30, 290 60 V 140" stroke={color} strokeWidth="35" strokeLinecap="round" fill="none" />
    <path d="M340 40 V 110 C 340 140, 390 140, 390 110 V 40" stroke={color} strokeWidth="35" strokeLinecap="round" fill="none" />
  </svg>
);
