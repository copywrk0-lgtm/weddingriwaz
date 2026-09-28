'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { services } from '@/data/content';

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const activeIndex = useRef<number | null>(null);

  const animateTo = useCallback((next: number | null) => {
    if (!root.current || activeIndex.current === next) return;

    const rows = Array.from(root.current.querySelectorAll<HTMLElement>('.service-line'));
    const before = rows.map((row) => row.getBoundingClientRect());

    rows.forEach((row, i) => {
      row.classList.toggle('is-active', i === next);
    });

    rows.forEach((row, i) => {
      const after = row.getBoundingClientRect();
      const prev = before[i];
      const dx = prev.left - after.left;
      const dy = prev.top - after.top;
      const sx = prev.width / Math.max(after.width, 1);
      const sy = prev.height / Math.max(after.height, 1);

      gsap.fromTo(
        row,
        { x: dx, y: dy, scaleX: sx, scaleY: sy, transformOrigin: 'top left' },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.78, ease: 'power4.inOut', clearProps: 'transform' }
      );

      const media = row.querySelector<HTMLElement>('.service-media');
      const title = row.querySelector<HTMLElement>('.service-title');
      const copy = row.querySelector<HTMLElement>('.service-copy');

      if (media) {
        gsap.fromTo(media, { opacity: 0.72, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.62, ease: 'power3.out' });
      }
      if (title) {
        gsap.fromTo(title, { opacity: 0.72 }, { opacity: 1, duration: 0.45, ease: 'power2.out' });
      }
      if (copy && i === next) {
        gsap.fromTo(copy, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.18, ease: 'power2.out' });
      }
    });

    activeIndex.current = next;
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
          onMouseEnter={() => animateTo(index)}
          onMouseLeave={() => animateTo(null)}
          onFocus={() => animateTo(index)}
          onBlur={() => animateTo(null)}
          onClick={() => animateTo(activeIndex.current === index ? null : index)}
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
