import Hero from '@/components/sections/Hero';
import Showreel from '@/components/sections/Showreel';
import SelectedWork from '@/components/sections/SelectedWork';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import ServicesList from '@/components/sections/ServicesList';
import Philosophy from '@/components/sections/Philosophy';
import Process from '@/components/sections/Process';
import AboutSection from '@/components/sections/AboutSection';
import ToolsCapabilities from '@/components/sections/ToolsCapabilities';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Showreel />
      <SelectedWork />
      <BeforeAfterSection />
      <ServicesList />
      <Philosophy />
      <Process />
      <AboutSection />
      <ToolsCapabilities />
      <ContactSection />
    </div>
  );
}
