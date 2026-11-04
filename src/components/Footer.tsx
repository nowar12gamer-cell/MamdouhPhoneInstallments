import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';
import { STORE_NAME, STORE_PHONE, STORE_WHATSAPP_NUMBER, STORE_ADDRESS } from '../data/phones';
import { BrandMark } from './BrandMark';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  return (
    <footer id="guarantee" className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Upper features strip */}
      <div className="border-b border-slate-800/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">أجهزة أصلية معتمدة</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                جميع الهواتف وارد الوكيل الرسمي مع ضمان محلي ساري لمدة 12 شهراً.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">علامة التنسيق والتدقيق</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                فحص فني شامل للرقم التسلسلي والمواصفات قبل تسليم كل جهاز للعميل.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">استبدال فوري 14 يوماً</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                حق الاسترجاع أو الاستبدال الفوري في حالة وجود أي عيب صناعة طبقاً للقانون.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">دعم فني واستشارات</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                فريق متخصص لمساعدتك في اختيار الهاتف الأنسب لنشاطك وميزانيتك.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-right">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <BrandMark size="md" showSubtitle={true} />
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm pt-2">
              متجر ممدوح فون هو الوجهة الأولى لشراء الهواتف الذكية الرائدة والأجهزة اللوحية الأصلية في مصر. نلتزم بأعلى معايير التنسيق والشفافية في الأسعار والمواصفات وخدمات ما بعد البيع.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-white font-bold text-sm mb-2">أقسام المتجر</h4>
            <ul className="space-y-1.5">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">أحدث إصدارات آبل (Apple)</a></li>
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">هواتف سامسونج جالاكسي (Samsung)</a></li>
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">هواتف شاومي وهونر الرائدة</a></li>
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">الأجهزة القابلة للطي (Foldables)</a></li>
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">الساعات الذكية والإكسسوارات</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-sm mb-2">بيانات التواصل والفرع</h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{STORE_ADDRESS}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span dir="ltr" className="font-mono">{STORE_PHONE}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>يومياً من 10:00 صباحاً حتى 11:00 مساءً</span>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D9%85%D8%AA%D8%AC%D8%B1%20%D9%85%D9%85%D8%AF%D9%88%D8%AD%20%D9%81%D9%88%D9%86%20(%D8%A5%D8%AF%D9%83%D9%88)`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>محادثة واتساب مباشرة: 01128365101</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            جميع الحقوق محفوظة لمتجر ممدوح فون 2026. علامة التنسيق مسجلة ومعتمدة.
          </div>
          <div className="flex items-center gap-4">
            <span>فواتير ضريبية معتمدة</span>
            <span aria-hidden="true">·</span>
            <span>سجل تجاري وبطاقة ضريبية</span>
            <span aria-hidden="true">·</span>
            <span>تسوق آمن وموثق</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
