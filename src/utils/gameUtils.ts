import { Employee, MenuItem } from '../types/game';

// 格式化时间显示
export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// 计算员工平均技能
export const calculateEmployeeAverageSkills = (employees: Employee[]) => {
  if (employees.length === 0) {
    return {
      service: 0,
      cooking: 0,
      cleaning: 0,
    };
  }

  return {
    service: Math.round(
      employees.reduce((sum, emp) => sum + emp.skills.service, 0) / employees.length
    ),
    cooking: Math.round(
      employees.reduce((sum, emp) => sum + emp.skills.cooking, 0) / employees.length
    ),
    cleaning: Math.round(
      employees.reduce((sum, emp) => sum + emp.skills.cleaning, 0) / employees.length
    ),
  };
};

// 计算菜单统计
export const calculateMenuStats = (menu: MenuItem[]) => {
  if (menu.length === 0) {
    return {
      totalItems: 0,
      totalRevenue: 0,
      totalCost: 0,
      totalProfit: 0,
      averagePopularity: 0,
    };
  }

  const totalRevenue = menu.reduce((sum, item) => sum + item.price, 0);
  const totalCost = menu.reduce((sum, item) => sum + item.cost, 0);
  const totalProfit = menu.reduce((sum, item) => sum + (item.price - item.cost), 0);
  const averagePopularity = Math.round(
    menu.reduce((sum, item) => sum + item.popularity, 0) / menu.length
  );

  return {
    totalItems: menu.length,
    totalRevenue,
    totalCost,
    totalProfit,
    averagePopularity,
  };
};

// 计算经营数据
export const calculateBusinessStats = (
  money: number,
  reputation: number,
  customerCount: number,
  employees: Employee[],
  menu: MenuItem[],
  day: number
) => {
  const employeeSkills = calculateEmployeeAverageSkills(employees);
  const menuStats = calculateMenuStats(menu);

  return {
    // 收入相关
    totalRevenue: menuStats.totalRevenue,
    totalCost: menuStats.totalCost,
    totalProfit: menuStats.totalProfit,
    
    // 员工相关
    totalSalary: employees.reduce((sum, emp) => sum + emp.salary, 0),
    avgServiceSkill: employeeSkills.service,
    avgCookingSkill: employeeSkills.cooking,
    
    // 菜单相关
    menuItems: menuStats.totalItems,
    avgPopularity: menuStats.averagePopularity,
    
    // 经营效率
    revenuePerCustomer: customerCount > 0 ? Math.round(money / customerCount) : 0,
    customerSatisfaction: Math.round((reputation + 50) * 10) / 10,
    day,
  };
}; 