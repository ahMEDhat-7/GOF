import React, { useState } from 'react';
import GroupChat from '../components/features/GroupChat';
import type { Message } from '../types/chat';

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
  {
    id: 'm3',
    senderId: 'u1',
    senderName: 'أحمد',
    content: 'الساعة 2 ظهرًا بإذن الله.',
    createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
];

const GroupChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

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
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">دردشة المجموعة</h1>
      <GroupChat messages={messages} onSend={handleSend} currentUserId={currentUserId} />
    </div>
  );
};

export default GroupChatPage; 