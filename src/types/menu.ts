export interface MenuOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  categoryId: string;
  options?: MenuOption[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
} 