import { CartItem, PhoneProduct } from '../types';

/**
 * Format price in Egyptian Pounds or custom currency with commas
 * Example: 45,900 ج.م
 * Strictly no emojis!
 */
export function formatCurrency(amount: number, currency: 'EGP' | 'USD' = 'EGP'): string {
  const formattedNumber = Math.round(amount).toLocaleString('en-US');
  if (currency === 'EGP') {
    return `${formattedNumber} ج.م`;
  }
  return `$${formattedNumber}`;
}

/**
 * Calculate installment breakdown
 */
export function calculateInstallment(
  totalPrice: number,
  months: 6 | 12 | 24,
  downPaymentPercent: number = 0,
  interestPercent: number = 0
): {
  monthly: number;
  totalWithInterest: number;
  downPayment: number;
  financedAmount: number;
} {
  const downPayment = Math.round((totalPrice * downPaymentPercent) / 100);
  const remaining = Math.max(0, totalPrice - downPayment);
  const totalInterest = Math.round((remaining * interestPercent) / 100);
  const totalWithInterest = downPayment + remaining + totalInterest;
  const financedAmount = remaining + totalInterest;
  const monthly = Math.round(financedAmount / months);

  return {
    monthly,
    totalWithInterest,
    downPayment,
    financedAmount,
  };
}

/**
 * Calculate price including storage option delta
 */
export function calculateStoragePrice(basePrice: number, priceDelta: number = 0): number {
  return Math.max(0, basePrice + priceDelta);
}

/**
 * Calculate cart totals with optional free shipping threshold
 */
export function calculateCartTotals(
  items: CartItem[],
  freeShippingThreshold: number = 25000,
  flatShippingCost: number = 100
): {
  itemCount: number;
  subtotal: number;
  shipping: number;
  freeShipping: boolean;
  total: number;
} {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shipping = subtotal === 0 ? 0 : freeShipping ? 0 : flatShippingCost;
  const total = subtotal + shipping;

  return {
    itemCount,
    subtotal,
    shipping,
    freeShipping,
    total,
  };
}

/**
 * Filter phone products by search query, brand category, and price cap
 */
export function filterProducts(
  products: PhoneProduct[],
  query: string = '',
  selectedBrand: string = 'all',
  maxPrice?: number,
  selectedCategory: string = 'all'
): PhoneProduct[] {
  const cleanQuery = query.trim().toLowerCase();

  return products.filter((p) => {
    // Brand filter
    if (selectedBrand !== 'all' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    // Max price filter
    if (typeof maxPrice === 'number' && p.basePrice > maxPrice) {
      return false;
    }

    // Query filter
    if (cleanQuery) {
      const matchName = p.name.toLowerCase().includes(cleanQuery);
      const matchBrand = p.brand.toLowerCase().includes(cleanQuery);
      const matchDesc = p.description.toLowerCase().includes(cleanQuery);
      const matchStorage = p.storageOptions.some((s) => s.capacity.toLowerCase().includes(cleanQuery));
      const matchCpu = p.specs.processor.toLowerCase().includes(cleanQuery);
      if (!matchName && !matchBrand && !matchDesc && !matchStorage && !matchCpu) {
        return false;
      }
    }

    return true;
  });
}
