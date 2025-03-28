import React, { useEffect, useState } from 'react';
import { getAllSaves } from '../services/storageService';
import { GameState } from '../types/game';
import { useGameStore } from '../store/gameStore';
import { useToastStore } from './Toast';

interface SaveItem {
  key: string;
  data: GameState & { savedAt: string };
}

export const SavesList: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [saves, setSaves] = useState<SaveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loadGame } = useGameStore();
  const { showToast } = useToastStore();

  useEffect(() => {
    const fetchSaves = async () => {
      try {
        setIsLoading(true);
        const allSaves = await getAllSaves();
        setSaves(allSaves);
      } catch (err) {
        showToast('获取存档列表失败');
        console.error('获取存档列表失败:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaves();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLoadSave = async (key: string) => {
    try {
      await loadGame(key);
      showToast('游戏已加载');
      onClose();
    } catch (err) {
      showToast('加载存档失败');
      console.error('加载存档失败:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p>加载存档列表中...</p>
      </div>
    );
  }



  if (saves.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>没有找到任何存档</p>
      </div>
    );
  }

  return (
    <div className="max-h-80 overflow-y-auto">
      <h3 className="text-lg font-semibold text-pink-800 mb-2">存档列表</h3>
      <div className="space-y-2">
        {saves.map((save) => (
          <div 
            key={save.key} 
            className="bg-pink-50 p-3 rounded-lg cursor-pointer hover:bg-pink-100"
            onClick={() => handleLoadSave(save.key)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{save.key === 'default-save' ? '默认存档' : save.key}</p>
                <p className="text-sm text-gray-600">第 {save.data.day} 天</p>
                <p className="text-sm text-gray-600">资金: ¥{save.data.money}</p>
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(save.data.savedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};