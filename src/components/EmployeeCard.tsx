import React, { useState } from 'react';
import { Employee } from '../types/game';
import { ConfirmModal } from './ConfirmModal';
import { useGameStore } from '../store/gameStore';
import { useToastStore } from './Toast';

interface EmployeeCardProps {
  employee: Employee;
  onDismiss: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onDismiss }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { saveGame } = useGameStore();
  const { showToast } = useToastStore();

  const handleDismiss = async () => {
    try {
      onDismiss();
      await saveGame();
      showToast('女仆已辞退');
    } catch (error) {
      showToast('辞退失败');
      console.error('保存游戏失败:', error);
    }
  };

  const handleConfirm = () => {
    handleDismiss();
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-pink-800">{employee.name}</h3>
          <p className="text-gray-600">等级: {employee.level}</p>
          <p className="text-gray-600">薪资: ¥{employee.salary}/天</p>
        </div>
        <button
          onClick={() => setIsConfirmModalOpen(true)}
          className="text-red-500 hover:text-red-700"
          title="解雇"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700">技能</h4>
        <div className="mt-2 space-y-2">
          <div>
            <p className="text-xs text-gray-700">服务</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full"
                style={{ width: `${(employee.skills.service / 100) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-700">烹饪</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full"
                style={{ width: `${(employee.skills.cooking / 100) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-700">清洁</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full"
                style={{ width: `${(employee.skills.cleaning / 100) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        title="确认解雇"
        message={`确定要解雇${employee.name}吗？`}
      />
    </div>
  );
};