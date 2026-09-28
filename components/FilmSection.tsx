'use client';

import { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/data/content';

const VIDEO_ID = 'X-2XhLJnXLk';

export default function FilmSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="film-section">
      <div className="film-copy">
        <span>WEDDING RIWAZ / MOTION</span>
        <h2>SOME<br/>MEMORIES<br/><em>MOVE.</em></h2>
      </div>

      <div className={`film-frame ${playing ? 'is-playing' : ''}`}>
        {!playing ? (
          <>
            <Image src={assets.wedding} alt="Wedding Riwaz film still" fill sizes="100vw" priority={false}/>
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
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Wedding Riwaz — Sahiba / Varsha & Sushant"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <button className="film-close" aria-label="Close film" onClick={() => setPlaying(false)}>CLOSE ×</button>
          </>
        )}
      </div>
    </section>
  );
}
