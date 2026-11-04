import React from 'react';
import { X, Scale, Trash2, ShoppingBag, Check } from 'lucide-react';
import { PhoneProduct } from '../types';
import { formatCurrency } from '../utils/pricing';
import { BrandMark } from './BrandMark';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedPhones: PhoneProduct[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onAddToCart: (product: PhoneProduct) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedPhones,
  onRemoveFromCompare,
  onClearCompare,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-6">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                مقارنة الهواتف والمواصفات
              </h2>
              <p className="text-xs text-slate-400">
                مقارنة دقيقة جنباً إلى جنب طبقاً لمعايير التنسيق التقني
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparedPhones.length > 0 && (
              <button
                onClick={onClearCompare}
                className="text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg border border-rose-950/80 hover:bg-rose-950/30 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح الكل</span>
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="إغلاق المقارنة"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-x-auto max-h-[calc(85vh-90px)]">
          {comparedPhones.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Scale className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-semibold text-slate-300">
                لم تقم باختيار أي أجهزة للمقارنة بعد
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                انقر على زر "مقارنة" الموجود على بطاقة أي هاتف في المتجر لإضافته إلى جدول المقارنة الفوري.
              </p>
            </div>
          ) : (
            <div className="min-w-[640px]">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="p-3 text-xs text-slate-400 w-1/4">المعيار / الجهاز</th>
                    {comparedPhones.map((phone) => (
                      <th key={phone.id} className="p-3 w-1/4 align-top">
                        <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2 text-center">
                          <button
                            onClick={() => onRemoveFromCompare(phone.id)}
                            title="إزالة من المقارنة"
                            className="absolute top-2 left-2 p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-md"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={phone.image}
                            alt={phone.name}
                            referrerPolicy="no-referrer"
                            className="w-20 h-20 object-cover mx-auto rounded-lg"
                          />
                          <h4 className="text-xs font-bold text-white line-clamp-1">{phone.name}</h4>
                          <div className="text-xs font-mono font-bold text-cyan-400 tabular-nums">
                            {formatCurrency(phone.basePrice)}
                          </div>
                          <button
                            onClick={() => onAddToCart(phone)}
                            className="w-full py-1.5 px-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>شراء</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  <tr>
                    <td className="p-3 text-slate-400 font-medium">العلامة التجارية</td>
                    {comparedPhones.map((p) => (
                      <td key={p.id} className="p-3 font-semibold text-slate-200">{p.brand}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-400 font-medium">المعالج</td>
                    {comparedPhones.map((p) => (
                      <td key={p.id} className="p-3 text-slate-200 font-mono text-[11px]">{p.specs.processor}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-400 font-medium">الذاكرة العشوائية (RAM)</td>
                    {comparedPhones.map((p) => (
                      <td key={p.id} className="p-3 text-slate-200">{p.specs.ram}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-400 font-medium">الشاشة</td>
                    {comparedPhones.map((p) => (
                      <td key={p.id} className="p-3 text-slate-200">{p.specs.screen}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-400 font-medium">نظام الكاميرات</td>
                    {comparedPhones.map((p) => (
                      <td key={p.id} className="p-3 text-slate-200">{p.specs.camera}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-400 font-medium">سعة البطارية</td>
                    {comparedPhones.map((p) => (
                      <td key={p.id} className="p-3 text-slate-200">{p.specs.battery}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-400 font-medium">الشحن السريع</td>
                    {comparedPhones.map((p) => (
                      <td key={p.id} className="p-3 text-slate-200">{p.specs.charging}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-400 font-medium">نظام التشغيل</td>
                    {comparedPhones.map((p) => (
                      <td key={p.id} className="p-3 text-slate-200">{p.specs.os}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-400 font-medium">الضمان المعتمد</td>
                    {comparedPhones.map((p) => (
                      <td key={p.id} className="p-3 text-cyan-400">{p.warranty}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
