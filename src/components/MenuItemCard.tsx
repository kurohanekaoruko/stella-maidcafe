import { MenuItem } from '../types/game';

interface MenuItemCardProps {
  item: MenuItem;
  onRemove: (id: string) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-pink-800">{item.name}</h3>
          <p className="text-sm text-gray-600">售价: ¥{item.price}</p>
          <p className="text-sm text-gray-600">成本: ¥{item.cost}</p>
          <p className="text-sm text-gray-600">利润: ¥{item.price - item.cost}</p>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          下架
        </button>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">人气度</span>
          <span className="text-sm text-gray-600">{item.popularity}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className="bg-pink-500 h-2 rounded-full"
            style={{ width: `${item.popularity}%` }}
          />
        </div>
      </div>
      
      <div className="mt-2">
        <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
          {item.category === 'drink' ? '饮品' : item.category === 'food' ? '主食' : '甜点'}
        </span>
      </div>
    </div>
  );
}; 