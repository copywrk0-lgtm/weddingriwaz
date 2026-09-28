'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

const IMG = {
  hero: 'https://weddingriwaz.com/wp-content/uploads/2024/06/3E1A0109-copy-scaled.jpg',
  yellow: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A08I30621-scaled.webp',
  night: 'https://weddingriwaz.com/wp-content/uploads/2024/06/3E1A6568-copy.webp',
  wedding: 'https://weddingriwaz.com/wp-content/uploads/2024/06/A37I8438-copy-scaled-1.jpg',
  blue: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A08I7532-scaled.webp',
  library: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A08I28711-scaled.webp',
  mono: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A37I8062-copy-scaled.webp',
  pink: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A37I8440-copy-scaled.webp',
  rashi: 'https://weddingriwaz.com/wp-content/uploads/2024/06/1C0A6751-copy-scaled.webp',
  brideBW: 'https://weddingriwaz.com/wp-content/uploads/2024/06/Z25A5693-copy-scaled.webp',
  brideWarm: 'https://weddingriwaz.com/wp-content/uploads/2024/06/Z25A5723-copy-scaled.webp'
};

const stories = [
  { no: '01', name: 'Rohit × Suman', img: IMG.hero, tone: 'river / red' },
  { no: '02', name: 'Vipul × Sacchi', img: IMG.yellow, tone: 'pre-wedding / daylight' },
  { no: '03', name: 'Prerna × Ankit', img: IMG.night, tone: 'evening / intimacy' },
  { no: '04', name: 'Rashi × Kshitij', img: IMG.rashi, tone: 'wedding / colour' }
];

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
  const [intro, setIntro] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('wr-intro-seen')) setIntro(false);
    } catch {}
  }, []);

  const finishIntro = () => {
    try { sessionStorage.setItem('wr-intro-seen', '1'); } catch {}
    setIntro(false);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from('.hero-image-shell', { scale: 1.1, filter: 'brightness(2.2) saturate(.4)', duration: 1.5, ease: 'power3.out', delay: intro ? 1.05 : .1 });
      gsap.from('.hero-word span', { yPercent: 112, duration: 1.05, stagger: .08, ease: 'power4.out', delay: intro ? 1.08 : .15 });
      gsap.from('.hero-meta', { opacity: 0, y: 16, duration: .7, delay: intro ? 1.45 : .55 });

      gsap.to('.hero-photo', {
        scale: 1.08,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.hero-word-top', {
        xPercent: -11,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.hero-word-bottom', {
        xPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 40, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
      });

      gsap.utils.toArray<HTMLElement>('.float-image').forEach((el, i) => {
        gsap.fromTo(el, { yPercent: i % 2 ? -5 : 5 }, { yPercent: i % 2 ? 6 : -6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      gsap.fromTo('.film-frame', { width: '62vw', height: '62vh' }, {
        width: '100vw', height: '100vh', ease: 'none',
        scrollTrigger: { trigger: '.film-section', start: 'top top', end: '+=1300', scrub: true, pin: true }
      });

      gsap.to('.film-copy', {
        opacity: 0, y: -40, ease: 'none',
        scrollTrigger: { trigger: '.film-section', start: 'top top', end: '+=500', scrub: true }
      });

      gsap.to('.strip-track', {
        xPercent: -45,
        ease: 'none',
        scrollTrigger: { trigger: '.strip-section', start: 'top top', end: '+=1500', scrub: true, pin: true }
      });
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [intro]);

  return (
    <main ref={root}>
      {intro && <CameraIntro onDone={finishIntro} />}

      <header className="site-nav">
        <a href="#top" className="brand">WR</a>
        <div className="nav-center">WEDDING RIWAZ / EST. 2015</div>
        <a className="nav-link" href="#contact">ENQUIRE ↗</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-word hero-word-top"><span>WEDDING</span></div>
        <div className="hero-image-shell">
          <img className="hero-photo" src={IMG.hero} alt="Wedding Riwaz couple portrait" />
          <div className="grain" />
        </div>
        <div className="hero-word hero-word-bottom"><span>RIWAZ</span></div>
        <div className="hero-meta">
          <span>PHOTOGRAPHY / FILMS</span>
          <span>GURGAON — INDIA</span>
          <span>SCROLL TO ENTER ↓</span>
        </div>
      </section>

      <section className="statement">
        <p className="eyebrow" data-reveal>STORIES / BEFORE THEY BECOME MEMORIES</p>
        <h2 data-reveal>We don’t photograph the day.<br/><em>We photograph what it felt like.</em></h2>
      </section>

      <section className="feature-story">
        <div className="story-heading" data-reveal>
          <div className="story-index">01 / SELECTED STORY</div>
          <h3>ROHIT<br/><span>×</span> SUMAN</h3>
          <div className="story-caption">A red thread through a quiet landscape.</div>
        </div>
        <div className="story-stage">
          <img className="story-main float-image" src={IMG.hero} alt="Rohit and Suman" />
          <img className="story-side float-image" src={IMG.mono} alt="Wedding portrait in black and white" />
          <div className="story-note">LOVE, RITUAL, MOTION<br/>WEDDING RIWAZ / ARCHIVE 01</div>
        </div>
      </section>

      <section className="archive">
        <div className="archive-head" data-reveal>
          <span>THE ARCHIVE</span>
          <h2>People.<br/>Places.<br/><em>Promises.</em></h2>
        </div>
        <div className="archive-grid">
          {stories.map((story, i) => (
            <article className={`archive-item archive-item-${i+1}`} key={story.name} data-reveal>
              <div className="archive-image-wrap"><img className="float-image" src={story.img} alt={story.name} /></div>
              <div className="archive-label"><span>{story.no}</span><strong>{story.name}</strong><small>{story.tone}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section className="film-section">
        <div className="film-copy">
          <span>WEDDING RIWAZ / MOTION</span>
          <h2>SOME<br/>MEMORIES<br/><em>MOVE.</em></h2>
        </div>
        <div className={`film-frame ${playing ? 'is-playing' : ''}`}>
          {!playing ? (
            <>
              <img src={IMG.wedding} alt="Wedding Riwaz film still" />
              <div className="film-shade" />
              <button className="film-play" aria-label="Play Wedding Riwaz film" onClick={() => setPlaying(true)}>
                <span className="film-play-icon">▶</span>
                <span className="film-play-label">PLAY FILM</span>
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

      <section className="story-about">
        <div className="about-image"><img className="float-image" src={IMG.brideWarm} alt="Bride getting ready" /></div>
        <div className="about-copy" data-reveal>
          <span>SINCE 2015</span>
          <h2>A DECADE<br/>OF WATCHING<br/><em>PEOPLE SAY YES.</em></h2>
          <p>Wedding Riwaz began in 2015 with a simple mission: to transform the way weddings are remembered through meaningful photography and cinematography.</p>
        </div>
      </section>

      <section className="services-editorial">
        <div className="services-kicker" data-reveal>WHAT WE MAKE</div>
        {[
          ['PHOTOGRAPHY', 'Moments that don’t announce themselves.', IMG.brideBW],
          ['FILMS', 'Movement, voices and everything between.', IMG.wedding],
          ['PRE-WEDDINGS', 'A chapter before the ceremony begins.', IMG.blue],
          ['DESTINATIONS', 'Stories carried somewhere new.', IMG.yellow]
        ].map(([title, desc, image], idx) => (
          <div className="service-line" key={title} data-reveal>
            <span className="service-no">0{idx+1}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
            <div className="service-thumb"><img src={image} alt="" /></div>
          </div>
        ))}
      </section>

      <section className="strip-section">
        <div className="strip-word">RIWAZ</div>
        <div className="strip-track">
          {[IMG.brideBW, IMG.pink, IMG.night, IMG.rashi, IMG.library, IMG.blue].map((src, i) => (
            <figure className="strip-frame" key={src}><img src={src} alt={`Wedding memory ${i+1}`} /><figcaption>0{i+1}</figcaption></figure>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <blockquote data-reveal>“The photos perfectly capture the emotions and joy of our wedding day.”</blockquote>
        <div className="quote-person" data-reveal>LAKSHAY × SHIVANI / WEDDING RIWAZ COUPLE</div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-image"><img src={IMG.hero} alt="Wedding Riwaz story" /></div>
        <div className="contact-copy">
          <span>YOUR STORY / NEXT</span>
          <h2>YOURS<br/>IS NEXT.</h2>
          <p>Tell us where it begins.</p>
          <a className="contact-cta" href="https://wa.me/919289727321" target="_blank" rel="noreferrer">START A CONVERSATION ↗</a>
          <div className="contact-details">
            <a href="tel:+919289727321">+91 92897 27321</a>
            <a href="mailto:Contact@weddingriwaz.com">Contact@weddingriwaz.com</a>
            <span>Sector 38, Gurgaon</span>
          </div>
        </div>
      </section>

      <footer><span>WEDDING RIWAZ © 2026</span><span>PHOTOGRAPHY / FILMS / STORIES</span></footer>
    </main>
  );
}
