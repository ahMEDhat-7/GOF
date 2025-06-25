import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow flex items-center justify-between px-4 py-2 mb-6">
      <div className="flex items-center gap-2">
        <span className="text-orange-600 font-bold text-xl">🍽️ GOF</span>
        <span className="text-gray-400 text-sm hidden sm:inline">| منصة الطلب الجماعي</span>
      </div>
      <div className="flex items-center gap-4">
        {user && user.role === 'admin' && (
          <Link to="/company" className="text-blue-600 hover:underline font-medium">لوحة الشركة</Link>
        )}
        {user && user.role === 'user' && (
          <Link to="/dashboard" className="text-blue-600 hover:underline font-medium">لوحة المستخدم</Link>
        )}
        {user && (
          <span className="text-gray-700 font-medium">{user.name}</span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="تسجيل الخروج"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">خروج</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 