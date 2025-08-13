import React, { useMemo, useState } from 'react';
import { formatAmount } from '../utils/validation';

const MonthlyExpenseReport = ({ entries, accounts }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const monthlyData = useMemo(() => {
    if (!entries || entries.length === 0) return null;

    // 経費科目のIDリスト
    const expenseAccountIds = accounts
      .filter(acc => acc.category === 'expense')
      .map(acc => acc.id);

    // 選択された年月の経費を抽出
    const monthlyExpenses = entries.filter(entry => {
      if (!expenseAccountIds.includes(entry.debit?.accountId)) return false;
      
      const entryDate = new Date(entry.date);
      return entryDate.getFullYear() === selectedYear && 
             entryDate.getMonth() + 1 === selectedMonth;
    });

    // カテゴリ別集計
    const categoryTotals = {};
    let monthTotal = 0;

    monthlyExpenses.forEach(entry => {
      const accountId = entry.debit?.accountId;
      const accountName = entry.debit?.accountName;
      const amount = entry.debit?.amount || 0;

      if (!categoryTotals[accountId]) {
        categoryTotals[accountId] = {
          id: accountId,
          name: accountName,
          amount: 0,
          entries: []
        };
      }
      categoryTotals[accountId].amount += amount;
      categoryTotals[accountId].entries.push(entry);
      monthTotal += amount;
    });

    // 過去6ヶ月のトレンド
    const trends = [];
    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(selectedYear, selectedMonth - 1 - i, 1);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;

      const monthExpenses = entries.filter(entry => {
        if (!expenseAccountIds.includes(entry.debit?.accountId)) return false;
        const entryDate = new Date(entry.date);
        return entryDate.getFullYear() === targetYear && 
               entryDate.getMonth() + 1 === targetMonth;
      });

      const monthSum = monthExpenses.reduce((sum, entry) => sum + (entry.debit?.amount || 0), 0);
      
      trends.push({
        year: targetYear,
        month: targetMonth,
        amount: monthSum,
        label: `${targetYear}/${targetMonth.toString().padStart(2, '0')}`
      });
    }

    return {
      total: monthTotal,
      categories: Object.values(categoryTotals).sort((a, b) => b.amount - a.amount),
      trends,
      entries: monthlyExpenses
    };
  }, [entries, accounts, selectedYear, selectedMonth]);

  // 年のリスト（過去3年分）
  const years = Array.from({ length: 3 }, (_, i) => currentYear - i);
  
  // 月のリスト
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  if (!monthlyData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">月別経費レポート</h2>
        <p className="text-gray-500">データがありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">月別経費レポート</h2>
        <div className="flex gap-2">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}年</option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            {months.map(month => (
              <option key={month} value={month}>{month}月</option>
            ))}
          </select>
        </div>
      </div>

      {/* 月間合計 */}
      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-600">
          {selectedYear}年{selectedMonth}月の経費合計
        </div>
        <div className="text-2xl font-bold text-green-600">
          ¥{formatAmount(monthlyData.total.toString())}
        </div>
      </div>

      {/* 6ヶ月トレンド */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">過去6ヶ月の推移</h3>
        <div className="flex items-end justify-between h-32 gap-2">
          {monthlyData.trends.map((trend, index) => {
            const maxAmount = Math.max(...monthlyData.trends.map(t => t.amount));
            const height = maxAmount > 0 ? (trend.amount / maxAmount * 100) : 0;
            const isCurrent = trend.year === selectedYear && trend.month === selectedMonth;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative" style={{ height: '100px' }}>
                  <div 
                    className={`absolute bottom-0 w-full rounded-t ${
                      isCurrent ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <div className="text-xs mt-1">{trend.label}</div>
                <div className="text-xs font-medium">
                  ¥{formatAmount(trend.amount.toString())}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* カテゴリ別内訳 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">カテゴリ別内訳</h3>
        {monthlyData.categories.length > 0 ? (
          <div className="space-y-2">
            {monthlyData.categories.map(category => {
              const percentage = monthlyData.total > 0 
                ? (category.amount / monthlyData.total * 100).toFixed(1) 
                : 0;
              
              return (
                <div key={category.id} className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm">
                      ¥{formatAmount(category.amount.toString())} ({percentage}%)
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {category.entries.length}件の取引
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">この月の経費データがありません</p>
        )}
      </div>
    </div>
  );
};

export default MonthlyExpenseReport;