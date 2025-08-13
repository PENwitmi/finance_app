import React from 'react';
import { getCategoryLabel } from '../data/accounts';

const AccountSelect = ({ 
  accounts = [], 
  value, 
  onChange, 
  placeholder = '科目を選択', 
  category = null,
  position = null, // 'debit' or 'credit'
  excludeAccountId = null // 除外する科目ID
}) => {
  // accountsが配列でない場合の対策
  const safeAccounts = Array.isArray(accounts) ? accounts : [];
  
  // position（借方・貸方）に基づくフィルタリング
  let positionFilteredAccounts = safeAccounts;
  
  if (position === 'debit') {
    // 借方の場合：事業主借（204）を除外
    positionFilteredAccounts = safeAccounts.filter(acc => acc.id !== '204');
  } else if (position === 'credit') {
    // 貸方の場合：事業主貸（104）を除外
    positionFilteredAccounts = safeAccounts.filter(acc => acc.id !== '104');
  }
  
  // 選択済み科目の除外
  if (excludeAccountId) {
    positionFilteredAccounts = positionFilteredAccounts.filter(acc => acc.id !== excludeAccountId);
  }
  
  // カテゴリでフィルタリング
  const filteredAccounts = category 
    ? positionFilteredAccounts.filter(acc => acc.category === category)
    : positionFilteredAccounts;

  // カテゴリ別にグループ化
  const groupedAccounts = filteredAccounts.reduce((groups, account) => {
    const cat = account.category;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(account);
    return groups;
  }, {});


  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">{placeholder}</option>
      {Object.entries(groupedAccounts).map(([category, accounts]) => (
        <optgroup key={category} label={getCategoryLabel(category)}>
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default AccountSelect;