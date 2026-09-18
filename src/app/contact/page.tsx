import ContactSection from '@/components/sections/ContactSection';
import { siteConfig } from '@/data/siteConfig';
import { ShieldCheck, Zap, RefreshCw, UploadCloud } from 'lucide-react';

export const metadata = {
  title: 'Contact // ' + siteConfig.name + ' — Start a Project',
  description: 'Commission video editing, motion design, or documentary projects with FMTEDITZ.',
};

const standards = [
  { icon: Zap, title: 'Fast Turnaround', desc: 'Rush delivery within 48-72 hours for vertical content sprints.' },
  { icon: RefreshCw, title: 'Structured Revisions', desc: 'Frame-accurate feedback via Frame.io or timestamped bullet points.' },
  { icon: UploadCloud, title: 'Seamless Ingestion', desc: 'Multi-terabyte upload links via Google Drive, Dropbox, or LucidLink.' },
  { icon: ShieldCheck, title: 'Complete Master Rights', desc: '4K ProRes deliverables, clean audio stems, XMLs upon completion.' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-void text-white pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-8 sm:mb-12 flex flex-col space-y-3 sm:space-y-4">
        <span className="font-mono text-xs text-studio-cyan tracking-widest uppercase flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
          <span>DIRECT COMMISSION INTAKE</span>
        </span>
        <h1 className="font-display font-black text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white uppercase leading-[0.95]">
          START A PROJECT
        </h1>
        <p className="font-sans text-sm sm:text-lg text-white/70 max-w-2xl leading-relaxed pt-1 sm:pt-2">
          Initiate a commission below, message on{' '}
          <a href={siteConfig.links.whatsapp} target="_blank" rel="noreferrer" className="text-studio-cyan underline hover:text-white transition-colors">
            WhatsApp
          </a>, or reach out directly at{' '}
          <a href={'mailto:' + siteConfig.email} className="text-white underline hover:text-studio-cyan transition-colors">
            {siteConfig.email}
          </a>{' '}
          / <a href={siteConfig.links.phonePrimary} className="text-white underline hover:text-studio-cyan transition-colors">{siteConfig.phone}</a>.
        </p>
      </div>
      <ContactSection />
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-16 sm:pt-24">
        <div className="flex flex-col space-y-2 mb-8 sm:mb-12">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase">// COLLABORATION STANDARDS</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase">HOW WE WORK TOGETHER</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {standards.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="p-5 sm:p-6 rounded-2xl bg-surface/40 border border-white/[0.08] flex flex-col space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-studio-cyan">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight">{s.title}</h3>
                <p className="font-sans text-xs text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
