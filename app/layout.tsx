import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wedding Riwaz — Stories Before They Become Memories',
  description: 'Editorial concept for Wedding Riwaz — wedding photography and films, Gurgaon / Delhi NCR.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
