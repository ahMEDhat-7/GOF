import React from 'react';
import { CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import type { OrderStatus } from '../../types/order';

interface OrderStatusTrackerProps {
  status: OrderStatus;
}

const steps: { key: OrderStatus; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'pending', label: 'بانتظار التأكيد', icon: <Clock />, color: 'bg-gray-300 text-gray-600' },
  { key: 'preparing', label: 'قيد التجهيز', icon: <Clock />, color: 'bg-blue-200 text-blue-700' },
  { key: 'delivering', label: 'قيد التوصيل', icon: <Truck />, color: 'bg-yellow-200 text-yellow-700' },
  { key: 'delivered', label: 'تم التوصيل', icon: <CheckCircle />, color: 'bg-green-200 text-green-700' },
  { key: 'cancelled', label: 'ملغي', icon: <XCircle />, color: 'bg-red-200 text-red-700' },
];

const getStepIndex = (status: OrderStatus) => steps.findIndex((s) => s.key === status);

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ status }) => {
  const currentStep = getStepIndex(status);

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      {steps.map((step, idx) => (
        <div key={step.key} className="flex flex-col items-center">
          <div
            className={`rounded-full p-2 mb-1 transition-all border-2
              ${idx < currentStep ? step.color + ' border-green-400' : ''}
              ${idx === currentStep ? 'bg-orange-500 text-white scale-110 shadow-lg border-orange-500' : ''}
              ${idx > currentStep ? 'bg-gray-200 text-gray-400 border-gray-300' : ''}
            `}
          >
            {step.icon}
          </div>
          <span className={`text-xs font-bold ${idx === currentStep ? 'text-orange-600' : 'text-gray-500'}`}>{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusTracker; 