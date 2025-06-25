import React, { useState, useEffect } from 'react';
import type { Group } from '../types/group';
import type { MenuCategory } from '../types/menu';
import type { Message } from '../types/chat';
import OrderStatusTracker from '../components/features/OrderStatusTracker';
import MenuList from '../components/features/MenuList';
import OrderSummary from '../components/features/OrderSummary';
import GroupChat from '../components/features/GroupChat';
import { useOrderStore } from '../stores/orderStore';
import type { OrderStatus } from '../types/order';

const mockGroup: Group = {
  id: 'g1',
  name: 'غداء الإثنين',
  type: 'open',
  members: [
    { id: 'u1', name: 'أحمد' },
    { id: 'u2', name: 'سارة' },
    { id: 'u3', name: 'محمد' },
    { id: 'u4', name: 'ليلى' },
  ],
  orderStatus: 'preparing',
  restaurantName: 'بيتزا هت',
  deadline: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
};

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

const currentUserId = 'u1';
const initialMessages: Message[] = [
  {
    id: 'm1',
    senderId: 'u1',
    senderName: 'أحمد',
    content: 'السلام عليكم جميعًا 👋',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'm2',
    senderId: 'u2',
    senderName: 'سارة',
    content: 'وعليكم السلام! متى ينتهي الطلب؟',
    createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
];

const GroupDetailsPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const items = useOrderStore((s) => s.items);
  const removeItem = useOrderStore((s) => s.removeItem);
  const [status, setStatus] = useState<OrderStatus>(mockGroup.orderStatus);
  const [remaining, setRemaining] = useState<number>(() => {
    return Math.max(0, new Date(mockGroup.deadline).getTime() - Date.now());
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.max(0, new Date(mockGroup.deadline).getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSend = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        senderId: currentUserId,
        senderName: 'أحمد',
        content,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      {/* معلومات المجموعة */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-orange-600 mb-1">{mockGroup.name}</h2>
          <div className="text-sm text-gray-500 mb-1">مطعم: {mockGroup.restaurantName}</div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            نوع المجموعة: {mockGroup.type === 'open' ? 'مفتوحة' : mockGroup.type === 'invite' ? 'بدعوة' : 'قسمية'} |
            ينتهي الطلب: {new Date(mockGroup.deadline).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
            <span className="ml-2 px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-bold animate-pulse">
              ⏰ متبقٍ: {formatTime(remaining)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {mockGroup.members.slice(0, 4).map((m) => (
            <img
              key={m.id}
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=FF6B35&color=fff&rounded=true`}
              alt={m.name}
              className="w-8 h-8 rounded-full border-2 border-white shadow"
              title={m.name}
            />
          ))}
          {mockGroup.members.length > 4 && (
            <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold border-2 border-white" title={mockGroup.members.slice(4).map(m => m.name).join(', ')}>
              +{mockGroup.members.length - 4}
            </span>
          )}
        </div>
      </div>
      {/* تتبع حالة الطلب */}
      <OrderStatusTracker status={status} />
      {/* قائمة الطعام وملخص الطلب */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-lg mb-2 text-orange-600">قائمة الطعام</h3>
          <MenuList categories={mockMenu} />
        </div>
        <div>
          <OrderSummary items={items} onRemove={removeItem} />
        </div>
      </div>
      {/* الدردشة الجماعية */}
      <div>
        <h3 className="font-bold text-lg mb-2 text-orange-600">دردشة المجموعة</h3>
        <GroupChat messages={messages} onSend={handleSend} currentUserId={currentUserId} />
      </div>
    </div>
  );
};

export default GroupDetailsPage; 