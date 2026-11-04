import React from 'react';
import { Search, ShoppingBag, Scale, SlidersHorizontal, Calculator } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  cartCount: number;
  comparisonCount: number;
  onOpenCart: () => void;
  onOpenComparison: () => void;
  onOpenCalculator: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  comparisonCount,
  onOpenCart,
  onOpenComparison,
  onOpenCalculator,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  activeCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all">
      {/* Precision Top Notification Bar (Clean text, no emojis) */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border-b border-cyan-900/30 text-xs py-1.5 px-4 text-center text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline text-cyan-400 font-medium">
            علامة التنسيق الذهبية: ضمان محلي معتمد مع استبدال فوري
          </span>
          <span className="mx-auto sm:mx-0">
            شحن مجاني لكافة محافظات مصر للطلبات التي تتجاوز 25,000 ج.م
          </span>
          <button
            onClick={onOpenCalculator}
            className="hidden md:inline-flex items-center gap-1 text-cyan-300 hover:text-white transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>حاسبة التقسيط</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#hero" className="shrink-0 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg">
          <BrandMark size="md" showSubtitle={false} />
        </a>

        {/* Zone 2: Navigation Links (single-line, clean typography) */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectCategory('all')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeCategory === 'all' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            جميع الهواتف
          </button>
          <button
            onClick={() => onSelectCategory('flagship')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeCategory === 'flagship' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            الفئة الرائدة
          </button>
          <button
            onClick={() => onSelectCategory('foldable')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeCategory === 'foldable' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            الأجهزة القابلة للطي
          </button>
          <button
            onClick={() => onSelectCategory('accessories')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeCategory === 'accessories' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            الإكسسوارات والساعات
          </button>
          <a
            href="#guarantee"
            className="transition-colors whitespace-nowrap hover:text-white text-slate-400"
          >
            الضمان والتنسيق
          </a>
        </nav>

        {/* Zone 3: Interactive Affordances (Search, Comparison, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Search Input */}
          <div className="relative hidden md:block w-36 lg:w-48">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن هاتف..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pr-8 pl-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Installment Calculator Button */}
          <button
            onClick={onOpenCalculator}
            title="حاسبة التقسيط والتنسيق"
            aria-label="فتح حاسبة التقسيط"
            className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
          >
            <Calculator className="w-4 h-4" />
          </button>

          {/* Comparison Modal Button */}
          <button
            onClick={onOpenComparison}
            title="مقارنة الهواتف"
            aria-label="مقارنة الهواتف المختارة"
            className="relative p-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
          >
            <Scale className="w-4 h-4" />
            {comparisonCount > 0 && (
              <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {comparisonCount}
              </span>
            )}
          </button>

          {/* WhatsApp Direct Contact Button */}
          <a
            href="https://wa.me/201128365101?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D9%85%D8%AA%D8%AC%D8%B1%20%D9%85%D9%85%D8%AF%D9%88%D8%AD%20%D9%81%D9%88%D9%86%20(%D8%A5%D8%AF%D9%83%D9%88)"
            target="_blank"
            rel="noopener noreferrer"
            title="تواصل فوري عبر واتساب"
            aria-label="تواصل فوري عبر واتساب ممدوح فون"
            className="p-2.5 rounded-lg border border-emerald-900/60 bg-emerald-950/40 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="سلة المشتريات"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">سلة المشتريات</span>
            <span className="w-5 h-5 rounded-md bg-slate-950 text-cyan-300 text-[11px] font-bold flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
