'use client';

import { useGameStore } from '../store/gameStore';
import { calculateMenuStats, calculateBusinessStats } from '../utils/gameUtils';

export const InfoPanel = () => {
  const { money, reputation, customerCount, employees, menu, day } = useGameStore();
  
  // 计算菜单统计数据
  const menuStats = calculateMenuStats(menu);
  
  // 计算经营数据
  const businessStats = calculateBusinessStats(
    money,
    reputation,
    customerCount,
    employees,
    menu,
    day
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 资金变动情况 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-pink-800 mb-4">资金变动</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">总收入</p>
            <p className="text-lg font-semibold text-green-600">+¥{menuStats.totalRevenue}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">总支出</p>
            <p className="text-lg font-semibold text-red-600">-¥{menuStats.totalCost + businessStats.totalSalary}</p>
          </div>
          <div className="flex justify-between items-center border-t pt-2">
            <p className="text-gray-700 font-medium">净利润</p>
            <p className="text-xl font-bold text-pink-800">¥{menuStats.totalProfit - businessStats.totalSalary}</p>
          </div>
        </div>
      </div>

      {/* 客人光顾情况 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-pink-800 mb-4">客人光顾情况</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">今日客人数量</p>
            <p className="text-lg font-semibold text-pink-800">{customerCount} 人</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">客人满意度</p>
            <p className="text-lg font-semibold text-pink-800">{businessStats.customerSatisfaction}%</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">人均消费</p>
            <p className="text-lg font-semibold text-pink-800">¥{businessStats.revenuePerCustomer || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};