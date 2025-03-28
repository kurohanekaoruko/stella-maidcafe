'use client';

import { Layout } from '../../components/Layout';
import { useGameStore } from '../../store/gameStore';
import { calculateBusinessStats } from '../../utils/gameUtils';

export default function StatsPage() {
  const {
    money,
    reputation,
    customerCount,
    employees,
    menu,
    day,
  } = useGameStore();

  const stats = calculateBusinessStats(money, reputation, customerCount, employees, menu, day);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-pink-800 mb-8">经营数据</h1>

        {/* 收入分析 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-pink-800 mb-4">收入分析</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600">总营业额</p>
              <p className="text-2xl font-bold text-pink-800">¥{stats.totalRevenue}</p>
            </div>
            <div>
              <p className="text-gray-600">总成本</p>
              <p className="text-2xl font-bold text-pink-800">¥{stats.totalCost}</p>
            </div>
            <div>
              <p className="text-gray-600">总利润</p>
              <p className="text-2xl font-bold text-pink-800">¥{stats.totalProfit}</p>
            </div>
          </div>
        </div>

        {/* 员工分析 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-pink-800 mb-4">员工分析</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600">总薪资支出</p>
              <p className="text-2xl font-bold text-pink-800">¥{stats.totalSalary}/天</p>
            </div>
            <div>
              <p className="text-gray-600">平均服务技能</p>
              <p className="text-2xl font-bold text-pink-800">{stats.avgServiceSkill}</p>
            </div>
            <div>
              <p className="text-gray-600">平均烹饪技能</p>
              <p className="text-2xl font-bold text-pink-800">{stats.avgCookingSkill}</p>
            </div>
          </div>
        </div>

        {/* 菜单分析 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-pink-800 mb-4">菜单分析</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600">菜品数量</p>
              <p className="text-2xl font-bold text-pink-800">{stats.menuItems}</p>
            </div>
            <div>
              <p className="text-gray-600">平均人气度</p>
              <p className="text-2xl font-bold text-pink-800">{stats.avgPopularity}</p>
            </div>
          </div>
        </div>

        {/* 经营效率 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-pink-800 mb-4">经营效率</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600">客单价</p>
              <p className="text-2xl font-bold text-pink-800">¥{stats.revenuePerCustomer}</p>
            </div>
            <div>
              <p className="text-gray-600">顾客满意度</p>
              <p className="text-2xl font-bold text-pink-800">{stats.customerSatisfaction}%</p>
            </div>
            <div>
              <p className="text-gray-600">经营天数</p>
              <p className="text-2xl font-bold text-pink-800">{stats.day}天</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 