import React, { useState } from 'react';
import type { MenuItem, MenuOption } from '../../types/menu';
import { PlusCircle } from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import Modal from '../ui/Modal';
import toast from 'react-hot-toast';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const addItem = useOrderStore((s) => s.addItem);
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<MenuOption[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem(item, quantity, selectedOptions);
    setOpen(false);
    setSelectedOptions([]);
    setQuantity(1);
    toast.success('تمت إضافة الصنف للطلب');
  };

  const handleOptionChange = (option: MenuOption) => {
    setSelectedOptions((prev) =>
      prev.some((o) => o.id === option.id)
        ? prev.filter((o) => o.id !== option.id)
        : [...prev, option]
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-lg transition">
        <img
          src={item.imageUrl || 'https://placehold.co/120x80?text=صنف'}
          alt={item.name}
          className="w-full h-32 object-cover rounded-lg mb-2"
        />
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-lg text-gray-800">{item.name}</span>
          <span className="text-orange-600 font-bold">{item.price} ريال</span>
        </div>
        {item.description && <div className="text-sm text-gray-500 mb-1">{item.description}</div>}
        {item.options && item.options.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {item.options.map((opt) => (
              <span key={opt.id} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                {opt.name} +{opt.price} ريال
              </span>
            ))}
          </div>
        )}
        <button
          onClick={() => (item.options && item.options.length > 0 ? setOpen(true) : (addItem(item, 1, []), toast.success('تمت إضافة الصنف للطلب')))}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-1.5 rounded transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <PlusCircle size={18} />
          <span>إضافة</span>
        </button>
      </div>
      {/* نافذة التخصيص */}
      {item.options && item.options.length > 0 && (
        <Modal open={open} onClose={() => setOpen(false)} title={`تخصيص ${item.name}`}>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">الإضافات:</label>
              <div className="flex flex-wrap gap-2">
                {item.options.map((opt) => (
                  <label key={opt.id} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOptions.some((o) => o.id === opt.id)}
                      onChange={() => handleOptionChange(opt)}
                      className="accent-orange-600"
                    />
                    <span className="text-sm">{opt.name} <span className="text-gray-400">+{opt.price} ريال</span></span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">الكمية:</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="input input-bordered w-20 border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              onClick={handleAdd}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              إضافة للطلب
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MenuItemCard; 