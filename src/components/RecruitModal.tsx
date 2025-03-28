import { useState, useEffect } from 'react';
import { Employee } from '../types/game';
import { useGameStore } from '../store/gameStore';

interface RecruitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecruit: (employee: Employee) => void;
}

const generateRandomEmployee = (): Employee => {
  // 中文风格名字
  const chineseNames = ['小樱', '小梅', '小桃', '小兰', '小菊', '小竹', '小松', '小柏', '小荷', '小雪', '小月', '小星', '小云', '小风', '小雨', '小霜', '小露', '小蕾', '小莲', '小蝶'];
  
  // 日式风格名字
  const japaneseNames = ['小百合', '小椿', '小樱花', '小雏', '小葵', '小铃', '小舞', '小凛', '小和', '小爱', '小结', '小叶', '小绘', '小奈', '小惠', '小真', '小琳', '小千', '小织', '小纱'];
  
  // 西方风格名字
  const westernNames = ['爱丽丝', '露西', '艾米丽', '索菲亚', '奥利维亚', '艾玛', '夏洛特', '伊莎贝拉', '维多利亚', '格蕾丝', '莉莉', '艾拉', '米娅', '佐伊', '汉娜', '阿比盖尔', '艾娃', '斯嘉丽', '麦迪逊', '克洛伊'];
  
  // 合并所有名字并随机选择
  const allNames = [...chineseNames, ...japaneseNames, ...westernNames];
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
  const { saveGame } = useGameStore();
  
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

  const handleRecruit = (employee: Employee) => {
    onRecruit(employee);
    // 招募女仆后自动保存游戏状态
    saveGame();
    onClose();
  };

  if (!isOpen) return null;

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
                      <p className="text-gray-600 text-sm">姓名</p>
                      <p className="text-lg font-semibold">{candidate.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">薪资要求</p>
                      <p className="text-lg font-semibold">¥{candidate.salary}/天</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">技能</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-600">服务</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-pink-500 h-2 rounded-full"
                              style={{ width: `${(candidate.skills.service / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">烹饪</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-pink-500 h-2 rounded-full"
                              style={{ width: `${(candidate.skills.cooking / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">清洁</p>
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