import React, { useState } from 'react';
import OrderStatusTracker from '../components/features/OrderStatusTracker';
import type { OrderStatus } from '../types/order';

const statuses: OrderStatus[] = ['pending', 'preparing', 'delivering', 'delivered', 'cancelled'];

const OrderStatusPage: React.FC = () => {
  const [status, setStatus] = useState<OrderStatus>('pending');

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">تتبع حالة الطلب</h1>
      <OrderStatusTracker status={status} />
      <div className="flex gap-2 mt-6 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1 rounded font-bold border transition ${status === s ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusPage; 