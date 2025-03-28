export interface Employee {
  id: string;
  name: string;
  level: number;
  salary: number;
  skills: {
    service: number;
    cooking: number;
    cleaning: number;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  cost: number;
  popularity: number;
  category: 'drink' | 'food' | 'dessert';
}

export interface GameState {
  money: number;
  reputation: number;
  customerCount: number;
  employees: Employee[];
  menu: MenuItem[];
  day: number;
  time: number;
  shopLevel: number;
}

export interface GameStats {
  dailyIncome: number;
  dailyCustomers: number;
  averageSatisfaction: number;
}

// 店铺等级配置
export const SHOP_LEVELS = [
  { level: 1, maxEmployees: 3, expansionCost: 50000, name: '小型店铺' },
  { level: 2, maxEmployees: 5, expansionCost: 100000, name: '中型店铺' },
  { level: 3, maxEmployees: 8, expansionCost: 200000, name: '大型店铺' },
  { level: 4, maxEmployees: 12, expansionCost: 500000, name: '豪华店铺' },
]; 