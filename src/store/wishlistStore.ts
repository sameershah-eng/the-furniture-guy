import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  items: string[]; // product IDs
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (productId: string) => {
        const { items } = get();
        const exists = items.includes(productId);
        if (exists) {
          set({ items: items.filter((id) => id !== productId) });
          return false;
        } else {
          set({ items: [...items, productId] });
          return true;
        }
      },

      isInWishlist: (productId: string) => {
        return get().items.includes(productId);
      },

      clearWishlist: () => set({ items: [] }),

      getCount: () => get().items.length,
    }),
    {
      name: 'tfg_wishlist_storage',
    }
  )
);
