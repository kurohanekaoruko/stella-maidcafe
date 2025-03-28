import React from 'react';
import { useGameStore } from '../store/gameStore';
import { SHOP_LEVELS } from '../types/game';
import { useToastStore } from './Toast';

export const Dashboard: React.FC = () => {
  const { money, reputation, customerCount, day, time, shopLevel, expandShop } = useGameStore();
  const { showToast } = useToastStore();

  const currentLevel = SHOP_LEVELS.find(level => level.level === shopLevel);
  const nextLevel = SHOP_LEVELS.find(level => level.level === shopLevel + 1);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleExpand = () => {
    if (expandShop()) {
      showToast(`咖啡厅已升级到${nextLevel?.name}`);
    } else {
      showToast('资金不足，无法升级咖啡厅');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-pink-800 mb-6">咖啡厅</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-pink-800">当前资金</h3>
          <p className="text-2xl font-bold text-pink-600">¥{money.toLocaleString()}</p>
        </div>

        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-pink-800">声望</h3>
          <p className="text-2xl font-bold text-pink-600">{reputation}</p>
        </div>

        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-pink-800">今日顾客</h3>
          <p className="text-2xl font-bold text-pink-600">{customerCount}</p>
        </div>

        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-pink-800">营业时间</h3>
          <p className="text-2xl font-bold text-pink-600">{formatTime(time)}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-pink-800 mb-2">咖啡厅信息</h3>
          <div className="space-y-2">
            <p className="text-sm text-pink-800">
              第 {day} 天
            </p>
            <p className="text-sm text-pink-800">
              当前咖啡厅等级：{currentLevel?.name}
            </p>
            {nextLevel && (
              <>
                <p className="text-sm text-pink-800">
                  升级到{nextLevel.name}需要：¥{nextLevel.expansionCost.toLocaleString()}
                </p>
                <button
                  onClick={handleExpand}
                  disabled={money < nextLevel.expansionCost}
                  className={`w-full px-4 py-2 rounded mt-2 ${
                    money >= nextLevel.expansionCost
                      ? 'bg-pink-500 text-white hover:bg-pink-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  升级咖啡厅
                </button>
              </>
            )}
            {!nextLevel && (
              <p className="text-sm text-pink-800">
                咖啡厅已达到最高等级
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 