import { useState, useEffect } from 'react';
import { Employee } from '../types/game';
import { useGameStore } from '../store/gameStore';
import maidNames from '../data/maidName.json';
import { useToastStore } from './Toast';
import { SHOP_LEVELS } from '../types/game';

interface RecruitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecruit: (employee: Employee) => void;
}

const generateRandomEmployee = (): Employee => {
  // 合并所有名字并随机选择
  const allNames = [...maidNames.chineseNames, ...maidNames.japaneseNames, ...maidNames.westernNames];
  const name = allNames[Math.floor(Math.random() * allNames.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    level: 1,
    salary: 1000,
    skills: {
      service: Math.floor(Math.random() * 30) + 20,
      cooking: Math.floor(Math.random() * 30) + 20,
      cleaning: Math.floor(Math.random() * 30) + 20,
    },
  };
};

export const RecruitModal: React.FC<RecruitModalProps> = ({
  isOpen,
  onClose,
  onRecruit,
}) => {
  const [candidates, setCandidates] = useState<Employee[]>([]);
  const { saveGame, employees, shopLevel } = useGameStore();
  const { showToast } = useToastStore();
  
  // 生成三个候选女仆
  const generateCandidates = () => {
    const newCandidates = [];
    for (let i = 0; i < 3; i++) {
      newCandidates.push(generateRandomEmployee());
    }
    setCandidates(newCandidates);
  };

  // 当模态框打开时自动生成候选人
  useEffect(() => {
    if (isOpen && candidates.length === 0) {
      generateCandidates();
    }
  }, [isOpen]);

  const handleRefresh = () => {
    generateCandidates();
  };

  const handleRecruit = async (employee: Employee) => {
    const currentLevel = SHOP_LEVELS.find(level => level.level === shopLevel);
    if (!currentLevel) return;

    if (employees.length >= currentLevel.maxEmployees) {
      showToast(`当前店铺等级最多可雇佣${currentLevel.maxEmployees}名女仆，请先扩张店铺`);
      return;
    }

    onRecruit(employee);
    try {
      await saveGame();
      showToast('游戏已自动保存');
      onClose();
    } catch (error) {
      showToast('自动保存失败');
      console.error('保存游戏失败:', error);
    }
  };

  if (!isOpen) return null;

  const currentLevel = SHOP_LEVELS.find(level => level.level === shopLevel);
  const nextLevel = SHOP_LEVELS.find(level => level.level === shopLevel + 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-pink-800">招募新女仆</h2>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            刷新候选
          </button>
        </div>

        {currentLevel && (
          <div className="mb-4 p-3 bg-pink-50 rounded-lg">
            <p className="text-sm text-pink-800">
              当前店铺等级：{currentLevel.name}（最多可雇佣{currentLevel.maxEmployees}名女仆）
            </p>
            {nextLevel && (
              <p className="text-sm text-pink-800 mt-1">
                升级到{nextLevel.name}需要：¥{nextLevel.expansionCost}
              </p>
            )}
          </div>
        )}
        
        {candidates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">正在寻找应聘女仆...</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="border border-pink-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-700 text-sm font-medium">姓名</p>
                      <p className="text-lg font-semibold text-pink-800">{candidate.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm font-medium">薪资要求</p>
                      <p className="text-lg font-semibold text-pink-800">¥{candidate.salary}/天</p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm font-medium">技能</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-700 font-medium">服务</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-pink-500 h-2 rounded-full"
                              style={{ width: `${(candidate.skills.service / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-700 font-medium">烹饪</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-pink-500 h-2 rounded-full"
                              style={{ width: `${(candidate.skills.cooking / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-700 font-medium">清洁</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-pink-500 h-2 rounded-full"
                              style={{ width: `${(candidate.skills.cleaning / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRecruit(candidate)}
                      className="mt-3 w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                    >
                      录用
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                取消
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};