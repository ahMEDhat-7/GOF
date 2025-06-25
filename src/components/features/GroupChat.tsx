import React, { useRef, useEffect, useState } from 'react';
import type { Message } from '../../types/chat';
import { Send } from 'lucide-react';

interface GroupChatProps {
  messages: Message[];
  onSend: (content: string) => void;
  currentUserId: string;
}

const GroupChat: React.FC<GroupChatProps> = ({ messages, onSend, currentUserId }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-96 bg-white rounded-xl shadow p-4">
      <div className="flex-1 overflow-y-auto space-y-2 mb-2 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg shadow text-sm break-words ${
                msg.senderId === currentUserId
                  ? 'bg-orange-100 text-orange-800 self-end rounded-br-none'
                  : 'bg-gray-100 text-gray-700 self-start rounded-bl-none'
              }`}
              title={msg.senderName}
            >
              <span className="block font-bold text-xs mb-1 text-gray-500">{msg.senderName}</span>
              {msg.content}
              <span className="block text-[10px] text-gray-400 mt-1 text-left ltr:text-right rtl:text-left">
                {new Date(msg.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 input input-bordered border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="اكتب رسالة..."
          aria-label="اكتب رسالة"
        />
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="إرسال"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default GroupChat; 