
import { Foundation } from './foundations';

// Premium foundation brands with more extensive shade ranges
export const premiumFoundations: Foundation[] = [
  // Fenty Beauty - Extensive shade range
  { id: 'fenty-110', brand: 'Fenty Beauty', name: 'Pro Filt\'r Soft Matte', shade: '110', color: '#F7DCC4', undertone: 'neutral', coverage: 'full', finish: 'matte', price: 36 },
  { id: 'fenty-120', brand: 'Fenty Beauty', name: 'Pro Filt\'r Soft Matte', shade: '120', color: '#F5D5B8', undertone: 'neutral', coverage: 'full', finish: 'matte', price: 36 },
  { id: 'fenty-130', brand: 'Fenty Beauty', name: 'Pro Filt\'r Soft Matte', shade: '130', color: '#F2CCA8', undertone: 'neutral', coverage: 'full', finish: 'matte', price: 36 },
  { id: 'fenty-140', brand: 'Fenty Beauty', name: 'Pro Filt\'r Soft Matte', shade: '140', color: '#EFC299', undertone: 'neutral', coverage: 'full', finish: 'matte', price: 36 },
  { id: 'fenty-150', brand: 'Fenty Beauty', name: 'Pro Filt\'r Soft Matte', shade: '150', color: '#EBB889', undertone: 'neutral', coverage: 'full', finish: 'matte', price: 36 },
  { id: 'fenty-160', brand: 'Fenty Beauty', name: 'Pro Filt\'r Soft Matte', shade: '160', color: '#E8AE79', undertone: 'neutral', coverage: 'full', finish: 'matte', price: 36 },
  
  // Charlotte Tilbury
  { id: 'ct-1', brand: 'Charlotte Tilbury', name: 'Airbrush Flawless Foundation', shade: '1 Fair', color: '#F8E4D0', undertone: 'cool', coverage: 'full', finish: 'natural', price: 44 },
  { id: 'ct-2', brand: 'Charlotte Tilbury', name: 'Airbrush Flawless Foundation', shade: '2 Fair', color: '#F6DFC7', undertone: 'neutral', coverage: 'full', finish: 'natural', price: 44 },
  { id: 'ct-3', brand: 'Charlotte Tilbury', name: 'Airbrush Flawless Foundation', shade: '3 Light', color: '#F4D9BD', undertone: 'neutral', coverage: 'full', finish: 'natural', price: 44 },
  { id: 'ct-4', brand: 'Charlotte Tilbury', name: 'Airbrush Flawless Foundation', shade: '4 Light', color: '#F2D3B3', undertone: 'neutral', coverage: 'full', finish: 'natural', price: 44 },
  
  // Giorgio Armani
  { id: 'armani-2', brand: 'Giorgio Armani', name: 'Luminous Silk Foundation', shade: '2', color: '#F9E6D2', undertone: 'cool', coverage: 'medium', finish: 'natural', price: 64 },
  { id: 'armani-3', brand: 'Giorgio Armani', name: 'Luminous Silk Foundation', shade: '3', color: '#F7E0C8', undertone: 'neutral', coverage: 'medium', finish: 'natural', price: 64 },
  { id: 'armani-4', brand: 'Giorgio Armani', name: 'Luminous Silk Foundation', shade: '4', color: '#F5DABC', undertone: 'neutral', coverage: 'medium', finish: 'natural', price: 64 },
  { id: 'armani-5', brand: 'Giorgio Armani', name: 'Luminous Silk Foundation', shade: '5', color: '#F3D4B0', undertone: 'neutral', coverage: 'medium', finish: 'natural', price: 64 },
  
  // Dior
  { id: 'dior-0n', brand: 'Dior', name: 'Forever Foundation', shade: '0N Neutral', color: '#F8E5D1', undertone: 'neutral', coverage: 'full', finish: 'matte', price: 52 },
  { id: 'dior-0w', brand: 'Dior', name: 'Forever Foundation', shade: '0W Warm', color: '#F6E1CB', undertone: 'neutral', coverage: 'full', finish: 'matte', price: 52 },
  { id: 'dior-1n', brand: 'Dior', name: 'Forever Foundation', shade: '1N Neutral', color: '#F4DBC1', undertone: 'neutral', coverage: 'full', finish: 'matte', price: 52 },
  { id: 'dior-1w', brand: 'Dior', name: 'Forever Foundation', shade: '1W Warm', color: '#F2D7BB', undertone: 'neutral', coverage: 'full', finish: 'matte', price: 52 },
  
  // Pat McGrath Labs
  { id: 'pmg-l1', brand: 'Pat McGrath Labs', name: 'Skin Fetish Foundation', shade: 'Light 1', color: '#F7E3CF', undertone: 'cool', coverage: 'full', finish: 'natural', price: 68 },
  { id: 'pmg-l2', brand: 'Pat McGrath Labs', name: 'Skin Fetish Foundation', shade: 'Light 2', color: '#F5DDC5', undertone: 'neutral', coverage: 'full', finish: 'natural', price: 68 },
  { id: 'pmg-l3', brand: 'Pat McGrath Labs', name: 'Skin Fetish Foundation', shade: 'Light 3', color: '#F3D7BB', undertone: 'neutral', coverage: 'full', finish: 'natural', price: 68 },
  
  // Tom Ford
  { id: 'tf-0.5', brand: 'Tom Ford', name: 'Traceless Foundation', shade: '0.5 Porcelain', color: '#F9E7D3', undertone: 'cool', coverage: 'full', finish: 'natural', price: 88 },
  { id: 'tf-1.0', brand: 'Tom Ford', name: 'Traceless Foundation', shade: '1.0 Alabaster', color: '#F7E1C9', undertone: 'neutral', coverage: 'full', finish: 'natural', price: 88 },
  { id: 'tf-1.5', brand: 'Tom Ford', name: 'Traceless Foundation', shade: '1.5 Cream', color: '#F5DBBF', undertone: 'neutral', coverage: 'full', finish: 'natural', price: 88 },
];

export const shoppingLinks = {
  'Fenty Beauty': {
    baseUrl: 'https://fentybeauty.com/products/pro-filtr-soft-matte-longwear-foundation',
    affiliate: '?utm_source=shadematching&utm_medium=referral'
  },
  'Charlotte Tilbury': {
    baseUrl: 'https://www.charlottepilbury.com/products/airbrush-flawless-foundation',
    affiliate: '?utm_source=shadematching&utm_medium=referral'
  },
  'Giorgio Armani': {
    baseUrl: 'https://www.giorgioarmanibeauty.com/makeup/face/foundation/luminous-silk-foundation',
    affiliate: '?utm_source=shadematching&utm_medium=referral'
  },
  'Dior': {
    baseUrl: 'https://www.dior.com/en_us/products/beauty-Y0996244-dior-forever-foundation',
    affiliate: '?utm_source=shadematching&utm_medium=referral'
  },
  'Pat McGrath Labs': {
    baseUrl: 'https://www.patmcgrath.com/products/skin-fetish-sublime-perfection-foundation',
    affiliate: '?utm_source=shadematching&utm_medium=referral'
  },
  'Tom Ford': {
    baseUrl: 'https://www.tomford.com/traceless-foundation-stick/T8X7.html',
    affiliate: '?utm_source=shadematching&utm_medium=referral'
  }
};
