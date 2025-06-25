export interface Restaurant {
  id: string;
  name: string;
  imageUrl?: string;
  cuisine: string[];
  rating: number; // 1-5
  deliveryFee: number;
  isOpen: boolean;
} 