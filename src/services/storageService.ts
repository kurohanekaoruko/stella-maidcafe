/**
 * 游戏存档存储服务
 * 使用IndexedDB实现游戏存档的保存、加载和清空功能
 */

import { GameState } from '../types/game';

const DB_NAME = 'stella-maid-cafe-db';
const DB_VERSION = 1;
const STORE_NAME = 'game-saves';
const DEFAULT_SAVE_KEY = 'default-save';

/**
 * 初始化IndexedDB数据库
 */
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      console.error('IndexedDB打开失败:', event);
      reject('无法打开游戏存档数据库');
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      // 创建存储对象存储区
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

/**
 * 保存游戏状态
 * @param gameState 当前游戏状态
 * @param saveName 存档名称（可选，默认为'default-save'）
 */
export const saveGame = async (gameState: GameState, saveName: string = DEFAULT_SAVE_KEY): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // 添加保存时间戳
    const saveData = {
      ...gameState,
      savedAt: new Date().toISOString()
    };
    
    const request = store.put(saveData, saveName);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        console.log('游戏已保存');
        resolve();
      };
      
      request.onerror = () => {
        console.error('保存游戏失败:', request.error);
        reject('保存游戏失败');
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('保存游戏时出错:', error);
    throw error;
  }
};

/**
 * 加载游戏状态
 * @param saveName 存档名称（可选，默认为'default-save'）
 * @returns 游戏状态或null（如果没有找到存档）
 */
export const loadGame = async (saveName: string = DEFAULT_SAVE_KEY): Promise<GameState | null> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(saveName);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const savedData = request.result;
        if (savedData) {
          // 移除保存时间戳，返回纯游戏状态
          const { savedAt, ...gameState } = savedData;
          console.log('游戏已加载');
          resolve(gameState as GameState);
        } else {
          console.log('没有找到存档');
          resolve(null);
        }
      };
      
      request.onerror = () => {
        console.error('加载游戏失败:', request.error);
        reject('加载游戏失败');
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('加载游戏时出错:', error);
    throw error;
  }
};

/**
 * 清空游戏存档
 * @param saveName 存档名称（可选，默认为'default-save'）
 */
export const clearSave = async (saveName: string = DEFAULT_SAVE_KEY): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(saveName);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        console.log('游戏存档已清空');
        resolve();
      };
      
      request.onerror = () => {
        console.error('清空游戏存档失败:', request.error);
        reject('清空游戏存档失败');
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('清空游戏存档时出错:', error);
    throw error;
  }
};

/**
 * 获取所有存档
 * @returns 所有存档的键值对
 */
export const getAllSaves = async (): Promise<{key: string, data: GameState & {savedAt: string}}[]> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAllKeys();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = async () => {
        const keys = request.result as string[];
        const saves: {key: string, data: GameState & {savedAt: string}}[] = [];
        
        for (const key of keys) {
          const getRequest = store.get(key);
          await new Promise<void>((innerResolve) => {
            getRequest.onsuccess = () => {
              saves.push({
                key,
                data: getRequest.result
              });
              innerResolve();
            };
          });
        }
        
        resolve(saves);
      };
      
      request.onerror = () => {
        console.error('获取所有存档失败:', request.error);
        reject('获取所有存档失败');
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('获取所有存档时出错:', error);
    throw error;
  }
};