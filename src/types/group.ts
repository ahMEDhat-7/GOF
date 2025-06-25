import type { OrderStatus } from './order';

export type GroupType = 'open' | 'invite' | 'department';

export interface Group {
  id: string;
  name: string;
  type: GroupType;
  members: Array<{
    id: string;
    name: string;
    avatarUrl?: string;
  }>;
  orderStatus: OrderStatus;
  restaurantName: string;
  deadline: string; // ISO date
} 