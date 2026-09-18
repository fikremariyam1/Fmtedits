'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { Send, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const projectTypes = ['YouTube / Long-Form', 'Short-Form / 9:16', 'Documentary', 'Motion Graphics', 'Commercial Ad', 'Brand Film', 'Other'];
const budgets = ['< $500', '$500–$1.5k', '$1.5k–$5k', '$5k–$15k', '$15k+'];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', budget: '', message: '', timeline: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSelect = (field: string, value: string) => setForm(f => ({ ...f, [field]: f[field as keyof typeof f] === value ? '' : value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setSubmitted(true); }, 1500);
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center flex flex-col items-center space-y-6 py-24">
          <CheckCircle2 className="w-16 h-16 text-emerald-400" />
          <h3 className="font-display font-black text-4xl text-white uppercase">TRANSMISSION RECEIVED</h3>
          <p className="font-sans text-base text-white/70 leading-relaxed">Your brief has been logged. Expect a personalized response within 24 hours. For urgent projects, contact <a href={'mailto:' + siteConfig.email} className="text-white underline">{siteConfig.email}</a> directly.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 md:py-36 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
        <div className="lg:col-span-4 flex flex-col space-y-6 sm:space-y-8">
          <div className="flex flex-col space-y-2 sm:space-y-3">
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
              <span>09 // COMMISSION</span>
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tighter text-white uppercase leading-[0.92]">
              START A PROJECT
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed">
            Describe your project in detail. The more context you provide, the more accurate and tailored your production quote will be.
          </p>
          <div className="flex flex-col space-y-4 font-mono text-xs">
            <div className="flex flex-col space-y-1">
              <span className="text-white/40 uppercase tracking-widest text-[10px]">RESPONSE TIME</span>
              <span className="text-white">Within 24 hours, guaranteed</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-white/40 uppercase tracking-widest text-[10px]">DIRECT EMAIL</span>
              <a href={'mailto:' + siteConfig.email} className="text-white hover:text-studio-cyan transition-colors flex items-center space-x-1.5 break-all">
                <span>{siteConfig.email}</span>
                <ArrowUpRight className="w-3 h-3 text-studio-cyan shrink-0" />
              </a>
            </div>
            <div className="flex flex-col space-y-2 pt-1">
              <span className="text-white/40 uppercase tracking-widest text-[10px]">INSTANT MESSAGING</span>
              <div className="grid grid-cols-1 gap-2">
                <a
                  href="https://wa.me/251970699570?text=Hi%20FMTEDITZ%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20commission%20a%20video%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-3.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-white transition-all duration-200 active:scale-[0.99]"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
                    <span className="font-mono text-xs font-semibold text-white">WhatsApp: +251 970 699 570</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#25D366] font-bold tracking-wider uppercase group-hover:translate-x-0.5 transition-transform flex items-center space-x-1">
                    <span>CHAT</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>
                <a
                  href="https://t.me/Fmteditz"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-3.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 text-white transition-all duration-200 active:scale-[0.99]"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#229ED9] animate-pulse shrink-0" />
                    <span className="font-mono text-xs font-semibold text-white">Telegram: @Fmteditz</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#229ED9] font-bold tracking-wider uppercase group-hover:translate-x-0.5 transition-transform flex items-center space-x-1">
                    <span>OPEN CHAT</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/fmtedits"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-3.5 rounded-xl bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/30 text-white transition-all duration-200 active:scale-[0.99]"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E1306C] animate-pulse shrink-0" />
                    <span className="font-mono text-xs font-semibold text-white">Instagram: @fmtedits</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#E1306C] font-bold tracking-wider uppercase group-hover:translate-x-0.5 transition-transform flex items-center space-x-1">
                    <span>FOLLOW / DM</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>
              </div>
            </div>

            <div className="flex flex-col space-y-2 pt-1">
              <span className="text-white/40 uppercase tracking-widest text-[10px]">DIRECT PHONE LINES</span>
              <div className="flex flex-col space-y-1.5 font-mono text-xs">
                <a href="tel:+251970699570" className="text-white/90 hover:text-studio-cyan transition-colors flex items-center justify-between py-1 border-b border-white/[0.06]">
                  <span>+251 970 699 570</span>
                  <span className="text-[10px] text-white/40 uppercase">Primary / WhatsApp</span>
                </a>
                <a href="tel:+251786458717" className="text-white/90 hover:text-studio-cyan transition-colors flex items-center justify-between py-1 border-b border-white/[0.06]">
                  <span>+251 786 458 717</span>
                  <span className="text-[10px] text-white/40 uppercase">Secondary Direct</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col space-y-1 pt-1">
              <span className="text-white/40 uppercase tracking-widest text-[10px]">CREATIVE PLATFORMS</span>
              <div className="flex flex-wrap gap-2 pt-0.5">
                <a href={siteConfig.links.upwork} target="_blank" rel="noreferrer" className="text-white/80 hover:text-studio-cyan transition-colors bg-white/[0.04] border border-white/10 px-3 py-1 rounded text-[11px]">Upwork</a>
                <a href={siteConfig.links.fiverr} target="_blank" rel="noreferrer" className="text-white/80 hover:text-studio-cyan transition-colors bg-white/[0.04] border border-white/10 px-3 py-1 rounded text-[11px]">Fiverr</a>
                <a href="https://t.me/Fmteditz" target="_blank" rel="noreferrer" className="text-white/80 hover:text-studio-cyan transition-colors bg-white/[0.04] border border-white/10 px-3 py-1 rounded text-[11px]">Telegram (@Fmteditz)</a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ name: 'name', label: 'FULL NAME', placeholder: 'Your name', type: 'text' }, { name: 'email', label: 'EMAIL ADDRESS', placeholder: 'hello@example.com', type: 'email' }].map((f) => (
              <div key={f.name} className="flex flex-col space-y-2">
                <label className="font-mono text-[11px] text-white/50 tracking-widest uppercase">{f.label} *</label>
                <input required type={f.type} name={f.name} value={form[f.name as keyof typeof form]} onChange={handleChange} placeholder={f.placeholder} className="w-full bg-surface/60 border border-white/[0.12] focus:border-studio-cyan/50 rounded-xl px-4 py-3.5 sm:py-4 text-white font-sans text-base sm:text-sm placeholder-white/30 outline-none transition-colors duration-200" />
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-mono text-[11px] text-white/50 tracking-widest uppercase">PROJECT TYPE</label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {projectTypes.map((pt) => (
                <button key={pt} type="button" onClick={() => handleSelect('projectType', pt)} className={`font-mono text-[10px] sm:text-[11px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border transition-all duration-150 uppercase tracking-wide ${form.projectType === pt ? 'bg-studio-cyan text-black border-studio-cyan font-bold' : 'bg-transparent text-white/60 border-white/15 hover:border-white/40'}`}>{pt}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-mono text-[11px] text-white/50 tracking-widest uppercase">PRODUCTION BUDGET</label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {budgets.map((b) => (
                <button key={b} type="button" onClick={() => handleSelect('budget', b)} className={`font-mono text-[10px] sm:text-[11px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border transition-all duration-150 ${form.budget === b ? 'bg-studio-cyan text-black border-studio-cyan font-bold' : 'bg-transparent text-white/60 border-white/15 hover:border-white/40'}`}>{b}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-mono text-[11px] text-white/50 tracking-widest uppercase">TIMELINE / DEADLINE</label>
            <input type="text" name="timeline" value={form.timeline} onChange={handleChange} placeholder="e.g. Urgent — 48h, 2 weeks, or end of month" className="w-full bg-surface/60 border border-white/[0.12] focus:border-studio-cyan/50 rounded-xl px-4 py-3.5 sm:py-4 text-white font-sans text-base sm:text-sm placeholder-white/30 outline-none transition-colors duration-200" />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-mono text-[11px] text-white/50 tracking-widest uppercase">PROJECT BRIEF *</label>
            <textarea required name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Describe your project, goals, target audience, reference videos, and any specific requirements..." className="w-full bg-surface/60 border border-white/[0.12] focus:border-studio-cyan/50 rounded-xl px-4 py-3.5 sm:py-4 text-white font-sans text-base sm:text-sm placeholder-white/30 outline-none transition-colors duration-200 resize-none" />
          </div>

          <button type="submit" disabled={isLoading} className="w-full sm:w-auto self-start inline-flex items-center justify-center space-x-3 px-8 py-4 sm:py-5 rounded-full bg-studio-cyan text-black hover:bg-[#1be2ec] active:scale-95 font-mono text-xs tracking-widest uppercase font-bold transition-all duration-200 disabled:opacity-70 shadow-[0_0_30px_rgba(0,194,203,0.3)]">
            {isLoading ? <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /><span>TRANSMITTING...</span></> : <><Send className="w-4 h-4" /><span>SEND BRIEF</span></>}
          </button>
        </form>
      </div>
    </section>
  );
}
