import type { Metadata } from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/data/siteConfig';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { VideoModalProvider } from '@/components/ui/VideoModalContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: siteConfig.name + ' — Video Editor & Motion Graphics Designer',
  description: siteConfig.heroDescription,
  keywords: ['Video Editor','Motion Graphics','FMTEDITZ','Fikremariyam Tadesse','YouTube Editor','Documentary Editing'],
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  openGraph: {
    title: siteConfig.name + ' — I EDIT ATTENTION',
    description: siteConfig.heroDescription,
    url: 'https://fmteditz.com',
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name + ' — Video Editor & Motion Designer',
    description: siteConfig.heroDescription,
  },
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
    ],
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [inter.variable, syne.variable, jetbrainsMono.variable].join(' ');
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <body className="bg-void text-offwhite font-sans selection:bg-white selection:text-black antialiased relative" suppressHydrationWarning>
        <div className="film-grain" aria-hidden="true" />
        <VideoModalProvider>
          <SmoothScroll>
            <CustomCursor />
            <Navigation />
            <main className="relative z-10">{children}</main>
            <Footer />
          </SmoothScroll>
        </VideoModalProvider>
      </body>
    </html>
  );
}
