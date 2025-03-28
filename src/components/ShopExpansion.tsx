import React from 'react';
import { useGameStore } from '../store/gameStore';
import { SHOP_LEVELS } from '../types/game';
import { useToastStore } from './Toast';

export const ShopExpansion: React.FC = () => {
  const { money, shopLevel, expandShop } = useGameStore();
  const { showToast } = useToastStore();

  const currentLevel = SHOP_LEVELS.find(level => level.level === shopLevel);
  const nextLevel = SHOP_LEVELS.find(level => level.level === shopLevel + 1);

  const handleExpand = () => {
    if (expandShop()) {
      showToast(`店铺已升级到${nextLevel?.name}`);
    } else {
      showToast('资金不足，无法升级店铺');
    }
  };

  if (!nextLevel) {
    return (
      <div className="p-4 bg-pink-50 rounded-lg">
        <p className="text-pink-800">店铺已达到最高等级</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-pink-50 rounded-lg">
      <h3 className="text-lg font-semibold text-pink-800 mb-2">店铺扩张</h3>
      <div className="space-y-2">
        <p className="text-sm text-pink-800">
          当前等级：{currentLevel?.name}（最多可雇佣{currentLevel?.maxEmployees}名女仆）
        </p>
        <p className="text-sm text-pink-800">
          升级到{nextLevel.name}后可雇佣{nextLevel.maxEmployees}名女仆
        </p>
        <p className="text-sm text-pink-800">
          升级费用：¥{nextLevel.expansionCost}
        </p>
        <button
          onClick={handleExpand}
          disabled={money < nextLevel.expansionCost}
          className={`w-full px-4 py-2 rounded ${
            money >= nextLevel.expansionCost
              ? 'bg-pink-500 text-white hover:bg-pink-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          升级店铺
        </button>
      </div>
    </div>
  );
}; 