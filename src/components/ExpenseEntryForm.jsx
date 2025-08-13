import React, { useState } from 'react';
import { formatAmount, parseAmount } from '../utils/validation';
import { getExpenseTemplatesByCategory, getExpenseTemplateById } from '../data/expenseTemplates';

const ExpenseEntryForm = ({ accounts, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    expenseAccountId: '',
    amount: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  
  const templatesByCategory = getExpenseTemplatesByCategory();
  
  // 経費科目のみ抽出
  const expenseAccounts = accounts.filter(acc => acc.category === 'expense');

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleAmountChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    handleChange('amount', numericValue);
  };
  
  const handleTemplateSelect = (templateId) => {
    const template = getExpenseTemplateById(templateId);
    if (template) {
      setFormData(prev => ({
        ...prev,
        description: template.defaultDescription,
        expenseAccountId: template.expenseAccountId
      }));
      setShowTemplates(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // バリデーション
    const newErrors = {};
    if (!formData.date) newErrors.date = '日付を入力してください';
    if (!formData.description) newErrors.description = '摘要を入力してください';
    if (!formData.expenseAccountId) newErrors.expenseAccountId = '経費科目を選択してください';
    if (!formData.amount || parseAmount(formData.amount) <= 0) {
      newErrors.amount = '金額を入力してください';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 仕訳データを作成（支出は借方が経費、貸方が事業主借）
      const journalEntry = {
        date: formData.date,
        description: formData.description,
        debit: {
          accountId: formData.expenseAccountId,
          accountName: accounts.find(a => a.id === formData.expenseAccountId)?.name,
          amount: parseAmount(formData.amount)
        },
        credit: {
          accountId: '204', // 事業主借（固定）
          accountName: '事業主借',
          amount: parseAmount(formData.amount)
        }
      };

      const result = await onSubmit(journalEntry);
      
      if (result.success) {
        // フォームをリセット
        setFormData({
          date: new Date().toISOString().split('T')[0],
          description: '',
          expenseAccountId: '',
          amount: ''
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      expenseAccountId: '',
      amount: ''
    });
    setErrors({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">💸 支出入力</h2>
          <p className="text-sm text-gray-600 mt-1">個人のお金で経費を支払った時</p>
        </div>
        <button
          type="button"
          onClick={() => setShowTemplates(!showTemplates)}
          className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded"
        >
          {showTemplates ? '✕ 閉じる' : '📋 テンプレートから選択'}
        </button>
      </div>
      
      {/* テンプレート選択パネル */}
      {showTemplates && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-3">よく使う支出パターンを選択：</p>
          {Object.entries(templatesByCategory).map(([category, templates]) => (
            <div key={category} className="mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">{category}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {templates.map(template => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleTemplateSelect(template.id)}
                    className="text-left text-xs p-2 bg-white hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-lg">{template.icon}</span>
                      <span className="font-medium">{template.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 日付入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              日付
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* 金額入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              金額
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
              <input
                type="text"
                value={formData.amount ? formatAmount(formData.amount) : ''}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className={`w-full border rounded pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>
        </div>

        {/* 経費科目選択 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            経費科目
          </label>
          <select
            value={formData.expenseAccountId}
            onChange={(e) => handleChange('expenseAccountId', e.target.value)}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.expenseAccountId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">経費科目を選択してください</option>
            {expenseAccounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
          {errors.expenseAccountId && (
            <p className="text-red-500 text-sm mt-1">{errors.expenseAccountId}</p>
          )}
        </div>

        {/* 摘要入力 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            摘要（メモ）
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="例：〇〇駅→△△駅 電車代"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* 自動設定の説明 */}
        <div className="bg-blue-50 border border-blue-200 rounded p-3">
          <p className="text-sm text-blue-700">
            💡 貸方は自動的に「事業主借」に設定されます
          </p>
        </div>

        {/* ボタン */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium disabled:opacity-50"
          >
            {isSubmitting ? '登録中...' : '登録'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded font-medium"
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseEntryForm;