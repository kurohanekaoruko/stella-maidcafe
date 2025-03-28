import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Game } from './components/Game';
import { Toast } from './components/Toast';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/employees" element={<div>员工管理</div>} />
            <Route path="/menu" element={<div>菜单管理</div>} />
            <Route path="/settings" element={<div>设置</div>} />
          </Routes>
        </main>
        <Toast />
      </div>
    </Router>
  );
}

export default App; 