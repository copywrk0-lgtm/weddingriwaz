'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

const IMG = {
  hero: 'https://weddingriwaz.com/wp-content/uploads/2024/06/3E1A0109-copy-scaled.jpg',
  rohitAlt: 'https://weddingriwaz.com/wp-content/uploads/2024/06/A08I3540.webp',
  rohitWedding: 'https://weddingriwaz.com/wp-content/uploads/2024/07/Z25A1696-copy-scaled.webp',
  vipulOne: 'https://weddingriwaz.com/wp-content/uploads/2024/06/All-Edit-Pic-2-scaled.webp',
  vipulTwo: 'https://weddingriwaz.com/wp-content/uploads/2024/06/All-Edit-Pic-3-scaled.webp',
  prernaOne: 'https://weddingriwaz.com/wp-content/uploads/2024/06/4P2A0528-copy-f-scaled.webp',
  prernaTwo: 'https://weddingriwaz.com/wp-content/uploads/2024/06/4P2A9950_1-copy-scaled.webp',
  rashiOne: 'https://weddingriwaz.com/wp-content/uploads/2024/06/1C0A6751-copy-scaled.webp',
  brideBW: 'https://weddingriwaz.com/wp-content/uploads/2024/06/Z25A5693-copy-scaled.webp',
  brideWarm: 'https://weddingriwaz.com/wp-content/uploads/2024/06/Z25A5723-copy-scaled.webp',
  blue: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A08I7532-scaled.webp',
  library: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A08I28711-scaled.webp',
  mono: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A37I8062-copy-scaled.webp',
  pink: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A37I8440-copy-scaled.webp',
  wedding: 'https://weddingriwaz.com/wp-content/uploads/2024/06/A37I8438-copy-scaled-1.jpg'
} as const;

const stories = [
  { no: '01', name: 'Rohit × Suman', image: IMG.hero, note: 'selected story / river / red' },
  { no: '02', name: 'Vipul × Sacchi', image: IMG.vipulTwo, note: 'pre-wedding / colour / daylight' },
  { no: '03', name: 'Prerna × Ankit', image: IMG.prernaTwo, note: 'evening / intimacy / light' },
  { no: '04', name: 'Rashi × Kshitij', image: IMG.rashiOne, note: 'wedding / ritual / colour' }
] as const;

const services = [
  ['01', 'Photography', 'Quiet gestures, loud celebrations, and everything between.', IMG.brideWarm],
  ['02', 'Films', 'Movement, voices and moments that photographs cannot hold.', IMG.wedding],
  ['03', 'Pre-Weddings', 'Portraits made around the couple, not a preset.', IMG.blue],
  ['04', 'Destinations', 'Stories carried beyond the city.', IMG.prernaTwo]
] as const;

