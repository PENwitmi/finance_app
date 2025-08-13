import React, { useMemo } from 'react';
import { formatAmount } from '../utils/validation';

const ExpenseSummary = ({ entries, accounts }) => {
  const expenseData = useMemo(() => {
    if (!entries || entries.length === 0) return { total: 0, byCategory: [], recentExpenses: [] };

    // 経費科目のIDリスト（501以降）
    const expenseAccountIds = accounts
      .filter(acc => acc.category === 'expense')
      .map(acc => acc.id);

    // 経費仕訳を抽出（借方が経費科目）
    const expenseEntries = entries.filter(entry =>
      expenseAccountIds.includes(entry.debit?.accountId)
    );

    // 合計額計算
    const total = expenseEntries.reduce((sum, entry) => sum + (entry.debit?.amount || 0), 0);

    // カテゴリ別集計
    const categoryMap = {};
    expenseEntries.forEach(entry => {
      const accountId = entry.debit?.accountId;
      const accountName = entry.debit?.accountName;
      const amount = entry.debit?.amount || 0;

      if (!categoryMap[accountId]) {
        categoryMap[accountId] = {
          id: accountId,
          name: accountName,
          amount: 0,
          count: 0
        };
      }
      categoryMap[accountId].amount += amount;
      categoryMap[accountId].count += 1;
    });

    // カテゴリ別データを配列に変換してソート
    const byCategory = Object.values(categoryMap)
      .sort((a, b) => b.amount - a.amount);

    // 最新の経費5件
    const recentExpenses = expenseEntries
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    return { total, byCategory, recentExpenses };
  }, [entries, accounts]);

  const { total, byCategory, recentExpenses } = expenseData;

  // 上位5カテゴリを取得
  const topCategories = byCategory.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">経費サマリー</h2>

      {/* 合計額 */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-600">経費合計</div>
        <div className="text-2xl font-bold text-blue-600">
          ¥{formatAmount(total.toString())}
        </div>
      </div>

      {/* カテゴリ別上位5件 */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">主要経費カテゴリ</h3>
        {topCategories.length > 0 ? (
          <div className="space-y-2">
            {topCategories.map(category => {
              const percentage = total > 0 ? (category.amount / total * 100).toFixed(1) : 0;
              return (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-gray-600">
                        ¥{formatAmount(category.amount.toString())} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{category.count}件</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">まだ経費データがありません</p>
        )}
      </div>

      {/* 最新の経費 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">最新の経費</h3>
        {recentExpenses.length > 0 ? (
          <div className="space-y-2">
            {recentExpenses.map(entry => (
              <div key={entry.id} className="flex justify-between items-center text-sm">
                <div className="flex-1">
                  <span className="text-gray-600">{entry.date}</span>
                  <span className="mx-2">•</span>
                  <span className="font-medium">{entry.debit?.accountName}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">¥{formatAmount(entry.debit?.amount?.toString() || '0')}</div>
                  <div className="text-xs text-gray-500">{entry.description}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">まだ経費データがありません</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseSummary;