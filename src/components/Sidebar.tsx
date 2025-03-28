import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: '咖啡厅', icon: '🏠' },
    { path: '/employees', label: '员工管理', icon: '👥' },
    { path: '/menu', label: '菜单管理', icon: '📋' },
    { path: '/settings', label: '设置', icon: '⚙️' },
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-pink-800">Stella</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-800 ${
              location.pathname === item.path ? 'bg-pink-50 text-pink-800' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}; 