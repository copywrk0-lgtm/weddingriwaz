import Image from 'next/image';
import { assets } from '@/data/content';

export default function Contact() {
  return <section className="contact" id="contact"><div className="contact-image"><Image src={assets.brideWarm} alt="Wedding Riwaz bride" fill sizes="(max-width: 800px) 100vw, 50vw"/></div><div className="contact-copy"><span>THE NEXT STORY</span><h2>YOURS<br/>IS NEXT.</h2><p>Tell us where it begins.</p><a href="https://wa.me/919289727321" target="_blank" rel="noreferrer">START A CONVERSATION ↗</a><div className="contact-small"><span>WEDDING RIWAZ</span><span>DELHI NCR / INDIA</span><span>EST. 2015</span></div></div></section>;
}
