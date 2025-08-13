import React, { useState } from 'react';
import ExpenseEntryForm from './ExpenseEntryForm';
import IncomeEntryForm from './IncomeEntryForm';
import EntryForm from './EntryForm';

const EntryModeSelector = ({ accounts, onSubmit }) => {
  const [mode, setMode] = useState('expense'); // デフォルトは支出モード

  const modes = [
    { 
      id: 'expense', 
      label: '支出', 
      icon: '💸', 
      color: 'blue',
      description: '経費を個人のお金で払った'
    },
    { 
      id: 'income', 
      label: '収入', 
      icon: '💰', 
      color: 'green',
      description: '売上を個人口座で受け取った'
    },
    { 
      id: 'detailed', 
      label: '詳細', 
      icon: '📊', 
      color: 'gray',
      description: '借方・貸方を自由に選択'
    }
  ];

  const getButtonStyles = (modeId, color) => {
    const baseStyles = "flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex flex-col items-center gap-1";
    
    if (mode === modeId) {
      const colorStyles = {
        blue: 'bg-blue-500 text-white shadow-lg',
        green: 'bg-green-500 text-white shadow-lg',
        gray: 'bg-gray-600 text-white shadow-lg'
      };
      return `${baseStyles} ${colorStyles[color]}`;
    } else {
      const colorStyles = {
        blue: 'bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50',
        green: 'bg-white text-green-600 border-2 border-green-200 hover:bg-green-50',
        gray: 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50'
      };
      return `${baseStyles} ${colorStyles[color]}`;
    }
  };

  return (
    <div>
      {/* モード選択ボタン */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex gap-3">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={getButtonStyles(m.id, m.color)}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{m.icon}</span>
                <span className="text-lg font-semibold">{m.label}</span>
              </div>
              <span className="text-xs opacity-80">{m.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 選択されたモードのフォーム */}
      <div className="transition-all duration-300">
        {mode === 'expense' && (
          <ExpenseEntryForm accounts={accounts} onSubmit={onSubmit} />
        )}
        {mode === 'income' && (
          <IncomeEntryForm accounts={accounts} onSubmit={onSubmit} />
        )}
        {mode === 'detailed' && (
          <EntryForm accounts={accounts} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
};

export default EntryModeSelector;