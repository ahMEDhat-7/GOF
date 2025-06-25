import React from 'react';
import GroupCard from '../components/features/GroupCard';
import type { Group } from '../types/group';

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'غداء الإثنين',
    type: 'open',
    members: [
      { id: 'u1', name: 'أحمد' },
      { id: 'u2', name: 'سارة' },
      { id: 'u3', name: 'محمد' },
      { id: 'u4', name: 'ليلى' },
      { id: 'u5', name: 'خالد' },
      { id: 'u6', name: 'منى' },
    ],
    orderStatus: 'pending',
    restaurantName: 'بيتزا هت',
    deadline: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'فطور القسم',
    type: 'department',
    members: [
      { id: 'u1', name: 'أحمد' },
      { id: 'u7', name: 'سعيد' },
    ],
    orderStatus: 'delivered',
    restaurantName: 'كودو',
    deadline: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

const UserDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">لوحة تحكم المستخدم</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {mockGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">تاريخ الطلبات الأخيرة</h2>
        <div className="text-gray-500">(سيتم عرض الطلبات هنا)</div>
      </div>
    </div>
  );
};

export default UserDashboard; 