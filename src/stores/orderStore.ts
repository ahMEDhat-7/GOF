import { create } from 'zustand';
import type { OrderItem } from '../types/order';
import type { MenuItem, MenuOption } from '../types/menu';

interface OrderStoreState {
  items: OrderItem[];
  addItem: (item: MenuItem, quantity?: number, options?: MenuOption[]) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useOrderStore = create<OrderStoreState>((set, get) => ({
  items: [],
  addItem: (item, quantity = 1, options = []) => {
    // تحقق إذا كان الصنف موجود بنفس الخيارات
    const key = item.id + (options?.map((o) => o.id).join('-') || '');
    const existing = get().items.find(
      (i) => i.id === key
    );
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === key ? { ...i, quantity: i.quantity + quantity, total: (i.quantity + quantity) * i.price } : i
        ),
      });
    } else {
      set({
        items: [
          ...get().items,
          {
            id: key,
            name: item.name,
            price: item.price + (options?.reduce((sum, o) => sum + o.price, 0) || 0),
            quantity,
            options,
            total: (item.price + (options?.reduce((sum, o) => sum + o.price, 0) || 0)) * quantity,
          },
        ],
      });
    }
  },
  removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  clear: () => set({ items: [] }),
})); 