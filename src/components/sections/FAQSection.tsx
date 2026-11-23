'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { getFAQSchema } from '@/lib/schema';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  sectionNumber?: string;
  items?: FAQItem[];
  includeSchema?: boolean;
}

export default function FAQSection({
  title = 'FREQUENTLY ASKED QUESTIONS',
  subtitle = 'Clear answers regarding video editing services, rates in Ethiopia, remote delivery, software, and production workflows.',
  sectionNumber = '10 // FAQ',
  items = siteConfig.faqs,
  includeSchema = true,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = includeSchema ? getFAQSchema(items) : null;

  return (
    <section id="faq" className="py-16 md:py-36 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Heading & Context */}
        <div className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-3"
          >
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
              <span>{sectionNumber}</span>
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter text-white uppercase leading-[0.92]">
              {title}
            </h2>
          </motion.div>

          <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed max-w-md">
            {subtitle}
          </p>

          <div className="p-5 rounded-2xl bg-surface/40 border border-white/[0.08] flex flex-col space-y-3 font-mono text-xs">
            <div className="flex items-center space-x-2 text-studio-cyan">
              <HelpCircle className="w-4 h-4" />
              <span className="uppercase tracking-widest text-[11px] font-bold">NEED A CUSTOM QUOTE?</span>
            </div>
            <p className="text-white/60 text-[11px] leading-relaxed">
              Every video project is unique. Share your footage link, target platform, and deadline for a prompt, transparent quote.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-studio-cyan text-black hover:bg-[#1ae4ee] font-bold uppercase tracking-wider text-[11px] transition-all"
              >
                <span>REQUEST QUOTE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full border border-white/20 hover:border-white/50 text-white uppercase tracking-wider text-[11px] transition-all"
              >
                <span>WHATSAPP CHAT</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-surface/60 border-studio-cyan/40 shadow-[0_0_25px_rgba(0,194,203,0.08)]'
                    : 'bg-surface/30 border-white/[0.08] hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight flex items-center space-x-3">
                    <span className="font-mono text-xs text-studio-cyan/70 font-normal">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-studio-cyan text-black border-studio-cyan rotate-180'
                        : 'bg-white/5 text-white/50 border-white/10'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-white/70 font-sans text-xs sm:text-sm leading-relaxed border-t border-white/[0.06]">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
