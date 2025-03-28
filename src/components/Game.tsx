import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Employee, MenuItem } from '../types/game';
import { EmployeeCard } from './EmployeeCard';
import { RecruitModal } from './RecruitModal';
import { AddMenuItemModal } from './AddMenuItemModal';
import { Dashboard } from './Dashboard';
import { ShopExpansion } from './ShopExpansion';

export const Game: React.FC = () => {
  const { employees, menu, money, day, time, addEmployee, removeEmployee, addMenuItem } = useGameStore();
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);

  const handleRecruit = (employee: Employee) => {
    addEmployee(employee);
    setIsRecruitModalOpen(false);
  };

  const handleAddMenuItem = (item: MenuItem) => {
    addMenuItem(item);
    setIsAddMenuItemModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Dashboard />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-pink-800 mb-4">员工管理</h2>
          <div className="space-y-4">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onDismiss={() => removeEmployee(employee.id)}
              />
            ))}
            <button
              onClick={() => setIsRecruitModalOpen(true)}
              className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              招募新女仆
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-pink-800 mb-4">菜单管理</h2>
          <div className="space-y-4">
            {menu.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-pink-800">{item.name}</h3>
                <p className="text-gray-600">售价: ¥{item.price}</p>
                <p className="text-gray-600">成本: ¥{item.cost}</p>
                <p className="text-gray-600">利润: ¥{item.price - item.cost}</p>
              </div>
            ))}
            <button
              onClick={() => setIsAddMenuItemModalOpen(true)}
              className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              添加新菜品
            </button>
          </div>
        </div>
      </div>

      <RecruitModal
        isOpen={isRecruitModalOpen}
        onClose={() => setIsRecruitModalOpen(false)}
        onRecruit={handleRecruit}
      />

      <AddMenuItemModal
        isOpen={isAddMenuItemModalOpen}
        onClose={() => setIsAddMenuItemModalOpen(false)}
        onAdd={handleAddMenuItem}
      />
    </div>
  );
}; 