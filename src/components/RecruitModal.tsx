import { useState } from 'react';
import { Employee } from '../types/game';

interface RecruitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecruit: (employee: Employee) => void;
}

const generateRandomEmployee = (): Employee => {
  const names = ['小樱', '小梅', '小桃', '小兰', '小菊', '小竹', '小松', '小柏'];
  const name = names[Math.floor(Math.random() * names.length)];
  
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
  const [employee, setEmployee] = useState<Employee | null>(null);

  const handleGenerate = () => {
    setEmployee(generateRandomEmployee());
  };

  const handleRecruit = () => {
    if (employee) {
      onRecruit(employee);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-pink-800 mb-4">招募新员工</h2>
        
        {!employee ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">点击下方按钮生成应聘者信息</p>
            <button
              onClick={handleGenerate}
              className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
            >
              生成应聘者
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">姓名</p>
                <p className="text-lg font-semibold">{employee.name}</p>
              </div>
              <div>
                <p className="text-gray-600">薪资要求</p>
                <p className="text-lg font-semibold">¥{employee.salary}/天</p>
              </div>
              <div>
                <p className="text-gray-600">技能</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">服务</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full"
                        style={{ width: `${(employee.skills.service / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">烹饪</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full"
                        style={{ width: `${(employee.skills.cooking / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">清洁</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full"
                        style={{ width: `${(employee.skills.cleaning / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                取消
              </button>
              <button
                onClick={handleRecruit}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                录用
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 