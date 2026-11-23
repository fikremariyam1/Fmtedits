import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { projects } from '@/data/projects';
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Film,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  Monitor,
  Zap,
  Phone,
  MessageCircle,
  FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Video Editor in Ethiopia | Professional Video Editing Addis Ababa',
  description:
    'FMTEDITZ is a premier video editing service based in Addis Ababa, Ethiopia, founded by Fikremariyam Tadesse. Specializing in YouTube video editing, short-form TikTok/Reels, documentary storytelling, commercial ads, and motion graphics for Ethiopian and international clients.',
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
    'Freelance Video Editor Ethiopia',
    'Fikremariyam Tadesse',
    'FMTEDITZ',
  ],
  alternates: {
    canonical: '/video-editor-ethiopia',
  },
  openGraph: {
    title: 'Video Editor in Ethiopia | Addis Ababa Video Editing Services | FMTEDITZ',
    description:
      'Professional video editing and motion graphics in Addis Ababa, Ethiopia. High-retention YouTube editing, short-form social content, and cinematic documentary cuts by Fikremariyam Tadesse.',
    url: `${siteConfig.siteUrl}/video-editor-ethiopia`,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/editor.png',
        width: 1200,
        height: 630,
        alt: 'FMTEDITZ — Professional Video Editor in Addis Ababa, Ethiopia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Editor in Ethiopia | Addis Ababa Video Editing | FMTEDITZ',
    description:
      'Cinema-grade video editing, motion design, and high-retention pacing in Addis Ababa, Ethiopia.',
    creator: '@fmtedits',
    images: ['/images/editor.png'],
  },
};

const serviceTiers = [
  {
    title: 'YouTube Video Editing & Documentaries',
    subtitle: 'High-Retention Long-Form Craft',
    description:
      'Pacing structured to maximize Average View Duration (AVD). Comprehensive editing combining archival research, multi-track narrative cutting, historical motion graphics maps, and immersive audio engineering.',
    deliverables: ['Custom Historical Maps', 'Chapter Architecture', 'Audio Stems & Sound Foley', 'Color Grading'],
    idealFor: 'YouTube essayists, documentary filmmakers, educational creators, media channels',
  },
  {
    title: 'Vertical Short-Form Video Editing',
    subtitle: 'TikTok, Instagram Reels & YouTube Shorts',
    description:
      'Engineered for the 0.7-second retention hook. Dynamic micro-cuts, sound-reactive kinetic subtitles, animated emoji/callouts, and visual pattern interrupts designed for exponential organic reach.',
    deliverables: ['Sub-Second Hooks', 'Animated Word-by-Word Captions', 'Sound FX Layering', 'Seamless Looping'],
    idealFor: 'Personal brands, content creators, e-commerce stores, social media influencers',
  },
  {
    title: 'Commercial Ads & Brand Storytelling',
    subtitle: 'Direct-Response & Brand Recall',
    description:
      'High-impact commercials crafted to drive viewer action. Sleek product visualizers, screen mockups, brand typography, and persuasive pacing for digital paid campaigns.',
    deliverables: ['Multi-Ratio Exports (9:16 & 16:9)', 'SaaS UI Animations', 'Conversion Pacing', 'Master ProRes'],
    idealFor: 'Startups, technology brands, corporate organizations, agency campaigns',
  },
  {
    title: '2D / 3D Motion Graphics & VFX',
    subtitle: 'Kinetic Design & Visual Explanations',
    description:
      'Turning raw concepts and data into captivating visual explanations. Custom visual HUDs, 3D camera tracking, screen replacement, and bespoke kinetic motion that sets your content apart from template users.',
    deliverables: ['3D Camera Tracking', 'Kinetic Typography', 'Planar Screen Replacement', 'Custom Badges & HUDs'],
    idealFor: 'Tech channels, investigative journalists, financial explainers, corporate showcases',
  },
];

const targetAudiences = [
  {
    title: 'Ethiopian Content Creators & YouTubers',
    desc: 'Take your channel to international production standards with high-retention editing, cinematic color science, and seamless pacing that turns casual viewers into loyal subscribers.',
  },
  {
    title: 'Businesses & Startups in Addis Ababa',
    desc: 'Showcase your products, apps, and services with sleek commercial editing and motion graphics that demand attention on LinkedIn, Instagram, TikTok, and television.',
  },
  {
    title: 'NGOs & Development Organizations',
    desc: 'Communicate human-centered impact stories, field reportages, and donor overviews through respectful, emotionally resonant documentary video editing.',
  },
  {
    title: 'International Clients & Diaspora Creators',
    desc: 'Access world-class video editing and motion design from an English-fluent, highly technical editor operating with dependable turnaround times and global delivery standards.',
  },
];

