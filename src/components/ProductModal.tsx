import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  ShieldCheck,
  Check,
  PhoneCall,
  Cpu,
  Layers,
  BatteryCharging,
  Camera,
  HardDrive,
  Maximize2,
  Share2,
} from 'lucide-react';
import { PhoneProduct, PhoneColor } from '../types';
import { formatCurrency, calculateStoragePrice, calculateInstallment } from '../utils/pricing';
import { STORE_NAME, STORE_PHONE, STORE_WHATSAPP_NUMBER } from '../data/phones';
import { BrandMark } from './BrandMark';

interface ProductModalProps {
  product: PhoneProduct | null;
  onClose: () => void;
  onAddToCart: (product: PhoneProduct, selectedColor: PhoneColor, selectedStorage: string, finalPrice: number) => void;
  onOpenCalculatorForProduct: (product: PhoneProduct) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenCalculatorForProduct,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<PhoneColor>(product.colors[0] || { name: 'افتراضي', code: '#333' });
  const [selectedStorageIndex, setSelectedStorageIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedStorage = product.storageOptions[selectedStorageIndex] || {
    capacity: '256GB',
    priceDelta: 0,
  };

  const finalPrice = calculateStoragePrice(product.basePrice, selectedStorage.priceDelta);
  const installment12 = calculateInstallment(finalPrice, 12, 0, 0);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Pre-formatted WhatsApp order link
  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أود طلب الهاتف التالي من متجر ممدوح فون:\n` +
    `الجهاز: ${product.name}\n` +
    `السعة: ${selectedStorage.capacity}\n` +
    `اللون: ${selectedColor.name}\n` +
    `السعر الإجمالي: ${formatCurrency(finalPrice)}\n` +
    `علامة التنسيق: أجهزة أصلية معتمدة مع ضمان الوكيل`
  );
  const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandMark size="sm" />
            <span className="text-xs font-mono text-cyan-400">
              بطاقة المواصفات والتنسيق
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق النافذة"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          {/* Left Column: Visual Showcase */}
          <div className="md:col-span-5 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 right-3 bg-slate-950/90 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-800">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Quick trust box */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>ضمان ممدوح فون المعتمد</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {product.warranty}
              </p>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                <span>الحالة: متوفر بالمخزن الرئيسي</span>
                <span className="text-emerald-400 font-medium">جاهز للشحن الفوري</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Options & Specs */}
          <div className="md:col-span-7 space-y-5 text-right">
            <div>
              <div className="text-xs font-medium text-slate-400 mb-1">
                {product.brand} · الفئة الرائدة
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {product.name}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Dynamic Price Display */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">السعر النقدي المعتمد</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-cyan-400 font-mono tabular-nums">
                    {formatCurrency(finalPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      {formatCurrency(product.originalPrice + selectedStorage.priceDelta)}
                    </span>
                  )}
                </div>
              </div>

              {/* Installment Badge Callout */}
              <button
                onClick={() => onOpenCalculatorForProduct(product)}
                className="text-right group p-2 rounded-lg hover:bg-slate-900 transition-colors"
              >
                <span className="text-[11px] text-slate-400 block">أو قسّط على 12 شهراً</span>
                <span className="text-sm font-bold text-indigo-400 group-hover:text-indigo-300 font-mono tabular-nums">
                  {formatCurrency(installment12.monthly)} / شهر
                </span>
              </button>
            </div>

            {/* Storage capacity selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                اختر سعة التخزين:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.storageOptions.map((opt, idx) => (
                  <button
                    key={opt.capacity}
                    onClick={() => setSelectedStorageIndex(idx)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-center ${
                      selectedStorageIndex === idx
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 font-bold shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="font-mono text-sm">{opt.capacity}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {opt.priceDelta === 0 ? 'السعر الأساسي' : `+ ${formatCurrency(opt.priceDelta)}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-300">
                  اللون المختار: <span className="text-cyan-400">{selectedColor.name}</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all ${
                      selectedColor.name === color.name
                        ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/20'
                        : 'border-slate-700 hover:border-slate-500'
                    }`}
                    style={{ backgroundColor: color.code }}
                  >
                    {selectedColor.name === color.name && (
                      <Check className="w-4 h-4 text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Matrix Table */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>جدول المواصفات والتنسيق التقني</span>
              </h4>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 divide-y divide-slate-800/80 text-xs">
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-400">المعالج:</span>
                  <span className="font-semibold text-slate-200">{product.specs.processor}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-400">الذاكرة العشوائية:</span>
                  <span className="font-semibold text-slate-200">{product.specs.ram}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-400">الشاشة:</span>
                  <span className="font-semibold text-slate-200">{product.specs.screen}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-400">الكاميرا:</span>
                  <span className="font-semibold text-slate-200">{product.specs.camera}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-400">البطارية:</span>
                  <span className="font-semibold text-slate-200">{product.specs.battery}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-400">سرعة الشحن:</span>
                  <span className="font-semibold text-slate-200">{product.specs.charging}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-400">نظام التشغيل:</span>
                  <span className="font-semibold text-slate-200">{product.specs.os}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  onAddToCart(product, selectedColor, selectedStorage.capacity, finalPrice);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>إضافة إلى سلة المشتريات</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>طلب عبر واتساب</span>
              </a>

              <button
                onClick={handleShare}
                title="مشاركة رابط الهاتف"
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            {copiedLink && (
              <p className="text-[11px] text-cyan-400 text-center">تم نسخ الرابط إلى الحافظة بنجاح</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
