import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { SavesList } from './SavesList';
import { useToastStore } from './Toast';

export const SaveManager: React.FC = () => {
  const { saveGame, loadGame, clearSave, resetGame } = useGameStore();
  const { showToast } = useToastStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSavesList, setShowSavesList] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await saveGame();
      showToast('游戏已保存');
    } catch (error) {
      showToast('保存失败: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      await loadGame();
      showToast('游戏已加载');
    } catch (error) {
      showToast('加载失败: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    if (window.confirm('确定要清空存档吗？此操作不可恢复！')) {
      try {
        setIsLoading(true);
        await clearSave();
        showToast('存档已清空');
      } catch (error) {
        showToast('清空存档失败: ' + error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    if (window.confirm('确定要重置游戏吗？当前进度将丢失！')) {
      resetGame();
      showToast('游戏已重置');
    }
  };



  return (
    <div className="relative">
      {/* 存档按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-pink-600 transition-colors z-50"
        title="存档管理"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      </button>

      {/* 存档面板 */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl p-4 w-64 z-50 border border-pink-200">
          <h3 className="text-lg font-semibold text-pink-800 mb-4">存档管理</h3>
          
          {showSavesList ? (
            <>
              <SavesList onClose={() => setShowSavesList(false)} />
              <button
                onClick={() => setShowSavesList(false)}
                className="mt-3 w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                返回
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 disabled:opacity-50 transition-colors"
              >
                保存游戏
              </button>
              
              <button
                onClick={handleLoad}
                disabled={isLoading}
                className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 disabled:opacity-50 transition-colors"
              >
                加载默认存档
              </button>
              
              <button
                onClick={() => setShowSavesList(true)}
                disabled={isLoading}
                className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 disabled:opacity-50 transition-colors"
              >
                查看所有存档
              </button>
              
              <button
                onClick={handleReset}
                disabled={isLoading}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50 transition-colors"
              >
                重置游戏
              </button>
              
              <button
                onClick={handleClear}
                disabled={isLoading}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                清空存档
              </button>
            </div>
          )}
          

        </div>
      )}
      
      {/* 点击外部关闭面板 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};