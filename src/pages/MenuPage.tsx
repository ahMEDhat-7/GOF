import React from 'react';
import MenuList from '../components/features/MenuList';
import type { MenuCategory } from '../types/menu';

const mockMenu: MenuCategory[] = [
  {
    id: 'c1',
    name: 'البيتزا',
    items: [
      {
        id: 'm1',
        name: 'بيتزا مارجريتا',
        price: 35,
        categoryId: 'c1',
        imageUrl: 'https://images.deliveryhero.io/image/pizza-margherita.png',
        description: 'جبنة موزاريلا، صلصة طماطم، ريحان طازج',
        options: [
          { id: 'o1', name: 'إضافي جبنة', price: 5 },
          { id: 'o2', name: 'إضافي زيتون', price: 3 },
        ],
      },
      {
        id: 'm2',
        name: 'بيتزا بيبروني',
        price: 40,
        categoryId: 'c1',
        imageUrl: 'https://images.deliveryhero.io/image/pizza-pepperoni.png',
        description: 'بيبروني، جبنة موزاريلا، صلصة طماطم',
      },
    ],
  },
  {
    id: 'c2',
    name: 'المقبلات',
    items: [
      {
        id: 'm3',
        name: 'بطاطس مقلية',
        price: 12,
        categoryId: 'c2',
        imageUrl: 'https://images.deliveryhero.io/image/fries.png',
        description: 'بطاطس مقرمشة ذهبية',
      },
    ],
  },
];

const MenuPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">قائمة الطعام</h1>
      <MenuList categories={mockMenu} />
    </div>
  );
};

export default MenuPage; 