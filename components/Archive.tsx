import Image from 'next/image';
import { stories } from '@/data/content';

export default function Archive() {
  return <section className="archive">
    <div className="archive-head reveal"><span>THE ARCHIVE</span><h2>People.<br/>Places.<br/><em>Promises.</em></h2></div>
    <div className="archive-grid">
      {stories.map((s, i) => <article className={`archive-card archive-card-${i+1} reveal`} key={s.name}>
        <div className="archive-media"><Image src={s.image} alt={s.name} fill sizes="(max-width: 800px) 90vw, 52vw" /></div>
        <div className="archive-caption"><span>{s.no}</span><strong>{s.name}</strong><small>{s.note}</small></div>
      </article>)}
    </div>
  </section>;
}
