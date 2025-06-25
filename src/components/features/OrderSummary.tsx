import React from 'react';
import type { OrderItem } from '../../types/order';
import { Trash2 } from 'lucide-react';

interface OrderSummaryProps {
  items: OrderItem[];
  onRemove: (id: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.total, 0);
  const split = items.length > 0 ? (total / items.length).toFixed(2) : '0.00';

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-bold text-orange-600 mb-4">ملخص الطلب</h2>
      {items.length === 0 ? (
        <div className="text-gray-500">لا توجد أصناف مضافة بعد.</div>
      ) : (
        <ul className="divide-y divide-gray-100 mb-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-2">
              <div>
                <span className="font-medium">{item.name}</span>
                {item.options && item.options.length > 0 && (
                  <span className="text-xs text-gray-500 ml-2">(
                    {item.options.map((opt) => opt.name).join(', ')}
                  )</span>
                )}
                <span className="text-xs text-gray-400 ml-2">x{item.quantity}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-600 font-bold">{item.total} ريال</span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label="حذف الصنف"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-between font-bold text-lg mt-4">
        <span>المجموع الكلي:</span>
        <span className="text-green-600">{total} ريال</span>
      </div>
      <div className="flex items-center justify-between text-sm mt-2">
        <span>نصيب كل شخص (تقسيم):</span>
        <span className="text-blue-600">{split} ريال</span>
      </div>
    </div>
  );
};

export default OrderSummary; 