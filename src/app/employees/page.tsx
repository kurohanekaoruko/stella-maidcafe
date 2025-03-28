'use client';

import { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useGameStore } from '../../store/gameStore';
import { EmployeeCard } from '../../components/EmployeeCard';
import { RecruitModal } from '../../components/RecruitModal';
import { Employee } from '../../types/game';
import { calculateEmployeeAverageSkills } from '../../utils/gameUtils';

export default function EmployeesPage() {
  const {
    employees,
    addEmployee,
    removeEmployee,
    loadGame
  } = useGameStore();

  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);

  // 在组件挂载时加载游戏状态，解决页面刷新后女仆不显示的问题
  useEffect(() => {
    loadGame();
  }, []);

  const avgSkills = calculateEmployeeAverageSkills(employees);

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-800">女仆管理</h1>
          <button
            onClick={() => setIsRecruitModalOpen(true)}
            className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
            disabled={employees.length >= 3}
          >
            招募新女仆
          </button>
        </div>

        {/* 女仆统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">当前女仆数</h3>
            <p className="text-3xl font-bold text-pink-800">{employees.length}/3</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">平均服务技能</h3>
            <p className="text-3xl font-bold text-pink-800">{avgSkills.service}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">平均烹饪技能</h3>
            <p className="text-3xl font-bold text-pink-800">{avgSkills.cooking}</p>
          </div>
        </div>

        {/* 女仆列表 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-pink-800 mb-4">女仆列表</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((employee: Employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onDismiss={() => removeEmployee(employee.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 招募女仆模态框 */}
      <RecruitModal
        isOpen={isRecruitModalOpen}
        onClose={() => setIsRecruitModalOpen(false)}
        onRecruit={addEmployee}
      />
    </Layout>
  );
}