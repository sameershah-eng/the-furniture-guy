import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';
import { siteConfig } from '@/config/site';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColour?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string | null;
  discountRate: number; // e.g. 0.1 for 10%
  fixedDiscount: number; // e.g. 20 for £20
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, selectedColour?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getDeliveryCost: (deliveryOption?: 'standard' | 'express' | 'collection') => number;
  getTotal: (deliveryOption?: 'standard' | 'express' | 'collection') => number;
  getTotalCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: null,
      discountRate: 0,
      fixedDiscount: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, quantity = 1, selectedColour) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.selectedColour === selectedColour
          );

          let updatedItems: CartItem[];
          if (existingIndex > -1) {
            updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
          } else {
            updatedItems = [
              ...state.items,
              {
                product,
                quantity,
                selectedColour: selectedColour || product.colours[0],
              },
            ];
          }

          return { items: updatedItems, isOpen: true };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], promoCode: null, discountRate: 0, fixedDiscount: 0 }),

      applyPromo: (rawCode) => {
        const code = rawCode.trim().toUpperCase();
        if (code === 'BLING10') {
          set({ promoCode: code, discountRate: 0.1, fixedDiscount: 0 });
          return { success: true, message: 'Code BLING10 applied: 10% off your order!' };
        }
        if (code === 'GLAM20') {
          set({ promoCode: code, discountRate: 0, fixedDiscount: 20 });
          return { success: true, message: 'Code GLAM20 applied: £20 off your order!' };
        }
        return { success: false, message: 'Invalid promo code. Try "BLING10" for 10% off.' };
      },

      removePromo: () => set({ promoCode: null, discountRate: 0, fixedDiscount: 0 }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => {
          const price = item.product.salePrice ?? item.product.price;
          return sum + price * item.quantity;
        }, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const { discountRate, fixedDiscount } = get();
        if (discountRate > 0) {
          return subtotal * discountRate;
        }
        if (fixedDiscount > 0) {
          return Math.min(fixedDiscount, subtotal);
        }
        return 0;
      },

      getDeliveryCost: (deliveryOption = 'standard') => {
        if (deliveryOption === 'collection') return 0;
        if (deliveryOption === 'express') return siteConfig.expressDeliveryCost;
        const subtotal = get().getSubtotal();
        return subtotal >= siteConfig.freeDeliveryThreshold ? 0 : 39.99;
      },

      getTotal: (deliveryOption = 'standard') => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const delivery = get().getDeliveryCost(deliveryOption);
        return Math.max(0, subtotal - discount + delivery);
      },

      getTotalCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'tfg_cart_storage',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        discountRate: state.discountRate,
        fixedDiscount: state.fixedDiscount,
      }),
    }
  )
);
