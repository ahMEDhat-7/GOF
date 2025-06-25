import React from 'react';
import OrderSummary from '../components/features/OrderSummary';
import { useOrderStore } from '../stores/orderStore';

const OrderSummaryPage: React.FC = () => {
  const items = useOrderStore((s) => s.items);
  const removeItem = useOrderStore((s) => s.removeItem);

  return (
    <div className="p-6">
      <OrderSummary items={items} onRemove={removeItem} />
    </div>
  );
};

export default OrderSummaryPage; 