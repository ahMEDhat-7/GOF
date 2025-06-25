import React from 'react';
import type { MenuCategory } from '../../types/menu';
import MenuItemCard from './MenuItemCard';

interface MenuListProps {
  categories: MenuCategory[];
}

const MenuList: React.FC<MenuListProps> = ({ categories }) => {
  return (
    <div className="space-y-8">
      {categories.map((cat) => (
        <section key={cat.id}>
          <h3 className="text-xl font-bold text-orange-600 mb-4">{cat.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cat.items.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MenuList; 