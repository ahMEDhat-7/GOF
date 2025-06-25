import React from 'react';
import type { Group } from '../../types/group';
import { Users, Clock } from 'lucide-react';

interface GroupCardProps {
  group: Group;
}

const statusColors: Record<Group['orderStatus'], string> = {
  pending: 'bg-blue-100 text-blue-700',
  preparing: 'bg-yellow-100 text-yellow-700',
  delivering: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-200 text-gray-500',
};

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="text-orange-500" size={20} />
          <span className="font-bold text-lg">{group.name}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 ml-2">
            {group.type === 'open' ? 'مفتوحة' : group.type === 'invite' ? 'بدعوة' : 'قسمية'}
          </span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded font-bold ${statusColors[group.orderStatus]}`}>
          {{
            pending: 'بانتظار التأكيد',
            preparing: 'قيد التجهيز',
            delivering: 'قيد التوصيل',
            delivered: 'تم التوصيل',
            cancelled: 'ملغي'
          }[group.orderStatus]}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Clock size={16} className="text-gray-400" />
        <span className="text-sm text-gray-500">ينتهي الطلب: {new Date(group.deadline).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm text-gray-700">مطعم: {group.restaurantName}</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-gray-500">الأعضاء:</span>
        <div className="flex -space-x-2">
          {group.members.slice(0, 5).map((m) => (
            <img
              key={m.id}
              src={m.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=FF6B35&color=fff&rounded=true`}
              alt={m.name}
              className="w-7 h-7 rounded-full border-2 border-white shadow"
              title={m.name}
            />
          ))}
          {group.members.length > 5 && (
            <span className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold border-2 border-white">+{group.members.length - 5}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupCard; 