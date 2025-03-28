import { create } from 'zustand';
import { GameState, Employee, MenuItem } from '../types/game';
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
}

const initialState: GameState = {
  money: 10000,
  reputation: 0,
  customerCount: 0,
  employees: [],
  menu: [],
  day: 1,
  time: 0,
};

export const useGameStore = create<GameStore>()((set, get) => ({
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
      money: state.money + amount,
    })),
  updateReputation: (amount: number) =>
    set((state: GameState) => ({
      reputation: Math.round(Math.max(0, Math.min(100, state.reputation + amount))),
    })),
  updateCustomerCount: (amount: number) =>
    set((state: GameState) => ({
      customerCount: state.customerCount + amount,
    })),
  nextDay: () =>
    set((state: GameState) => ({
      day: state.day + 1,
      time: 0,
    })),
  updateTime: (time: number) =>
    set(() => ({
      time: time,
    })),
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
}));