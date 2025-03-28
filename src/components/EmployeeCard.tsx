import { Employee } from '../types/game';

interface EmployeeCardProps {
  employee: Employee;
  onRemove: (id: string) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-pink-800">{employee.name}</h3>
          <p className="text-sm text-gray-600">等级: {employee.level}</p>
          <p className="text-sm text-gray-600">薪资: ¥{employee.salary}/天</p>
        </div>
        <button
          onClick={() => onRemove(employee.id)}
          className="text-red-500 hover:text-red-700"
        >
          解雇
        </button>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700">技能</h4>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div className="text-center">
            <p className="text-xs text-gray-600">服务</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full"
                style={{ width: `${(employee.skills.service / 100) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">烹饪</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full"
                style={{ width: `${(employee.skills.cooking / 100) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">清洁</p>
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
  );
}; 