'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CameraIntro({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const camera = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: onDone });

    tl.fromTo(
      camera.current,
      { opacity: 0, scale: 0.86, rotateX: -8, rotateY: 14, y: 14 },
      { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, y: 0, duration: 0.34, ease: 'power4.out' }
    )
      .fromTo('.camera-shadow', { opacity: 0, scaleX: 0.65 }, { opacity: 0.7, scaleX: 1, duration: 0.34 }, 0)
      .fromTo('.focus-corners', { opacity: 0, scale: 1.3 }, { opacity: 0.9, scale: 1, duration: 0.22 }, 0.32)
      .to('.focus-ring', { rotate: 17, duration: 0.2, ease: 'power2.inOut' }, 0.48)
      .to('.lens-glass', { scale: 0.95, filter: 'brightness(.72)', duration: 0.1, yoyo: true, repeat: 1 }, 0.55)
      .to('.focus-corners', { scale: 0.82, opacity: 0.25, duration: 0.1, yoyo: true, repeat: 1 }, 0.57)
      .to(camera.current, { y: 4, rotateX: 1.6, duration: 0.045, yoyo: true, repeat: 1 }, 0.8)
      .to('.shutter-button', { y: 3, duration: 0.035, yoyo: true, repeat: 1 }, 0.79)
      .set(flash.current, { display: 'block' }, 0.83)
      .to(flash.current, { opacity: 1, duration: 0.035 }, 0.83)
      .to(camera.current, { opacity: 0, scale: 1.04, duration: 0.015 }, 0.845)
      .to('.camera-shadow', { opacity: 0, duration: 0.03 }, 0.845)
      .to(flash.current, { opacity: 0, duration: 0.72, ease: 'power2.out' }, 0.89)
      .to(root.current, { opacity: 0, duration: 0.14 }, 1.43);

    return () => tl.kill();
  }, [onDone]);

  return (
    <div className="camera-intro" ref={root}>
      <div className="camera-rig" ref={camera}>
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
      <div className="flash-layer" ref={flash}/>
    </div>
  );
}
