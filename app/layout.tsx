import type { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ANGLR — Fishing App',
    template: '%s | ANGLR',
  },
  description: 'The smarter fishing companion. Log catches, track hotspots, and level up your angling.',
  applicationName: 'ANGLR',
  keywords: ['fishing', 'fishing app', 'catch log', 'fishing spots', 'angling'],
  authors: [{ name: 'ANGLR' }],
  robots: 'noindex, nofollow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060d1a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="ocean-bg min-h-screen antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
