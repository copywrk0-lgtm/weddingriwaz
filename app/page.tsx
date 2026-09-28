'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';
import CameraIntro from '@/components/CameraIntro';
import SiteNav from '@/components/SiteNav';
import Hero from '@/components/Hero';
import Archive from '@/components/Archive';
import FilmSection from '@/components/FilmSection';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import { assets } from '@/data/content';

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [intro, setIntro] = useState(false);

  useEffect(() => { try { setIntro(sessionStorage.getItem('wr-intro-seen') !== '1'); } catch { setIntro(true); } }, []);
  const finishIntro = () => { try { sessionStorage.setItem('wr-intro-seen','1'); } catch {} setIntro(false); };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time:number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-media', { scale: 1.08, filter:'brightness(2.3) saturate(.55)', duration:1.35, ease:'power3.out', delay:intro ? 1.0 : .1 });
      gsap.from('.hero-word span', { yPercent: 115, duration:1.0, stagger:.08, ease:'power4.out', delay:intro ? 1.08 : .16 });
      gsap.to('.hero-word-a', { xPercent:-11, scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });
      gsap.to('.hero-word-b', { xPercent:12, scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });
      gsap.to('.hero-media img', { scale:1.1, yPercent:5, scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => gsap.from(el,{ opacity:0, y:40, duration:.85, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 86%' } }));
      gsap.utils.toArray<HTMLElement>('.parallax img').forEach((img,i)=>gsap.fromTo(img,{yPercent:i%2?-4:4},{yPercent:i%2?5:-5,ease:'none',scrollTrigger:{trigger:img,start:'top bottom',end:'bottom top',scrub:true}}));
      gsap.fromTo('.film-frame',{width:'62vw',height:'62vh'},{width:'100vw',height:'100vh',ease:'none',scrollTrigger:{trigger:'.film-section',start:'top top',end:'+=1200',scrub:true,pin:true}});
      gsap.to('.film-copy',{opacity:0,y:-45,scrollTrigger:{trigger:'.film-section',start:'top top',end:'+=450',scrub:true}});
      gsap.to('.strip-track',{xPercent:-46,ease:'none',scrollTrigger:{trigger:'.strip-section',start:'top top',end:'+=1500',scrub:true,pin:true}});
    }, root);
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, [intro]);

  return <main ref={root}>
    {intro && <CameraIntro onDone={finishIntro}/>}<SiteNav/><Hero/>
    <section className="statement"><p className="kicker reveal">STORIES / BEFORE THEY BECOME MEMORIES</p><h2 className="reveal">We don’t photograph the day.<br/><em>We photograph what it felt like.</em></h2></section>
    <section className="feature"><div className="feature-title reveal"><span>01 / SELECTED STORY</span><h2>ROHIT<br/><b>×</b> SUMAN</h2><p>A red thread through a quiet landscape.</p></div><div className="feature-stage parallax"><div className="feature-main"><Image src={assets.hero} alt="Rohit and Suman" fill sizes="70vw"/></div><div className="feature-side"><Image src={assets.mono} alt="Wedding portrait" fill sizes="35vw"/></div><small>LOVE, RITUAL, MOTION<br/>WEDDING RIWAZ / ARCHIVE 01</small></div></section>
    <Archive/><FilmSection/>
    <section className="about"><div className="about-image parallax"><Image src={assets.brideBW} alt="Bride getting ready" fill sizes="50vw"/></div><div className="about-copy reveal"><span>SINCE 2015</span><h2>A DECADE<br/>OF WATCHING<br/><em>PEOPLE SAY YES.</em></h2><p>Wedding Riwaz began in 2015 with a mission to transform the way weddings are remembered through meaningful photography and cinematography.</p></div></section>
    <Services/>
    <section className="strip-section"><div className="strip-word">RIWAZ</div><div className="strip-track">{[assets.blue,assets.vipulOne,assets.pink,assets.prernaOne,assets.rashiOne].map((src,i)=><figure key={src}><Image src={src} alt="Wedding Riwaz archive" fill sizes="32vw"/><figcaption>0{i+1} / MEMORY</figcaption></figure>)}</div></section>
    <section className="quote"><blockquote>“The photos perfectly capture the emotions and joy of our wedding day.”</blockquote><p>— CLIENT TESTIMONIAL / WEDDING RIWAZ</p></section>
    <Contact/><footer><span>WEDDING RIWAZ © 2026</span><span>EDITORIAL CONCEPT / COPYWRK</span></footer>
  </main>;
}
