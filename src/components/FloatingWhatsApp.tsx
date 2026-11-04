import React from 'react';
import { STORE_NAME, STORE_WHATSAPP_NUMBER } from '../data/phones';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const defaultMessage = encodeURIComponent(
    `السلام عليكم، أتواصل معكم للاستفسار عن الهواتف المتاحة وعروض التقسيط لدى متجر ممدوح فون (إدكو - البحيرة).`
  );
  const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="تواصل سريع عبر واتساب"
      className="fixed bottom-6 left-6 z-40 flex items-center group"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل مع ممدوح فون عبر تطبيق واتساب"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <WhatsAppIcon className="w-5 h-5" />
        </div>
        <span className="whitespace-nowrap hidden sm:inline">
          تواصل عبر واتساب
        </span>
      </a>
    </aside>
  );
};
