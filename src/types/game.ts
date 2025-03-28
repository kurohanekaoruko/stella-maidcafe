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
}

export interface GameStats {
  dailyIncome: number;
  dailyCustomers: number;
  averageSatisfaction: number;
} 