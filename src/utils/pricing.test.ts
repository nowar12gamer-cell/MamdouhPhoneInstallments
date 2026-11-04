import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  calculateInstallment,
  calculateStoragePrice,
  calculateCartTotals,
  filterProducts,
} from './pricing';
import { PhoneProduct, CartItem } from '../types';

test('formatCurrency formats correctly without emojis', () => {
  assert.equal(formatCurrency(45000, 'EGP'), '45,000 ج.م');
  assert.equal(formatCurrency(1250.7, 'EGP'), '1,251 ج.م');
  assert.equal(formatCurrency(999, 'USD'), '$999');
  // Check no emojis present in output
  assert.equal(/\p{Extended_Pictographic}/u.test(formatCurrency(50000)), false);
});

test('calculateInstallment calculates breakdown accurately', () => {
  const result = calculateInstallment(36000, 12, 0, 0);
  assert.equal(result.monthly, 3000);
  assert.equal(result.totalWithInterest, 36000);
  assert.equal(result.downPayment, 0);

  // With 20% down payment
  const withDown = calculateInstallment(40000, 10 as any, 20, 0);
  assert.equal(withDown.downPayment, 8000);
  assert.equal(withDown.financedAmount, 32000);
  assert.equal(withDown.monthly, 3200);
});

test('calculateStoragePrice handles delta additions', () => {
  assert.equal(calculateStoragePrice(30000, 0), 30000);
  assert.equal(calculateStoragePrice(30000, 4500), 34500);
});

test('calculateCartTotals handles free shipping threshold', () => {
  const dummyItems: CartItem[] = [
    {
      id: 'item-1',
      phoneId: 'p1',
      name: 'Titan Flagship',
      image: '/test.jpg',
      brand: 'Apple',
      color: { name: 'Titanium', code: '#aaa' },
      storage: '256GB',
      unitPrice: 15000,
      quantity: 1,
    },
  ];

  // Below threshold 25000 -> shipping applied
  const res1 = calculateCartTotals(dummyItems, 25000, 100);
  assert.equal(res1.subtotal, 15000);
  assert.equal(res1.shipping, 100);
  assert.equal(res1.freeShipping, false);
  assert.equal(res1.total, 15100);

  // Above threshold 25000 -> free shipping
  const highItems: CartItem[] = [
    { ...dummyItems[0], quantity: 2, unitPrice: 20000 },
  ];
  const res2 = calculateCartTotals(highItems, 25000, 100);
  assert.equal(res2.subtotal, 40000);
  assert.equal(res2.shipping, 0);
  assert.equal(res2.freeShipping, true);
  assert.equal(res2.total, 40000);
});

test('filterProducts filters by brand, price, and search text', () => {
  const sample: PhoneProduct[] = [
    {
      id: 'p1',
      name: 'Titan Pro 16 Max',
      brand: 'Apple',
      category: 'flagship',
      basePrice: 58000,
      image: '/p1.jpg',
      colors: [],
      storageOptions: [{ capacity: '256GB', priceDelta: 0 }],
      specs: {
        processor: 'A18 Pro',
        ram: '8GB',
        screen: '6.9 inch OLED',
        camera: '48MP Triple',
        battery: '4685 mAh',
        charging: '30W',
        network: '5G',
        os: 'iOS 18',
      },
      description: 'هاتف تيتانيوم رائد',
      warranty: 'ضمان عام كامل',
      inStock: true,
      rating: 4.9,
      reviewsCount: 42,
    },
    {
      id: 'p2',
      name: 'Aura Ultra S25',
      brand: 'Samsung',
      category: 'flagship',
      basePrice: 52000,
      image: '/p2.jpg',
      colors: [],
      storageOptions: [{ capacity: '512GB', priceDelta: 0 }],
      specs: {
        processor: 'Snapdragon 8 Elite',
        ram: '12GB',
        screen: '6.8 inch AMOLED',
        camera: '200MP Quad',
        battery: '5000 mAh',
        charging: '45W',
        network: '5G',
        os: 'Android 15',
      },
      description: 'هاتف جالاكسي متطور',
      warranty: 'ضمان محلي معتمد',
      inStock: true,
      rating: 4.8,
      reviewsCount: 31,
    },
  ];

  assert.equal(filterProducts(sample, '', 'all').length, 2);
  assert.equal(filterProducts(sample, 'Samsung', 'all').length, 1);
  assert.equal(filterProducts(sample, '', 'Apple').length, 1);
  assert.equal(filterProducts(sample, '', 'all', 55000).length, 1);
  assert.equal(filterProducts(sample, 'Snapdragon', 'all').length, 1);
  assert.equal(filterProducts(sample, 'nonexistent', 'all').length, 0);
});
