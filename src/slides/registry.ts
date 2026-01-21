import React from 'react';
import CoverSlide from './CoverSlide';
import BirthdaySlide from './BirthdaySlide';
import TenureSlide from './TenureSlide';
import NewsSlide from './NewsSlide';
import AreaInfoSlide from './AreaInfoSlide';
import PdfSlide from './PdfSlide';
import ImageSlide from './ImageSlide';

export type SlideType = 'cover' | 'birthday' | 'tenure' | 'news' | 'area-info' | 'pdf' | 'image';

export interface SlideData {
  type: SlideType;
  duration?: number; // Override default duration
  props: Record<string, any>;
}

export const SLIDE_COMPONENTS: Record<SlideType, React.FC<any>> = {
  cover: CoverSlide,
  birthday: BirthdaySlide,
  tenure: TenureSlide,
  news: NewsSlide,
  'area-info': AreaInfoSlide,
  pdf: PdfSlide,
  image: ImageSlide,
};
