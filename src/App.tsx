import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Scale,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Filter,
  ArrowUpDown,
  ShoppingBag,
} from 'lucide-react';
import { PhoneProduct, CartItem, PhoneColor } from './types';
import { INITIAL_PHONES, STORE_NAME } from './data/phones';
import { filterProducts, formatCurrency } from './utils/pricing';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ComparisonModal } from './components/ComparisonModal';
import { InstallmentCalculatorModal } from './components/InstallmentCalculatorModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { BrandMark } from './components/BrandMark';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  // State for catalog & filters
  const [products] = useState<PhoneProduct[]>(INITIAL_PHONES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(85000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<PhoneProduct | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorProductId, setCalculatorProductId] = useState<string | undefined>(undefined);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Cart & Comparison state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [comparedPhones, setComparedPhones] = useState<PhoneProduct[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let list = filterProducts(products, searchQuery, selectedBrand, maxPrice, selectedCategory);

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, searchQuery, selectedBrand, maxPrice, selectedCategory, sortBy]);

  // Cart actions
  const handleAddToCart = (
    product: PhoneProduct,
    color?: PhoneColor,
    storage?: string,
    price?: number
  ) => {
    const chosenColor = color || product.colors[0] || { name: 'افتراضي', code: '#333' };
    const chosenStorage = storage || product.storageOptions[0]?.capacity || '256GB';
    const chosenPrice = price || product.basePrice;
    const cartItemId = `${product.id}-${chosenColor.name}-${chosenStorage}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          phoneId: product.id,
          name: product.name,
          image: product.image,
          brand: product.brand,
          color: chosenColor,
          storage: chosenStorage,
          unitPrice: chosenPrice,
          quantity: 1,
        },
      ];
    });

    showToast(`تمت إضافة ${product.name} إلى سلة المشتريات`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('تم حذف الجهاز من السلة');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Comparison actions
  const handleToggleCompare = (product: PhoneProduct) => {
    setComparedPhones((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`تمت إزالة ${product.name} من المقارنة`);
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('يمكنك مقارنة حتى 3 أجهزة كحد أقصى');
        return prev;
      }
      showToast(`تمت إضافة ${product.name} إلى المقارنة`);
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setComparedPhones((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearCompare = () => {
    setComparedPhones([]);
    showToast('تم مسح جميع أجهزة المقارنة');
  };

  const handleOpenCalculatorForProduct = (product: PhoneProduct) => {
    setCalculatorProductId(product.id);
    setIsCalculatorOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 py-3 px-5 rounded-xl bg-slate-900 border border-cyan-500/80 text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        comparisonCount={comparedPhones.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenCalculator={() => {
          setCalculatorProductId(undefined);
          setIsCalculatorOpen(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        activeCategory={selectedCategory}
      />

      {/* Main Hero Campaign Area */}
      <main className="flex-1">
        <HeroSection
          onExploreCatalog={() => {
            const el = document.getElementById('catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCalculator={() => {
            setCalculatorProductId(undefined);
            setIsCalculatorOpen(true);
          }}
        />

        {/* Feature: علامة التنسيق المعتمدة لمتجر ممدوح فون */}
        <section className="py-8 bg-slate-900/40 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-right gap-4">
                <BrandMark size="md" showSubtitle={false} className="shrink-0" />
                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-sm font-bold text-white">
                      علامة تنسيق ممدوح فون المعتمدة
                    </span>
                    <span className="text-[10px] bg-cyan-950 border border-cyan-800 text-cyan-300 px-2 py-0.5 rounded">
                      معيار الجودة 2026
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    علامة التنسيق تضمن لك أن كافة الأجهزة جديدة بالكامل غير مفعلة مسبقاً، مرفقة بضمان الوكيل الرسمي في مصر، ومطابقة لأدق المواصفات الفنية الموضحة.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 text-xs text-slate-300 shrink-0 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono tabular-nums">100%</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400">أجهزة أصلية معتمدة</div>
                </div>
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono tabular-nums">14 يوم</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400">حق الاستبدال الفوري</div>
                </div>
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono tabular-nums">0%</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400">فوائد تقسيط بنكي</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Catalog Section */}
        <section id="catalog" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Header & Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-right border-b border-slate-800/80 pb-6">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-1">
                دليل الأجهزة المتوفرة
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                هواتف وإكسسوارات متجر ممدوح فون
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              يتم عرض <span className="text-white font-bold font-mono">{filteredProducts.length}</span> من أصل{' '}
              <span className="font-mono">{products.length}</span> جهاز متاح
            </div>
          </div>

          {/* Filtering Controls Bar */}
          <div className="space-y-4">
            {/* Top row: Brand segmented control & Sort selector */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Brand Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'Apple', label: 'آبل (Apple)' },
                  { id: 'Samsung', label: 'سامسونج (Samsung)' },
                  { id: 'Xiaomi', label: 'شاومي (Xiaomi)' },
                  { id: 'Honor', label: 'هونر (Honor)' },
                  { id: 'Accessories', label: 'إكسسوارات' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedBrand(tab.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                      selectedBrand === tab.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sorting and Max Price indicator */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                  <span>الترتيب:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="featured" className="bg-slate-900 text-white">المميز أولاً</option>
                    <option value="price-asc" className="bg-slate-900 text-white">السعر: من الأقل للأعلى</option>
                    <option value="price-desc" className="bg-slate-900 text-white">السعر: من الأعلى للأقل</option>
                    <option value="rating" className="bg-slate-900 text-white">الأعلى تقييماً</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Price slider filter */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300">الحد الأقصى للسعر:</span>
                <span className="font-mono text-cyan-400 font-bold tabular-nums">
                  {formatCurrency(maxPrice)}
                </span>
              </div>

              <div className="w-full sm:w-72 flex items-center gap-3">
                <input
                  type="range"
                  min={10000}
                  max={85000}
                  step={2000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <button
                  onClick={() => setMaxPrice(85000)}
                  className="text-[11px] text-slate-400 hover:text-white underline shrink-0"
                >
                  إعادة ضبط
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40">
              <Filter className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-semibold text-slate-300">
                لا توجد نتائج تطابق معايير البحث الحالية
              </h3>
              <p className="text-xs text-slate-400">
                جرّب تعديل حد السعر أو اختيار علامة تجارية أخرى.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('all');
                  setSelectedCategory('all');
                  setMaxPrice(85000);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 text-xs font-semibold hover:bg-slate-700"
              >
                إظهار جميع الأجهزة
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p)}
                  onToggleCompare={(p) => handleToggleCompare(p)}
                  isCompared={comparedPhones.some((cp) => cp.id === product.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Comparison Sticky Dock if items selected */}
      {comparedPhones.length > 0 && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 z-40 bg-slate-900/95 border border-cyan-500/60 rounded-2xl shadow-2xl p-3.5 backdrop-blur-md flex items-center gap-4 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-cyan-400" />
            <div className="text-right">
              <div className="text-xs font-bold text-white">
                مقارنة ({comparedPhones.length} من 3)
              </div>
              <div className="text-[10px] text-slate-400">
                {comparedPhones.map((p) => p.name.split(' ')[0]).join(' · ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              عرض جدول المقارنة
            </button>
            <button
              onClick={handleClearCompare}
              className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
              title="إلغاء المقارنة"
            >
              مسح
            </button>
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenCalculatorForProduct={handleOpenCalculatorForProduct}
      />

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        comparedPhones={comparedPhones}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      <InstallmentCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        products={products}
        initialSelectedProductId={calculatorProductId}
        onSelectAndBuy={(p) => {
          setSelectedProduct(p);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Floating Direct WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
