'use client';

import { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useGameStore } from '../../store/gameStore';
import { MenuItemCard } from '../../components/MenuItemCard';
import { AddMenuItemModal } from '../../components/AddMenuItemModal';
import { MenuItem } from '../../types/game';
import { calculateMenuStats } from '../../utils/gameUtils';

export default function MenuPage() {
  const {
    menu,
    addMenuItem,
    removeMenuItem,
    loadGame
  } = useGameStore();

  const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);

  // 在组件挂载时加载游戏状态，解决页面刷新后菜单不显示的问题
  useEffect(() => {
    loadGame();
  }, []);

  const menuStats = calculateMenuStats(menu);

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-800">菜单管理</h1>
          <button
            onClick={() => setIsAddMenuItemModalOpen(true)}
            className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
          >
            添加新菜品
          </button>
        </div>

        {/* 菜单统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">菜品总数</h3>
            <p className="text-3xl font-bold text-pink-800">{menuStats.totalItems}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">总售价</h3>
            <p className="text-3xl font-bold text-pink-800">¥{menuStats.totalRevenue}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">总成本</h3>
            <p className="text-3xl font-bold text-pink-800">¥{menuStats.totalCost}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">平均人气</h3>
            <p className="text-3xl font-bold text-pink-800">{menuStats.averagePopularity}</p>
          </div>
        </div>

        {/* 菜单列表 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-pink-800 mb-4">菜单列表</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menu.map((item: MenuItem) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onRemove={removeMenuItem}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 添加菜品模态框 */}
      <AddMenuItemModal
        isOpen={isAddMenuItemModalOpen}
        onClose={() => setIsAddMenuItemModalOpen(false)}
        onAdd={addMenuItem}
      />
    </Layout>
  );
}