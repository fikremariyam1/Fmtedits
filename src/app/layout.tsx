import type { Metadata } from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/data/siteConfig';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { VideoModalProvider } from '@/components/ui/VideoModalContext';
import { getOrganizationAndPersonSchema } from '@/lib/schema';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'Video Editor in Ethiopia | FMTEDITZ — Addis Ababa',
    template: '%s | FMTEDITZ',
  },
  description: siteConfig.heroDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.creator, url: siteConfig.siteUrl }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  keywords: [
    'Video Editor in Ethiopia',
    'Video Editing Services in Ethiopia',
    'Video Editor in Addis Ababa',
    'Professional Video Editor Ethiopia',
    'Video Editing Company Ethiopia',
    'YouTube Video Editor Ethiopia',
    'Short-Form Video Editor',
    'TikTok Video Editor Ethiopia',
    'Instagram Reels Editor',
    'Motion Graphics Designer Ethiopia',
    'After Effects Video Editor',
    'Documentary Video Editor',
    'Commercial Video Editing',
    'Social Media Video Editing Services',
    'Professional Video Editor for Hire',
    'Remote Video Editor',
    'YouTube Video Editing Services',
    'Motion Graphics and Video Editing',
    'Freelance Video Editor',
    'FMTEDITZ',
    'Fikremariyam Tadesse',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'FMTEDITZ — Professional Video Editor in Ethiopia | Addis Ababa & Remote',
    description: 'Video editing & motion graphics in Addis Ababa, Ethiopia. High-retention YouTube essays, short-form viral cuts, cinematic documentaries, and commercial video production.',
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/editor.png',
        width: 1200,
        height: 630,
        alt: 'FMTEDITZ — Fikremariyam Tadesse Professional Video Editor in Addis Ababa, Ethiopia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FMTEDITZ — Video Editor in Ethiopia | Addis Ababa & Remote',
    description: 'High-retention YouTube editing, short-form vertical video, cinematic documentaries, and motion graphics based in Addis Ababa, Ethiopia.',
    creator: '@fmtedits',
    images: ['/images/editor.png'],
  },
  verification: {
    google: 'googlec938aca88f9fa8e5',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [inter.variable, syne.variable, jetbrainsMono.variable].join(' ');
  const orgSchema = getOrganizationAndPersonSchema();

  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
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
