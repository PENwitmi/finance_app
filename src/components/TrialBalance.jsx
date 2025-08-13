import React, { useMemo } from 'react';
import { formatAmount } from '../utils/validation';
import { getCategoryLabel } from '../data/accounts';

const TrialBalance = ({ journals, accounts }) => {
  const trialBalance = useMemo(() => {
    // 勘定科目ごとの残高を計算
    const balances = {};
    
    // 初期化
    accounts.forEach(account => {
      balances[account.id] = {
        account: account,
        debitBalance: 0,
        creditBalance: 0
      };
    });

    // 仕訳から残高を計算
    journals.forEach(journal => {
      if (journal.debit.accountId && balances[journal.debit.accountId]) {
        balances[journal.debit.accountId].debitBalance += journal.debit.amount;
      }
      if (journal.credit.accountId && balances[journal.credit.accountId]) {
        balances[journal.credit.accountId].creditBalance += journal.credit.amount;
      }
    });

    // 貸借を計算して整理
    const result = Object.values(balances).map(item => {
      const netDebit = item.debitBalance - item.creditBalance;
      const netCredit = item.creditBalance - item.debitBalance;
      
      return {
        ...item,
        netDebitBalance: netDebit > 0 ? netDebit : 0,
        netCreditBalance: netCredit > 0 ? netCredit : 0
      };
    }).filter(item => item.debitBalance > 0 || item.creditBalance > 0);

    // カテゴリ順、ソート順でソート
    result.sort((a, b) => {
      const categoryOrder = ['asset', 'liability', 'equity', 'revenue', 'expense'];
      const catDiff = categoryOrder.indexOf(a.account.category) - categoryOrder.indexOf(b.account.category);
      if (catDiff !== 0) return catDiff;
      return a.account.sortOrder - b.account.sortOrder;
    });

    return result;
  }, [journals, accounts]);

  // 合計計算
  const totals = useMemo(() => {
    return trialBalance.reduce((acc, item) => ({
      debit: acc.debit + item.netDebitBalance,
      credit: acc.credit + item.netCreditBalance
    }), { debit: 0, credit: 0 });
  }, [trialBalance]);

  if (journals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">試算表</h2>
        <div className="text-center py-12 text-gray-500">
          仕訳データがありません
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">試算表</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                勘定科目
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                カテゴリ
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                借方残高
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                貸方残高
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trialBalance.map(item => (
              <tr key={item.account.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {item.account.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {getCategoryLabel(item.account.category)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {item.netDebitBalance > 0 ? formatAmount(item.netDebitBalance) : ''}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {item.netCreditBalance > 0 ? formatAmount(item.netCreditBalance) : ''}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100">
            <tr>
              <td colSpan="2" className="px-4 py-3 text-sm font-semibold text-gray-900">
                合計
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                {formatAmount(totals.debit)}
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                {formatAmount(totals.credit)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      {totals.debit !== totals.credit && (
        <div className="px-6 py-3 bg-red-50 text-sm text-red-600">
          ⚠️ 貸借が一致していません（差額: {formatAmount(Math.abs(totals.debit - totals.credit))}円）
        </div>
      )}
    </div>
  );
};

export default TrialBalance;