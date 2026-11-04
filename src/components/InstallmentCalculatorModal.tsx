import React, { useState } from 'react';
import { X, Calculator, CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PhoneProduct } from '../types';
import { formatCurrency, calculateInstallment } from '../utils/pricing';
import { BrandMark } from './BrandMark';

interface InstallmentCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: PhoneProduct[];
  initialSelectedProductId?: string;
  onSelectAndBuy?: (product: PhoneProduct) => void;
}

export const InstallmentCalculatorModal: React.FC<InstallmentCalculatorModalProps> = ({
  isOpen,
  onClose,
  products,
  initialSelectedProductId,
  onSelectAndBuy,
}) => {
  if (!isOpen) return null;

  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialSelectedProductId || products[0]?.id || ''
  );
  const [customPrice, setCustomPrice] = useState<number>(0);
  const [useCustomPrice, setUseCustomPrice] = useState<boolean>(false);
  const [months, setMonths] = useState<6 | 12 | 24>(12);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(0);

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const activePrice = useCustomPrice
    ? Math.max(1000, customPrice || 1000)
    : selectedProduct
    ? selectedProduct.basePrice
    : 35000;

  const result = calculateInstallment(activePrice, months, downPaymentPercent, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-6">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                حاسبة التقسيط والتنسيق المالي
              </h2>
              <p className="text-xs text-slate-400">
                برامج تقسيط معتمدة بدون فوائد بالتعاون مع كبرى البنوك
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق الحاسبة"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[calc(85vh-90px)] overflow-y-auto">
          {/* Device Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              اختر الجهاز المطلوب تقسيطه:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                disabled={useCustomPrice}
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 disabled:opacity-40"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {formatCurrency(p.basePrice)}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setUseCustomPrice(!useCustomPrice)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                  useCustomPrice
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {useCustomPrice ? 'إلغاء المبلغ المخصص' : 'مبلغ مخصص'}
              </button>
            </div>

            {useCustomPrice && (
              <div className="pt-2">
                <input
                  type="number"
                  placeholder="أدخل سعر الجهاز بالجنيه المصري"
                  value={customPrice || ''}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            )}
          </div>

          {/* Term Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              فترة السداد والتقسيط:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([6, 12, 24] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMonths(t)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    months === t
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold font-mono">{t} شهراً</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">بدون مصاريف إدارية</div>
                </button>
              ))}
            </div>
          </div>

          {/* Down Payment Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">الدفعة المقدمة:</label>
              <span className="font-mono text-cyan-400 font-bold">
                {downPaymentPercent}% ({formatCurrency(result.downPayment)})
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 10, 20, 30].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPaymentPercent(pct)}
                  className={`py-2 rounded-xl border text-xs text-center transition-all ${
                    downPaymentPercent === pct
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {pct === 0 ? 'بدون مقدم' : `${pct}% مقدم`}
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-900/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs text-slate-400">القسط الشهري المتوقع</span>
              <div className="text-2xl font-black text-cyan-400 font-mono tabular-nums">
                {formatCurrency(result.monthly)} <span className="text-xs text-slate-400 font-normal">/ شهرياً</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400 block mb-1">المبلغ الممول:</span>
                <span className="font-bold text-white font-mono tabular-nums">{formatCurrency(result.financedAmount)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400 block mb-1">الدفعة الأولى:</span>
                <span className="font-bold text-white font-mono tabular-nums">{formatCurrency(result.downPayment)}</span>
              </div>
            </div>

            {/* Approved Banks strip */}
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>معتمد لدى البنك الأهلي المصري، بنك مصر، CIB، وفاليو (ValU)</span>
              </div>
              <p className="text-slate-400">
                يمكن تفعيل طلب التقسيط فورياً عبر بطاقتك الائتمانية أو بطاقة الرقم القومي داخل الفرع أو أونلاين.
              </p>
            </div>
          </div>

          {/* Footer Action */}
          {selectedProduct && onSelectAndBuy && (
            <button
              onClick={() => {
                onSelectAndBuy(selectedProduct);
                onClose();
              }}
              className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>متابعة طلب شراء {selectedProduct.name}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
