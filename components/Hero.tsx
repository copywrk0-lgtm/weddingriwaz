import Image from 'next/image';
import { assets } from '@/data/content';

export default function Hero() {
  return <section className="hero" id="top">
    <div className="hero-word hero-word-a"><span>WEDDING</span></div>
    <div className="hero-media"><Image src={assets.hero} alt="Wedding Riwaz couple portrait" fill priority sizes="(max-width: 800px) 74vw, 46vw" /></div>
    <div className="hero-word hero-word-b"><span>RIWAZ</span></div>
    <div className="hero-foot"><span>PHOTOGRAPHY / FILMS</span><span>DELHI NCR — INDIA</span><span>SCROLL TO ENTER ↓</span></div>
  </section>;
}
