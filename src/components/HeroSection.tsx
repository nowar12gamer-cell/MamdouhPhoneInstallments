import React from 'react';
import { ShieldCheck, Cpu, ArrowLeft, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { HERO_BANNER_IMG } from '../data/phones';
import { BrandMark } from './BrandMark';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenCalculator,
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-16 overflow-hidden">
      {/* Background radial accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Right Column: Hero Content & Brand Positioning */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* Precision formatting kicker (clean unboxed text, no pill badges) */}
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono tracking-wider">
              <span>علامة تنسيق ممدوح فون</span>
              <span aria-hidden="true">·</span>
              <span>الإصدارات الأصلية 2026</span>
              <span aria-hidden="true">·</span>
              <span>ضمان محلي معتمد</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              أقوى الهواتف الذكية العالمية
              <br />
              <span className="bg-gradient-to-l from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                بدقة التنسيق وأفضل الأسعار
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              في متجر <strong className="text-white font-semibold">ممدوح فون</strong> نضمن لك تجربة شراء احترافية؛ جميع الأجهزة وارد الوكيل بضمان رسمي وفاتورة إلكترونية معتمدة، مع خيارات تقسيط فورية تناسب ميزانيتك.
            </p>

            {/* Formatting Guarantee Badges (Structured grid, strictly no emojis) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold text-white">ضمان 365 يوماً</span>
                </div>
                <p className="text-[11px] text-slate-400">استبدال فوري وصيانة معتمدة</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold text-white">علامة التنسيق</span>
                </div>
                <p className="text-[11px] text-slate-400">تدقيق رقمي متكامل للأجهزة</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <Cpu className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold text-white">معالجات الجيل الأحدث</span>
                </div>
                <p className="text-[11px] text-slate-400">نسخ الشرق الأوسط الأصلية</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-98"
              >
                <span>تصفح الهواتف والعروض</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white font-medium text-sm transition-all"
              >
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <span>حاسبة التقسيط والتنسيق</span>
              </button>
            </div>
          </div>

          {/* Left Column: Visual Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900 shadow-2xl shadow-cyan-500/10 group">
              {/* Product Showcase Image */}
              <img
                src={HERO_BANNER_IMG}
                alt="معرض هواتف ممدوح فون الفاخرة"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-102"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Float Certification Watermark Badge */}
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BrandMark size="sm" />
                  <div>
                    <h2 className="text-xs font-bold text-white">إصدارات التيتانيوم المعتمدة</h2>
                    <p className="text-[10px] text-slate-400">توفر فوري للألوان والسعات كاملة</p>
                  </div>
                </div>

                <div className="text-left font-mono text-xs text-cyan-400 font-bold tabular-nums">
                  تبدأ من 33,800 ج.م
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
