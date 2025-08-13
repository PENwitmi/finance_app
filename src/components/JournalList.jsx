import React, { useState } from 'react';
import { formatAmount, formatDate } from '../utils/validation';

const JournalList = ({ journals, onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // ソート処理
  const sortedJournals = [...journals].sort((a, b) => {
    let compareValue = 0;
    
    switch(sortBy) {
      case 'date':
        compareValue = a.date.localeCompare(b.date);
        break;
      case 'amount':
        compareValue = a.debit.amount - b.debit.amount;
        break;
      default:
        compareValue = 0;
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('この仕訳を削除してもよろしいですか？')) {
      onDelete(id);
    }
  };

  if (journals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">仕訳帳</h2>
        <div className="text-center py-12 text-gray-500">
          仕訳データがありません
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">仕訳帳</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('date')}
              >
                日付 {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                摘要
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                借方科目
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                貸方科目
              </th>
              <th 
                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amount')}
              >
                金額 {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedJournals.map((journal, index) => (
              <tr key={journal.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatDate(journal.date)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {journal.description}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {journal.debit.accountName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {journal.credit.accountName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {formatAmount(journal.debit.amount)}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <button
                    onClick={() => onEdit(journal.id)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(journal.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600">
        合計 {journals.length} 件
      </div>
    </div>
  );
};

export default JournalList;