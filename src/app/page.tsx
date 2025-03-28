'use client';

import { Layout } from '../components/Layout';
import { useGameStore } from '../store/gameStore';
import { GameLoop } from '../components/GameLoop';
import { formatTime } from '../utils/gameUtils';
import { InfoPanel } from '../components/InfoPanel';

export default function Dashboard() {
  const {
    money,
    reputation,
    customerCount,
    employees,
    menu,
    time,
    day,
  } = useGameStore();

  return (
    <Layout>
      <GameLoop />
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-800">仪表盘</h1>
          <div className="text-lg text-pink-700">
            第 {day} 天 {formatTime(time)}
          </div>
        </div>

        {/* 状态卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">当前资金</h3>
            <p className="text-3xl font-bold text-pink-800">¥{money}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">咖啡厅声望</h3>
            <p className="text-3xl font-bold text-pink-800">{reputation}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">今日顾客</h3>
            <p className="text-3xl font-bold text-pink-800">{customerCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">女仆数量</h3>
            <p className="text-3xl font-bold text-pink-800">{employees.length}/3</p>
          </div>
        </div>

        {/* 信息面板 */}
        <InfoPanel />
        
        {/* 今日概览 */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-pink-800 mb-4">今日概览</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">菜单项目</p>
              <p className="text-2xl font-semibold text-pink-800">{menu.length}</p>
            </div>
            <div>
              <p className="text-gray-600">平均顾客满意度</p>
              <p className="text-2xl font-semibold text-pink-800">
                {Math.round(reputation + 50)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
