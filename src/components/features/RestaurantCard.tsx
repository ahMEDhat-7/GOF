import React from 'react';
import type { Restaurant } from '../../types/restaurant';
import { Star, CheckCircle, XCircle } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <img
          src={restaurant.imageUrl || 'https://placehold.co/80x80?text=مطعم'}
          alt={restaurant.name}
          className="w-20 h-20 rounded-lg object-cover border"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-lg text-orange-600">{restaurant.name}</span>
            {restaurant.isOpen ? (
              <CheckCircle className="text-green-500" size={18} />
            ) : (
              <XCircle className="text-gray-400" size={18} />
            )}
          </div>
          <div className="flex items-center gap-1 text-yellow-500 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < Math.round(restaurant.rating) ? '' : 'opacity-30'} />
            ))}
            <span className="text-xs text-gray-500 ml-2">{restaurant.rating.toFixed(1)}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-1">
            {restaurant.cuisine.map((cuisine) => (
              <span key={cuisine} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                {cuisine}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-500">رسوم التوصيل: {restaurant.deliveryFee === 0 ? 'مجاني' : `${restaurant.deliveryFee} ريال`}</div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard; 