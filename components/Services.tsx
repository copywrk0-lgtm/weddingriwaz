'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { services } from '@/data/content';

gsap.registerPlugin(Flip);

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const activeIndex = useRef<number | null>(null);

  const flipTo = useCallback((next: number | null) => {
    if (!root.current || activeIndex.current === next) return;

    const targets = root.current.querySelectorAll(
      '.service-line, .service-number, .service-title, .service-copy, .service-media, .service-hint'
    );
    const state = Flip.getState(targets, { props: 'opacity,borderRadius,color' });

    root.current.querySelectorAll<HTMLElement>('.service-line').forEach((row, i) => {
      row.classList.toggle('is-active', i === next);
    });
    activeIndex.current = next;

    Flip.from(state, {
      duration: 0.82,
      ease: 'power4.inOut',
      absolute: true,
      nested: true,
      scale: true,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: 0.25 }),
      onLeave: elements => gsap.to(elements, { opacity: 0, duration: 0.18 })
    });
  }, []);

  return (
    <section className="services" ref={root}>
      <div className="services-heading">
        <p className="services-label">WHAT WE MAKE</p>
        <p className="services-instruction">HOVER / TAP TO OPEN</p>
      </div>

      {services.map(([no, title, copy, img], index) => (
        <div
          className="service-line reveal"
          key={title}
          tabIndex={0}
          onMouseEnter={() => flipTo(index)}
          onMouseLeave={() => flipTo(null)}
          onFocus={() => flipTo(index)}
          onBlur={() => flipTo(null)}
          onClick={() => flipTo(activeIndex.current === index ? null : index)}
          aria-label={`${title}: ${copy}`}
        >
          <span className="service-number">{no}</span>
          <h3 className="service-title">{title}</h3>
          <p className="service-copy">{copy}</p>
          <div className="service-media">
            <Image src={img} alt={`${title} by Wedding Riwaz`} fill sizes="(max-width: 800px) 100vw, 70vw"/>
            <div className="service-media-shade" />
          </div>
          <span className="service-hint">OPEN ↗</span>
        </div>
      ))}
    </section>
  );
}
