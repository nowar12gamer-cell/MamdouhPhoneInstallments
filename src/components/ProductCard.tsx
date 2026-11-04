import React from 'react';
import { ShoppingBag, Eye, Scale, Check, ShieldCheck } from 'lucide-react';
import { PhoneProduct } from '../types';
import { formatCurrency } from '../utils/pricing';

interface ProductCardProps {
  product: PhoneProduct;
  onSelectProduct: (product: PhoneProduct) => void;
  onAddToCart: (product: PhoneProduct) => void;
  onToggleCompare: (product: PhoneProduct) => void;
  isCompared: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onToggleCompare,
  isCompared,
}) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-cyan-950/30">
      {/* Card Header & Image Area */}
      <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Soft bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

        {/* Text tag (subtle, clean text tag, no candy pill) */}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md border border-slate-800 text-cyan-400 text-[11px] font-semibold px-2.5 py-1 rounded-md">
            {product.badge}
          </div>
        )}

        {/* Discount tag if applicable */}
        {discountPercent && (
          <div className="absolute top-3 left-3 bg-indigo-950/85 border border-indigo-700/60 text-indigo-300 text-[11px] font-mono px-2 py-0.5 rounded-md tabular-nums">
            خصم {discountPercent}%
          </div>
        )}

        {/* Quick Compare Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          title={isCompared ? 'إلغاء المقارنة' : 'إضافة إلى المقارنة'}
          aria-label={`مقارنة ${product.name}`}
          className={`absolute bottom-3 left-3 p-2 rounded-lg backdrop-blur-md text-xs transition-colors flex items-center gap-1.5 ${
            isCompared
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'bg-slate-900/85 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          {isCompared ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
          <span className="text-[11px]">{isCompared ? 'تمت الإضافة' : 'مقارنة'}</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Unboxed metadata kicker */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.specs.ram}</span>
            <span aria-hidden="true">·</span>
            <span>{product.storageOptions[0]?.capacity}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Core Specs summary */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Colors swatches preview */}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-400 ml-1">الألوان:</span>
            {product.colors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-inner"
                style={{ backgroundColor: color.code }}
              />
            ))}
          </div>
        </div>

        {/* Price and Action Strip */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-cyan-400 font-mono tabular-nums">
                {formatCurrency(product.basePrice)}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectProduct(product)}
              title="عرض التفاصيل والمواصفات"
              aria-label={`عرض تفاصيل ${product.name}`}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => onAddToCart(product)}
              title="إضافة للسلة"
              aria-label={`إضافة ${product.name} للسلة`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>شراء</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
