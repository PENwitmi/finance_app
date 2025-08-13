import React from 'react';

const Layout = ({ children, currentView, onViewChange }) => {
  const tabs = [
    { id: 'entry', label: '仕訳入力', icon: '📝' },
    { id: 'journal', label: '仕訳帳', icon: '📚' },
    { id: 'expenses', label: '経費管理', icon: '💰' },
    { id: 'reports', label: 'レポート', icon: '📊' },
    { id: 'settings', label: '設定', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-800">
              複式帳簿管理システム
            </h1>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('ja-JP')}
            </div>
          </div>
        </div>
      </header>

      {/* ナビゲーションタブ */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onViewChange(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${currentView === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;