import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  FileText,
  CreditCard,
  ArrowRight,
} from 'lucide-react';
import { CartItem, OrderCustomerInfo } from '../types';
import { formatCurrency, calculateCartTotals } from '../utils/pricing';
import { STORE_NAME, STORE_PHONE, STORE_WHATSAPP_NUMBER } from '../data/phones';
import { BrandMark } from './BrandMark';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    city: 'البحيرة (إدكو)',
    address: '',
    paymentMethod: 'cash_on_delivery',
    notes: '',
  });
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  if (!isOpen) return null;

  const totals = calculateCartTotals(items, 25000, 150);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.phone || !customer.address) {
      return;
    }
    const orderId = `MP-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);
    setStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-start animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">
              {step === 'cart' && `سلة المشتريات (${totals.itemCount})`}
              {step === 'checkout' && 'إتمام الطلب والتوصيل'}
              {step === 'success' && 'تم تأكيد طلبك بنجاح'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق السلة"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content based on step */}
        {step === 'cart' && (
          <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3 my-auto">
                <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
                <h3 className="text-base font-semibold text-slate-300">
                  سلة المشتريات فارغة
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  تصفح هواتفنا الذكية وأضف جهازك المفضل لبدء تجربة الشراء المعتمدة.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 mt-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors"
                >
                  تصفح الهواتف
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Free shipping progress bar */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{totals.freeShipping ? 'مؤهل للشحن المجاني الفوري' : 'متبقي للشحن المجاني'}</span>
                    </span>
                    {!totals.freeShipping && (
                      <span className="font-mono text-cyan-400 tabular-nums">
                        {formatCurrency(25000 - totals.subtotal)}
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (totals.subtotal / 25000) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex gap-3 items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-800 bg-slate-900"
                      />
                      <div className="flex-1 min-w-0 text-right">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span>{item.storage}</span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-slate-700 inline-block"
                              style={{ backgroundColor: item.color.code }}
                            />
                            <span>{item.color.name}</span>
                          </span>
                        </div>
                        <div className="text-xs font-mono font-bold text-cyan-400 mt-1 tabular-nums">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900 overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-mono text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          title="حذف الجهاز"
                          className="text-[11px] text-slate-400 hover:text-rose-400 pt-0.5"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Totals & Next Action */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>المجموع الفرعي:</span>
                    <span className="font-mono text-slate-200 tabular-nums">{formatCurrency(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>رسوم الشحن والتأمين:</span>
                    <span className="font-mono text-slate-200 tabular-nums">
                      {totals.freeShipping ? 'مجاني' : formatCurrency(totals.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                    <span>الإجمالي النهائي:</span>
                    <span className="font-mono text-cyan-400 tabular-nums">{formatCurrency(totals.total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20"
                >
                  <span>متابعة إتمام الطلب</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step: Checkout form */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 overflow-y-auto p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3.5 text-right">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  <span>العودة للسلة</span>
                </button>
                <span>خطوة الدفع والتسليم</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  الاسم بالكامل:
                </label>
                <input
                  required
                  type="text"
                  placeholder="محمد ممدوح عبد الله"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  رقم الهاتف (واتساب متاح):
                </label>
                <input
                  required
                  type="tel"
                  dir="ltr"
                  placeholder="+20 100 000 0000"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 text-right"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    المحافظة:
                  </label>
                  <select
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="البحيرة (إدكو)">البحيرة (إدكو)</option>
                    <option value="القاهرة">القاهرة</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="الشرقية">الشرقية</option>
                    <option value="الدقهلية">الدقهلية</option>
                    <option value="الغربية">الغربية</option>
                    <option value="محافظة أخرى">محافظة أخرى</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    العنوان التفصيلي:
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="الشارع، رقم المبنى"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  طريقة الدفع والتنسيق:
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={customer.paymentMethod === 'cash_on_delivery'}
                      onChange={() => setCustomer({ ...customer, paymentMethod: 'cash_on_delivery' })}
                      className="accent-cyan-500"
                    />
                    <span className="font-semibold text-white">الدفع نقداً عند الاستلام والمعاينة (COD)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={customer.paymentMethod === 'card'}
                      onChange={() => setCustomer({ ...customer, paymentMethod: 'card' })}
                      className="accent-cyan-500"
                    />
                    <span className="font-semibold text-white">بطاقة بنكية / فيزا أو ماستركارد</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={customer.paymentMethod === 'installments'}
                      onChange={() => setCustomer({ ...customer, paymentMethod: 'installments' })}
                      className="accent-cyan-500"
                    />
                    <span className="font-semibold text-white">تقسيط عبر البنك أو فاليو (ValU)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  ملاحظات إضافية للتوصيل (اختياري):
                </label>
                <textarea
                  rows={2}
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="موعد مفضل للاتصال، مواعيد الاستلام..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>تأكيد الطلب بمبلغ {formatCurrency(totals.total)}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step: Success invoice receipt */}
        {step === 'success' && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between text-right space-y-6">
            <div className="space-y-4 my-auto">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center mx-auto text-cyan-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-white">تم استلام طلبك بنجاح</h3>
                <p className="text-xs text-slate-400">
                  شكراً لثقتكم في متجر ممدوح فون
                </p>
                <div className="inline-block mt-2 font-mono text-xs font-bold px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-cyan-400">
                  رقم الفاتورة المعتمدة: {confirmedOrderId}
                </div>
              </div>

              {/* Order breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>العميل:</span>
                  <span className="font-semibold text-white">{customer.fullName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>الهاتف:</span>
                  <span className="font-semibold text-white font-mono">{customer.phone}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>مكان الاستلام:</span>
                  <span className="font-semibold text-white">{customer.city} - {customer.address}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>طريقة السداد:</span>
                  <span className="font-semibold text-white">
                    {customer.paymentMethod === 'cash_on_delivery' && 'نقداً عند المعاينة'}
                    {customer.paymentMethod === 'card' && 'بطاقة دفع إلكتروني'}
                    {customer.paymentMethod === 'installments' && 'تقسيط بنكي معتمد'}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-cyan-400 text-sm">
                  <span>الإجمالي المطلوب:</span>
                  <span className="font-mono tabular-nums">{formatCurrency(totals.total)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>تأكيد علامة التنسيق وضمان الوكيل</span>
                </div>
                <p>
                  سيقوم ممثل خدمة عملاء ممدوح فون بالاتصال بكم خلال 30 دقيقة لتأكيد ميعاد التسليم بدقة.
                </p>
              </div>
            </div>

            {/* WhatsApp Confirmation & Back Buttons */}
            <div className="space-y-2">
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `السلام عليكم، قمت بتأكيد طلب من متجر ممدوح فون:\n` +
                  `رقم الفاتورة: ${confirmedOrderId}\n` +
                  `الاسم: ${customer.fullName}\n` +
                  `العنوان: ${customer.city} - ${customer.address}\n` +
                  `الإجمالي: ${formatCurrency(totals.total)}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>إرسال تفاصيل الفاتورة عبر واتساب (01128365101)</span>
              </a>

              <button
                onClick={handleFinish}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                العودة إلى المتجر
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
