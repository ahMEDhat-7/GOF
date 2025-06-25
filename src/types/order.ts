import type { MenuOption } from './menu';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options?: MenuOption[];
  total: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled'; 