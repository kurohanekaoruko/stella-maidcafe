import { useState } from 'react';
import { MenuItem } from '../types/game';

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
}

const defaultItems: MenuItem[] = [
  {
    id: 'coffee',
    name: '拿铁咖啡',
    price: 28,
    cost: 8,
    popularity: 80,
    category: 'drink',
  },
  {
    id: 'cake',
    name: '草莓蛋糕',
    price: 32,
    cost: 12,
    popularity: 85,
    category: 'dessert',
  },
  {
    id: 'pasta',
    name: '意大利面',
    price: 45,
    cost: 15,
    popularity: 75,
    category: 'food',
  },
  {
    id: 'tea',
    name: '红茶',
    price: 18,
    cost: 5,
    popularity: 70,
    category: 'drink',
  },
  {
    id: 'sandwich',
    name: '三明治',
    price: 25,
    cost: 8,
    popularity: 65,
    category: 'food',
  },
  {
    id: 'ice-cream',
    name: '冰淇淋',
    price: 15,
    cost: 5,
    popularity: 90,
    category: 'dessert',
  },
];

export const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleAdd = () => {
    if (selectedItem) {
      onAdd({
        ...selectedItem,
        id: Math.random().toString(36).substr(2, 9),
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-pink-800 mb-4">添加新菜品</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {defaultItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedItem?.id === item.id
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              }`}
              onClick={() => setSelectedItem(item)}
            >
              <h3 className="font-semibold text-pink-800">{item.name}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">售价: ¥{item.price}</p>
                <p className="text-sm text-gray-600">成本: ¥{item.cost}</p>
                <p className="text-sm text-gray-600">利润: ¥{item.price - item.cost}</p>
                <p className="text-sm text-gray-600">
                  类型:{' '}
                  {item.category === 'drink'
                    ? '饮品'
                    : item.category === 'food'
                    ? '主食'
                    : '甜点'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            取消
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedItem}
            className={`px-4 py-2 rounded ${
              selectedItem
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            添加
          </button>
        </div>
      </div>
    </div>
  );
}; 