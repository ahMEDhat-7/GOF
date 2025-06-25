import React from 'react';
import Navbar from '../ui/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4">{children}</main>
    </div>
  );
};

export default MainLayout; 