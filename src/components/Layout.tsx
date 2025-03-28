import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const navItems = [
    { path: '/', label: '仪表盘' },
    { path: '/employees', label: '员工管理' },
    { path: '/menu', label: '菜单管理' },
    { path: '/stats', label: '经营数据' },
  ];

  return (
    <div className="min-h-screen bg-pink-100">
      {/* 侧边栏 */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-pink-800">Stella</h1>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-pink-50 ${
                pathname === item.path ? 'bg-pink-50 text-pink-800' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* 主内容区 */}
      <div className="ml-64">
        {children}
      </div>
    </div>
  );
}; 