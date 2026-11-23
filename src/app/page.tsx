import Hero from '@/components/sections/Hero';
import Showreel from '@/components/sections/Showreel';
import SelectedWork from '@/components/sections/SelectedWork';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import ServicesList from '@/components/sections/ServicesList';
import Philosophy from '@/components/sections/Philosophy';
import Process from '@/components/sections/Process';
import AboutSection from '@/components/sections/AboutSection';
import ToolsCapabilities from '@/components/sections/ToolsCapabilities';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import { siteConfig } from '@/data/siteConfig';

export default function Home() {
  const showreelVideoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${siteConfig.showreel.title} — Video Editing & Motion Graphics Reel`,
    description: 'Cinematic video editing and motion graphics showreel by FMTEDITZ (Fikremariyam Tadesse), professional video editor based in Addis Ababa, Ethiopia.',
    thumbnailUrl: [siteConfig.showreel.poster, `${siteConfig.siteUrl}/images/editor.png`],
    uploadDate: `${siteConfig.showreel.year}-01-01T00:00:00+03:00`,
    contentUrl: siteConfig.showreel.videoUrl,
    embedUrl: 'https://www.youtube.com/embed/tDNS0fFzs9Y',
    duration: 'PT45S',
    author: {
      '@id': `${siteConfig.siteUrl}/#person`,
    },
    publisher: {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showreelVideoSchema) }}
      />
      <Hero />
      <Showreel />
      <SelectedWork />
      <BeforeAfterSection />
      <ServicesList />
      <Philosophy />
      <Process />
      <AboutSection />
      <ToolsCapabilities />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
