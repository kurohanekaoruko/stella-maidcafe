import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Employee, MenuItem } from '../types/game';

const GAME_SPEED = 1000; // 1秒 = 1分钟游戏时间
const DAY_LENGTH = 24 * 60; // 24小时 * 60分钟
const CUSTOMER_CHANCE = 0.3; // 每分钟30%的概率生成顾客

export const GameLoop: React.FC = () => {
  const {
    time,
    day,
    reputation,
    employees,
    menu,
    money,
    updateTime,
    nextDay,
    updateMoney,
    updateCustomerCount,
    updateReputation,
    saveGame,
    loadGame,
  } = useGameStore();

  // 组件挂载时加载存档
  useEffect(() => {
    const loadSavedGame = async () => {
      try {
        await loadGame();
      } catch (error) {
        console.error('加载存档失败:', error);
      }
    };
    
    loadSavedGame();
  }, []);

  // 游戏循环
  useEffect(() => {
    const interval = setInterval(() => {
      // 更新时间
      const newTime = time + 1;
      if (newTime >= DAY_LENGTH) {
        // 结束一天
        nextDay();
        // 每天结束时保存游戏
        saveGame().catch(err => console.error('保存游戏失败:', err));
      } else {
        updateTime(newTime);
      }

      // 生成顾客
      if (Math.random() < CUSTOMER_CHANCE) {
        updateCustomerCount(1);

        // 计算顾客消费
        const customerSatisfaction = calculateCustomerSatisfaction();
        const spending = calculateCustomerSpending(customerSatisfaction);

        // 更新资金和声望
        updateMoney(spending);
        updateReputation(customerSatisfaction - 50); // 50是基准满意度
      }
    }, GAME_SPEED);

    return () => clearInterval(interval);
  }, [time, day, reputation, employees, menu, money, updateTime, nextDay, updateMoney, updateCustomerCount, updateReputation, saveGame]);
  
  // 游戏状态变化时自动保存（节流版本，避免过于频繁保存）
  useEffect(() => {
    const autoSaveTimeout = setTimeout(() => {
      saveGame().catch(err => console.error('自动保存失败:', err));
    }, 10000); // 状态变化10秒后保存
    
    return () => clearTimeout(autoSaveTimeout);
  }, [money, reputation, employees.length, menu.length, day]);

  // 计算顾客满意度
  const calculateCustomerSatisfaction = () => {
    let satisfaction = 50; // 基准满意度

    // 根据女仆技能计算满意度
    if (employees.length > 0) {
      const avgService = employees.reduce((sum: number, emp: Employee) => sum + emp.skills.service, 0) / employees.length;
      const avgCooking = employees.reduce((sum: number, emp: Employee) => sum + emp.skills.cooking, 0) / employees.length;
      const avgCleaning = employees.reduce((sum: number, emp: Employee) => sum + emp.skills.cleaning, 0) / employees.length;

      satisfaction += (avgService + avgCooking + avgCleaning) / 300; // 最高增加50点
    }

    // 根据菜单多样性计算满意度
    if (menu.length > 0) {
      const avgPopularity = menu.reduce((sum: number, item: MenuItem) => sum + item.popularity, 0) / menu.length;
      satisfaction += avgPopularity / 100; // 最高增加100点
    }

    return Math.min(100, Math.max(0, satisfaction));
  };

  // 计算顾客消费
  const calculateCustomerSpending = (satisfaction: number) => {
    let baseSpending = 50; // 基础消费

    // 根据满意度调整消费
    if (satisfaction > 70) {
      baseSpending *= 1.5; // 满意度高时增加50%消费
    } else if (satisfaction < 30) {
      baseSpending *= 0.5; // 满意度低时减少50%消费
    }

    // 根据声望调整消费
    baseSpending *= (1 + reputation / 200); // 声望每100点增加50%消费

    return Math.round(baseSpending);
  };

  return null; // 这是一个逻辑组件，不需要渲染UI
};