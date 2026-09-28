'use client';

import { useEffect } from 'react';
import styles from './CameraIntro.module.css';

type CameraIntroProps = {
  onDone: () => void;
};

const FOCUS_POINTS = [
  'tl', 'tc', 'tr',
  'cl', 'center', 'cr',
  'bl', 'bc', 'br'
] as const;

export default function CameraIntro({ onDone }: CameraIntroProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1620);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={styles.darkness} />
      <div className={styles.ambientGlow} />

      <div className={styles.content}>
        <div className={styles.lensAssembly}>
          <div className={styles.lensShadow} />

          <div className={`${styles.barrel} ${styles.barrelBack}`} />
          <div className={`${styles.barrel} ${styles.barrelMidBack}`} />
          <div className={`${styles.barrel} ${styles.barrelMid}`} />
          <div className={`${styles.barrel} ${styles.barrelFront}`} />

          <div className={styles.lensFace}>
            <div className={styles.outerRim} />
            <div className={styles.rimTicks} />
            <div className={styles.wineArc} />

            <div className={styles.topEngraving}>
              WEDDING RIWAZ · EST. 2015 · STORIES IN MOTION
            </div>

            <div className={styles.bottomEngraving}>
              50MM · F1.4 · DELHI NCR
            </div>

            <div className={styles.focusRingOuter} />
            <div className={styles.focusRingInner} />

            <div className={styles.glass}>
              <div className={styles.glassHighlightA} />
              <div className={styles.glassHighlightB} />
              <div className={styles.glassHighlightC} />
              <div className={styles.glassCore} />
            </div>

            <div className={styles.focusPoints}>
              {FOCUS_POINTS.map((point) => (
                <span
                  key={point}
                  className={`${styles.focusPoint} ${styles[point]}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.copy}>
          <span>WEDDING RIWAZ</span>
          <strong>HOLD STILL</strong>
          <small>FRAMING A STORY.</small>
        </div>
      </div>

      <div className={styles.flash} />
    </div>
  );
}
