import React, { useState, useEffect } from 'react';
import { create } from 'zustand';

interface ToastState {
  message: string;
  isVisible: boolean;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  message: '',
  isVisible: false,
  showToast: (message: string) => {
    set({ message, isVisible: true });
    // 3秒后自动隐藏
    setTimeout(() => {
      set({ isVisible: false });
    }, 3000);
  },
  hideToast: () => set({ isVisible: false }),
}));

export const Toast: React.FC = () => {
  const { message, isVisible, hideToast } = useToastStore();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsExiting(false);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      hideToast();
    }, 300); // 动画持续时间
  };

  if (!isVisible && !isExiting) return null;

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50">
      <div
        className={`bg-white border-l-4 border-pink-500 py-3 px-5 rounded-lg shadow-lg transition-all duration-300 transform ${
          isExiting ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-4'
        }`}
      >
        <div className="flex items-center">
          <div className="mr-3 text-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-gray-800 max-w-xs">{message}</div>
          <button
            onClick={handleClose}
            className="ml-4 text-gray-400 hover:text-gray-600"
            title="关闭提示"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};