function CameraIntro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1600);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="camera-intro camera-intro-css">
      <div className="camera-rig">
        <div className="camera-shadow" />
        <div className="camera-body-3d">
          <div className="camera-top-plate" />
          <div className="camera-prism"><span>WR</span></div>
          <div className="camera-hotshoe" />
          <div className="shutter-button" />
          <div className="camera-af-light" />
          <div className="camera-grip" />
          <div className="camera-brand">WEDDING RIWAZ</div>
          <div className="camera-lens-3d">
            <div className="lens-barrel-ring lens-ring-outer" />
            <div className="lens-barrel-ring focus-ring" />
            <div className="lens-barrel-ring lens-ring-inner" />
            <div className="lens-glass">
              <span className="lens-reflection lens-reflection-a" />
              <span className="lens-reflection lens-reflection-b" />
              <span className="lens-aperture" />
            </div>
          </div>
        </div>
        <div className="focus-corners" aria-hidden="true"><i/><i/><i/><i/></div>
        <span className="hold-still">HOLD STILL</span>
      </div>
      <div className="flash-layer"/>
    </div>
  );
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [intro, setIntro] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);

  useEffect(() => {
    try { setIntro(sessionStorage.getItem('wr-intro-seen') !== '1'); }
    catch { setIntro(true); }
  }, []);

  const finishIntro = () => {
    try { sessionStorage.setItem('wr-intro-seen', '1'); } catch {}
    setIntro(false);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from('.hero-media', { scale: 1.08, filter: 'brightness(2.3) saturate(.55)', duration: 1.35, ease: 'power3.out', delay: intro ? 1.0 : .1 });
      gsap.from('.hero-word span', { yPercent: 115, duration: 1.0, stagger: .08, ease: 'power4.out', delay: intro ? 1.08 : .16 });
      gsap.to('.hero-word-a', { xPercent: -11, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-word-b', { xPercent: 12, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-media img', { scale: 1.1, yPercent: 5, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => gsap.from(el, { opacity: 0, y: 40, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } }));
      gsap.utils.toArray<HTMLElement>('.parallax img').forEach((img, i) => gsap.fromTo(img, { yPercent: i % 2 ? -4 : 4 }, { yPercent: i % 2 ? 5 : -5, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } }));
      gsap.fromTo('.film-frame', { width: '62vw', height: '62vh' }, { width: '100vw', height: '100vh', ease: 'none', scrollTrigger: { trigger: '.film-section', start: 'top top', end: '+=1200', scrub: true, pin: true } });
      gsap.to('.film-copy', { opacity: 0, y: -45, scrollTrigger: { trigger: '.film-section', start: 'top top', end: '+=450', scrub: true } });
      gsap.to('.strip-track', { xPercent: -46, ease: 'none', scrollTrigger: { trigger: '.strip-section', start: 'top top', end: '+=1500', scrub: true, pin: true } });
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [intro]);

  return (
    <main ref={root}>
      {intro && <CameraIntro onDone={finishIntro}/>}

      <header className="site-nav">
        <a className="monogram" href="#top">WR</a>
        <span>WEDDING RIWAZ / EST. 2015</span>
        <a href="#contact">ENQUIRE ↗</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-word hero-word-a"><span>WEDDING</span></div>
        <div className="hero-media"><img src={IMG.hero} alt="Wedding Riwaz couple portrait"/></div>
        <div className="hero-word hero-word-b"><span>RIWAZ</span></div>
        <div className="hero-foot"><span>PHOTOGRAPHY / FILMS</span><span>DELHI NCR — INDIA</span><span>SCROLL TO ENTER ↓</span></div>
      </section>

      <section className="statement">
        <p className="kicker reveal">STORIES / BEFORE THEY BECOME MEMORIES</p>
        <h2 className="reveal">We don’t photograph the day.<br/><em>We photograph what it felt like.</em></h2>
      </section>

      <section className="feature">
        <div className="feature-title reveal"><span>01 / SELECTED STORY</span><h2>ROHIT<br/><b>×</b> SUMAN</h2><p>A red thread through a quiet landscape.</p></div>
        <div className="feature-stage parallax">
          <div className="feature-main"><img src={IMG.hero} alt="Rohit and Suman"/></div>
          <div className="feature-side"><img src={IMG.mono} alt="Wedding portrait"/></div>
          <small>LOVE, RITUAL, MOTION<br/>WEDDING RIWAZ / ARCHIVE 01</small>
        </div>
      </section>

      <section className="archive">
        <div className="archive-head reveal"><span>THE ARCHIVE</span><h2>People.<br/>Places.<br/><em>Promises.</em></h2></div>
        <div className="archive-grid">
          {stories.map((story, index) => (
            <article className={`archive-card archive-card-${index + 1} reveal`} key={story.name}>
              <div className="archive-media"><img src={story.image} alt={story.name}/></div>
              <div className="archive-caption"><span>{story.no}</span><strong>{story.name}</strong><small>{story.note}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section className="film-section">
        <div className="film-copy"><span>WEDDING RIWAZ / MOTION</span><h2>SOME<br/>MEMORIES<br/><em>MOVE.</em></h2></div>
        <div className={`film-frame ${playing ? 'is-playing' : ''}`}>
          {!playing ? (
            <>
              <img src={IMG.wedding} alt="Wedding Riwaz film still"/>
              <div className="film-shade"/>
              <button className="film-play" aria-label="Play Wedding Riwaz film" onClick={() => setPlaying(true)}>
                <span className="film-play-icon">▶</span><span className="film-play-label">PLAY FILM</span>
              </button>
              <small>CINEMATOGRAPHY / WEDDING FILMS</small>
            </>
          ) : (
            <>
              <iframe
                className="film-iframe"
                src="https://www.youtube-nocookie.com/embed/X-2XhLJnXLk?autoplay=1&rel=0&modestbranding=1"
                title="Wedding Riwaz film"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <button className="film-close" aria-label="Close film" onClick={() => setPlaying(false)}>CLOSE ×</button>
            </>
          )}
        </div>
      </section>

      <section className="about">
        <div className="about-image parallax"><img src={IMG.brideBW} alt="Bride getting ready"/></div>
        <div className="about-copy reveal"><span>SINCE 2015</span><h2>A DECADE<br/>OF WATCHING<br/><em>PEOPLE SAY YES.</em></h2><p>Wedding Riwaz began in 2015 with a mission to transform the way weddings are remembered through meaningful photography and cinematography.</p></div>
      </section>

      <section className="services">
        <div className="services-heading"><p className="services-label">WHAT WE MAKE</p><p className="services-instruction">HOVER / TAP TO OPEN</p></div>
        {services.map(([no, title, copy, image], index) => (
          <div
            className={`service-line reveal ${activeService === index ? 'is-active' : ''}`}
            key={title}
            tabIndex={0}
            onMouseEnter={() => setActiveService(index)}
            onMouseLeave={() => setActiveService(null)}
            onFocus={() => setActiveService(index)}
            onBlur={() => setActiveService(null)}
            onClick={() => setActiveService(activeService === index ? null : index)}
            aria-label={`${title}: ${copy}`}
          >
            <span className="service-number">{no}</span>
            <h3 className="service-title">{title}</h3>
            <p className="service-copy">{copy}</p>
            <div className="service-media"><img src={image} alt={`${title} by Wedding Riwaz`}/><div className="service-media-shade"/></div>
            <span className="service-hint">OPEN ↗</span>
          </div>
        ))}
      </section>

      <section className="strip-section">
        <div className="strip-word">RIWAZ</div>
        <div className="strip-track">
          {[IMG.blue, IMG.vipulOne, IMG.pink, IMG.prernaOne, IMG.rashiOne].map((src, index) => (
            <figure key={src}><img src={src} alt="Wedding Riwaz archive"/><figcaption>0{index + 1} / MEMORY</figcaption></figure>
          ))}
        </div>
      </section>

      <section className="quote"><blockquote>“The photos perfectly capture the emotions and joy of our wedding day.”</blockquote><p>— CLIENT TESTIMONIAL / WEDDING RIWAZ</p></section>

      <section className="contact" id="contact">
        <div className="contact-image"><img src={IMG.brideWarm} alt="Wedding Riwaz bride"/></div>
        <div className="contact-copy"><span>THE NEXT STORY</span><h2>YOURS<br/>IS NEXT.</h2><p>Tell us where it begins.</p><a href="https://wa.me/919289727321" target="_blank" rel="noreferrer">START A CONVERSATION ↗</a><div className="contact-small"><span>WEDDING RIWAZ</span><span>DELHI NCR / INDIA</span><span>EST. 2015</span></div></div>
      </section>

      <footer><span>WEDDING RIWAZ © 2026</span><span>EDITORIAL CONCEPT / COPYWRK</span></footer>
    </main>
  );
}
