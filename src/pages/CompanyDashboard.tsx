import React from 'react';
import RestaurantCard from '../components/features/RestaurantCard';
import type { Restaurant } from '../types/restaurant';

const mockRestaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'بيتزا هت',
    imageUrl: 'https://images.deliveryhero.io/image/pizza-hut.png',
    cuisine: ['إيطالي', 'بيتزا'],
    rating: 4.3,
    deliveryFee: 10,
    isOpen: true,
  },
  {
    id: 'r2',
    name: 'كودو',
    imageUrl: 'https://images.deliveryhero.io/image/kudu.png',
    cuisine: ['سندويتشات', 'سعودي'],
    rating: 4.0,
    deliveryFee: 0,
    isOpen: false,
  },
];

const CompanyDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">لوحة تحكم الشركة</h1>
      <div className="bg-white rounded shadow p-4 mb-4">
        <h2 className="font-semibold mb-2">إحصائيات الشركة</h2>
        <div className="text-gray-500">(سيتم عرض الإحصائيات هنا)</div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-4">
        <h2 className="font-semibold mb-2">المطاعم</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">إدارة المستخدمين والمطاعم</h2>
        <div className="text-gray-500">(سيتم عرض أدوات الإدارة هنا)</div>
      </div>
    </div>
  );
};

export default CompanyDashboard; 