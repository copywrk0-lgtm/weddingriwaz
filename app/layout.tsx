import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wedding Riwaz — Editorial Concept',
  description: 'A cinematic editorial website concept for Wedding Riwaz.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
