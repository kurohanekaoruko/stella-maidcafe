import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, Employee, MenuItem, SHOP_LEVELS } from '../types/game';
import { saveGame, loadGame, clearSave } from '../services/storageService';

interface GameStore extends GameState {
  addEmployee: (employee: Employee) => void;
  removeEmployee: (id: string) => void;
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
  updateMoney: (amount: number) => void;
  updateReputation: (amount: number) => void;
  updateCustomerCount: (amount: number) => void;
  nextDay: () => void;
  updateTime: (time: number) => void;
  saveGame: () => Promise<void>;
  loadGame: (saveName?: string) => Promise<void>;
  resetGame: () => void;
  clearSave: () => Promise<void>;
  expandShop: () => boolean;
}

const initialState: GameState = {
  money: 10000,
  reputation: 50,
  customerCount: 0,
  employees: [],
  menu: [],
  day: 1,
  time: 0,
  shopLevel: 1,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      addEmployee: (employee: Employee) =>
        set((state: GameState) => ({
          employees: [...state.employees, employee],
          money: state.money - employee.salary,
        })),
      removeEmployee: (id: string) =>
        set((state: GameState) => ({
          employees: state.employees.filter((e: Employee) => e.id !== id),
        })),
      addMenuItem: (item: MenuItem) =>
        set((state: GameState) => ({
          menu: [...state.menu, item],
          money: state.money - item.cost,
        })),
      removeMenuItem: (id: string) =>
        set((state: GameState) => ({
          menu: state.menu.filter((item: MenuItem) => item.id !== id),
        })),
      updateMoney: (amount: number) =>
        set((state: GameState) => ({
          money: Math.max(0, state.money + amount),
        })),
      updateReputation: (amount: number) =>
        set((state: GameState) => ({
          reputation: Math.min(100, Math.max(0, state.reputation + amount)),
        })),
      updateCustomerCount: (amount: number) =>
        set((state: GameState) => ({
          customerCount: state.customerCount + amount,
        })),
      nextDay: () =>
        set((state: GameState) => ({
          day: state.day + 1,
          time: 0,
          customerCount: 0,
        })),
      updateTime: (time: number) =>
        set(() => ({
          time: time,
        })),
      expandShop: () => {
        const state = get();
        const currentLevel = SHOP_LEVELS.find(level => level.level === state.shopLevel);
        const nextLevel = SHOP_LEVELS.find(level => level.level === state.shopLevel + 1);
        
        if (nextLevel && state.money >= nextLevel.expansionCost) {
          set(state => ({
            money: state.money - nextLevel.expansionCost,
            shopLevel: nextLevel.level,
          }));
          return true;
        }
        return false;
      },
      saveGame: async () => {
        const state = get();
        const gameState: GameState = {
          money: state.money,
          reputation: state.reputation,
          customerCount: state.customerCount,
          employees: state.employees,
          menu: state.menu,
          day: state.day,
          time: state.time,
          shopLevel: state.shopLevel,
        };
        await saveGame(gameState);
      },
      loadGame: async (saveName?: string) => {
        const savedState = await loadGame(saveName);
        if (savedState) {
          set(savedState);
        }
      },
      resetGame: () => {
        set(initialState);
      },
      clearSave: async () => {
        await clearSave();
        set(initialState);
      },
    }),
    {
      name: 'game-storage',
    }
  )
);