const ethiopiaFaqs = [
  {
    question: 'How do I hire FMTEDITZ for video editing in Addis Ababa or Ethiopia?',
    answer:
      'Hiring FMTEDITZ is straightforward. Reach out via WhatsApp (+251 970 699 570), Telegram (@Fmteditz), direct phone call (+251 786 458 717), or by submitting your project brief through the contact form below. We will discuss your vision, footage volume, target delivery date, and provide a clear quotation within 24 hours.',
  },
  {
    question: 'How do we transfer large raw video footage in Ethiopia?',
    answer:
      'We accommodate common local and international transfer methods. You can share raw assets via cloud storage links (Google Drive, Dropbox, WeTransfer, OneDrive, or LucidLink). For local Addis Ababa projects with multi-terabyte raw camera rushes (e.g. 4K ProRes or RAW), physical SSD/hard drive handoffs can also be arranged.',
  },
  {
    question: 'How much does professional video editing cost in Ethiopia?',
    answer:
      'Video editing pricing in Ethiopia depends entirely on project complexity, format (short-form reels vs. long-form documentary), motion design intensity, and turnaround speed. Rather than fixed rates that compromise on quality, FMTEDITZ provides personalized project-based quotes. Contact us with your project details to receive an exact quotation.',
  },
  {
    question: 'What types of Ethiopian video projects have you worked on?',
    answer:
      'FMTEDITZ has edited major historical and narrative YouTube documentaries for prominent Ethiopian creators, including comprehensive investigative documentaries on Emperor Tewodros II and Emperor Menelik II for Aymen Asfaw (@aymenasfaw), alongside tech product comparisons, brand commercials, and high-retention short-form content.',
  },
  {
    question: 'Do you work with international clients outside Ethiopia?',
    answer:
      'Yes. Over 50% of our portfolio consists of international commissions. We operate seamlessly across time zones with clients in the United States, Europe, and the Middle East, using Frame.io for frame-accurate timestamped review cycles.',
  },
  {
    question: 'What is your typical turnaround time for an edit?',
    answer:
      'Standard turnaround for short-form video content (TikTok/Reels/Shorts) is 48 to 72 hours. Long-form YouTube essays and documentaries typically take 4 to 7 business days depending on motion graphics and archival asset volume.',
  },
];

export default function VideoEditorEthiopiaPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Video Editor Ethiopia', url: '/video-editor-ethiopia' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const localServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Professional Video Editing Services in Ethiopia',
    provider: {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
    areaServed: [
      { '@type': 'City', name: 'Addis Ababa' },
      { '@type': 'Country', name: 'Ethiopia' },
    ],
    description:
      'Professional video editing and motion graphics services in Addis Ababa, Ethiopia. Specializing in YouTube video editing, documentary films, short-form viral content, and commercial brand advertising.',
    serviceType: 'Video Editing and Post-Production',
  };

  return (
    <div className="min-h-screen bg-void text-white pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-6 sm:mb-8 flex items-center space-x-2 font-mono text-xs text-white/50">
        <Link href="/" className="hover:text-studio-cyan transition-colors">
          HOME
        </Link>
        <span>/</span>
        <span className="text-white/80">VIDEO EDITOR ETHIOPIA</span>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-16 sm:mb-24">
        <div className="flex flex-col space-y-4 sm:space-y-6 max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-studio-cyan tracking-widest uppercase">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-studio-cyan/10 border border-studio-cyan/30 text-[10px] sm:text-xs">
              <MapPin className="w-3.5 h-3.5 text-studio-cyan" />
              <span>ADDIS ABABA, ETHIOPIA // GLOBAL REMOTE</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/60">POST-PRODUCTION &amp; MOTION DESIGN</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white uppercase leading-[0.95]">
            PROFESSIONAL VIDEO EDITOR <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-studio-cyan">
              IN ETHIOPIA
            </span>
          </h1>

          <p className="font-sans text-base sm:text-xl text-white/80 max-w-3xl leading-relaxed">
            Founded by <strong>Fikremariyam Tadesse</strong>, <strong>FMTEDITZ</strong> delivers high-retention video
            editing, cinematic storytelling, and bespoke 2D/3D motion graphics from Addis Ababa, Ethiopia for creators,
            enterprises, and global brands.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-studio-cyan text-black hover:bg-[#1ae4ee] font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(0,194,203,0.3)] transition-all"
            >
              <span>COMMISSION AN EDIT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-white font-mono text-xs tracking-widest uppercase transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WHATSAPP: {siteConfig.phone}</span>
            </a>

            <a
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-full bg-[#229ED9]/15 hover:bg-[#229ED9]/25 border border-[#229ED9]/40 text-white font-mono text-xs tracking-widest uppercase transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#229ED9]" />
              <span>TELEGRAM: @FMTEDITZ</span>
            </a>
          </div>
        </div>
      </section>

      {/* Local Value Proposition Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-20 sm:mb-28">
        <div className="p-6 sm:p-10 md:p-12 rounded-3xl bg-surface/30 border border-white/[0.1] relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 font-mono text-xs">
            <div className="flex flex-col space-y-2">
              <span className="text-studio-cyan uppercase tracking-widest text-[10px]">// STUDIO LOCATION</span>
              <span className="text-white text-base sm:text-lg font-bold font-display">Addis Ababa, Ethiopia</span>
              <p className="text-white/60 font-sans text-xs leading-relaxed">
                Operating locally in Addis Ababa with full remote infrastructure for domestic and global collaborations.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-studio-cyan uppercase tracking-widest text-[10px]">// SPECIALIZATION</span>
              <span className="text-white text-base sm:text-lg font-bold font-display">Attention &amp; Retention Pacing</span>
              <p className="text-white/60 font-sans text-xs leading-relaxed">
                Crafting video cuts that capture attention in 0.7 seconds and maintain high average view duration throughout.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-studio-cyan uppercase tracking-widest text-[10px]">// PRODUCTION QUALITY</span>
              <span className="text-white text-base sm:text-lg font-bold font-display">4K DCI &amp; Cinema Science</span>
              <p className="text-white/60 font-sans text-xs leading-relaxed">
                ProRes master exports, multi-track audio mastering, and DaVinci Resolve color transforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-20 sm:mb-28">
        <div className="flex flex-col space-y-3 mb-10 sm:mb-14">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>01 // SERVICES IN ETHIOPIA</span>
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
            COMPREHENSIVE VIDEO EDITING SERVICES
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Every project is edited with intention. We don’t use generic cookie-cutter templates—every cut, sound hit,
            and motion element is tailored to your brand narrative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {serviceTiers.map((s, idx) => (
            <div
              key={s.title}
              className="p-6 sm:p-8 rounded-2xl bg-surface/40 border border-white/[0.08] hover:border-studio-cyan/30 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="flex flex-col space-y-3">
                <span className="font-mono text-xs text-studio-cyan">0{idx + 1} // POST-PRODUCTION</span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">{s.title}</h3>
                <span className="font-mono text-xs text-white/50">{s.subtitle}</span>
                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed pt-1">{s.description}</p>
              </div>

              <div className="flex flex-col space-y-3 pt-3 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-1.5">
                  {s.deliverables.map((d) => (
                    <span
                      key={d}
                      className="font-mono text-[9px] sm:text-[10px] uppercase px-2.5 py-1 bg-white/[0.04] border border-white/10 text-white/70 rounded"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] font-mono text-white/50 pt-1">
                  <span className="text-studio-cyan">IDEAL FOR:</span> {s.idealFor}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who the Services Are For */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-20 sm:mb-28">
        <div className="flex flex-col space-y-3 mb-10 sm:mb-14">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>02 // TARGET CLIENTELE</span>
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
            WHO WE COLLABORATE WITH
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Whether you are an established creator in Addis Ababa, an Ethiopian company scaling digital marketing, or an
            international agency needing remote post-production, we provide reliable technical execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {targetAudiences.map((aud) => (
            <div
              key={aud.title}
              className="p-5 sm:p-6 rounded-2xl bg-surface/30 border border-white/[0.08] flex flex-col space-y-3 hover:border-white/20 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-studio-cyan/10 border border-studio-cyan/20 flex items-center justify-center text-studio-cyan">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">{aud.title}</h3>
              <p className="font-sans text-xs text-white/60 leading-relaxed">{aud.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Editing Workflow in Ethiopia */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-20 sm:mb-28">
        <div className="flex flex-col space-y-3 mb-10 sm:mb-14">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>03 // WORKFLOW</span>
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
            OUR EDITING PROCESS
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            A battle-tested 4-stage pipeline that removes guesswork, aligns expectations, and delivers cinema-grade results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {siteConfig.process.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-surface/40 border border-white/[0.08] flex flex-col space-y-3 relative"
            >
              <span className="font-mono text-xs text-studio-cyan tracking-widest">{step.step} // STAGE</span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">{step.title}</h3>
              <p className="font-mono text-[11px] text-white/50">{step.subtitle}</p>
              <p className="font-sans text-xs text-white/70 leading-relaxed pt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Software Arsenal & Technical Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-20 sm:mb-28">
        <div className="flex flex-col space-y-3 mb-10 sm:mb-14">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>04 // ARSENAL</span>
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
            SOFTWARE &amp; TECHNICAL CAPABILITIES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface/30 border border-white/[0.08] flex flex-col space-y-4">
            <span className="font-mono text-xs text-studio-cyan uppercase tracking-wider">// INDUSTRY-STANDARD SOFTWARE</span>
            <div className="divide-y divide-white/[0.08]">
              {siteConfig.tools.map((t) => (
                <div key={t.name} className="py-3 flex items-center justify-between font-mono text-xs">
                  <span className="text-white font-bold">{t.name}</span>
                  <span className="text-white/50 text-[11px] text-right">{t.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface/30 border border-white/[0.08] flex flex-col space-y-4">
            <span className="font-mono text-xs text-studio-cyan uppercase tracking-wider">// PRODUCTION CAPABILITIES</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteConfig.capabilities.map((c) => (
                <div key={c.title} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col space-y-1">
                  <span className="font-display font-bold text-xs text-white">{c.title}</span>
                  <span className="font-sans text-[11px] text-white/60 leading-snug">{c.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-20 sm:mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="flex flex-col space-y-2">
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
              <span>05 // CASE STUDIES</span>
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
              SELECTED ETHIOPIAN &amp; GLOBAL WORK
            </h2>
          </div>
          <Link
            href="/#work"
            className="font-mono text-xs text-studio-cyan hover:underline flex items-center space-x-1 uppercase"
          >
            <span>VIEW ALL {projects.length} PROJECTS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              href={`/work/${p.slug}`}
              className="group p-5 rounded-2xl bg-surface/40 border border-white/[0.08] hover:border-studio-cyan/40 transition-all flex flex-col space-y-4"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <img
                  src={p.posterImage}
                  alt={`${p.title} — Video edited by FMTEDITZ in Ethiopia`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[9px] text-studio-cyan uppercase">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <h3 className="font-display font-bold text-base text-white group-hover:text-studio-cyan transition-colors">
                  {p.title}
                </h3>
                <p className="font-sans text-xs text-white/60 line-clamp-2 leading-relaxed">{p.oneLiner}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How to Hire FMTEDITZ in Ethiopia */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-20 sm:mb-28">
        <div className="p-8 sm:p-12 rounded-3xl bg-surface/40 border border-white/[0.1] flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <span className="font-mono text-xs text-studio-cyan uppercase tracking-widest">// HOW TO HIRE US</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">
              GETTING STARTED ON YOUR PROJECT
            </h2>
            <p className="font-sans text-sm text-white/70 max-w-2xl leading-relaxed">
              We collaborate with clients in Addis Ababa and internationally via straightforward, transparent communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="flex flex-col space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-studio-cyan font-bold text-sm">01. REACH OUT</span>
              <p className="text-white/70 font-sans text-xs leading-relaxed">
                Send a message with your project overview, footage link, and timeline via WhatsApp, Telegram, or our contact form.
              </p>
            </div>
            <div className="flex flex-col space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-studio-cyan font-bold text-sm">02. QUOTE &amp; SCOPE</span>
              <p className="text-white/70 font-sans text-xs leading-relaxed">
                Receive a clear, tailored quotation and timeline breakdown within 24 hours. No hidden fees or ambiguous scopes.
              </p>
            </div>
            <div className="flex flex-col space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-studio-cyan font-bold text-sm">03. EDIT &amp; REFINE</span>
              <p className="text-white/70 font-sans text-xs leading-relaxed">
                Review rough and fine cuts with frame-accurate timestamped feedback, concluding with full 4K ProRes master deliveries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQ Section */}
      <FAQSection
        title="VIDEO EDITING IN ETHIOPIA — FAQS"
        subtitle="Frequently asked questions about hiring a video editor in Addis Ababa, pricing, raw footage transfers, and international collaboration."
        sectionNumber="06 // LOCAL FAQS"
        items={ethiopiaFaqs}
        includeSchema={true}
      />

      {/* Direct Contact Section */}
      <ContactSection />
    </div>
  );
}
