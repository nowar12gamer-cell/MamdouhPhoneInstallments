export interface PhoneColor {
  name: string;
  code: string;
}

export interface PhoneStorageOption {
  capacity: string;
  priceDelta: number;
}

export interface PhoneSpecs {
  processor: string;
  ram: string;
  screen: string;
  camera: string;
  battery: string;
  charging: string;
  network: string;
  os: string;
}

export interface PhoneProduct {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Xiaomi' | 'Honor' | 'Google' | 'Accessories';
  category: 'flagship' | 'foldable' | 'midrange' | 'accessories';
  basePrice: number;
  originalPrice?: number;
  image: string;
  badge?: string; // Clean text badge, e.g. "الأكثر مبيعاً" or "وصل حديثاً" - NO EMOJIS!
  colors: PhoneColor[];
  storageOptions: PhoneStorageOption[];
  specs: PhoneSpecs;
  description: string;
  warranty: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string;
  phoneId: string;
  name: string;
  image: string;
  brand: string;
  color: PhoneColor;
  storage: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: 'cash_on_delivery' | 'card' | 'installments';
  notes?: string;
}
