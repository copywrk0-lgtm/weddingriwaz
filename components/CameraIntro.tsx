'use client';

import { useEffect } from 'react';
import styles from './CameraIntro.module.css';

type CameraIntroProps = {
  onDone: () => void;
};

export default function CameraIntro({ onDone }: CameraIntroProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1420);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={styles.black} />

      <div className={styles.viewfinder}>
        <div className={styles.topMeta}>
          <span>WR / 001</span>
          <span>EST. 2015</span>
        </div>

        <span className={`${styles.corner} ${styles.tl}`} />
        <span className={`${styles.corner} ${styles.tr}`} />
        <span className={`${styles.corner} ${styles.bl}`} />
        <span className={`${styles.corner} ${styles.br}`} />

        <div className={styles.focusZone}>
          <span className={`${styles.focusCorner} ${styles.focusTl}`} />
          <span className={`${styles.focusCorner} ${styles.focusTr}`} />
          <span className={`${styles.focusCorner} ${styles.focusBl}`} />
          <span className={`${styles.focusCorner} ${styles.focusBr}`} />
          <span className={styles.focusDot} />
        </div>

        <div className={styles.exposureLine}>
          <span />
          <span />
          <span />
          <span className={styles.exposureActive} />
          <span />
          <span />
          <span />
        </div>

        <div className={styles.bottomMeta}>
          <span>1/125</span>
          <span>F1.4</span>
          <span>ISO 200</span>
        </div>

        <div className={styles.hold}>
          <strong>HOLD STILL</strong>
          <small>FRAMING A STORY</small>
        </div>
      </div>

      <div className={styles.flash} />
    </div>
  );
}
