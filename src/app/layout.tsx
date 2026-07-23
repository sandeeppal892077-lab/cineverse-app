import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'CineVerse - Your Premium Entertainment Universe',
  description: 'Discover movies, series, anime, comics, and more on CineVerse. Premium entertainment at your fingertips.',
  keywords: 'movies, tv shows, anime, streaming, entertainment, web series, comics',
  openGraph: {
    title: 'CineVerse',
    description: 'Your Premium Entertainment Universe',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cv-bg text-cv-text">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
