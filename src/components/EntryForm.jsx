import React, { useState } from 'react';
import AccountSelect from './AccountSelect';
import { validateJournalEntry, formatAmount, parseAmount } from '../utils/validation';
import { getTemplatesByCategory, getTemplateById } from '../data/journalTemplates';

const EntryForm = ({ accounts, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    debitAccountId: '',
    creditAccountId: '',
    amount: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  
  const templatesByCategory = getTemplatesByCategory();

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
    // 数値以外を除去
    const numericValue = value.replace(/[^0-9]/g, '');
    handleChange('amount', numericValue);
  };
  
  const handleTemplateSelect = (templateId) => {
    const template = getTemplateById(templateId);
    if (template) {
      setFormData(prev => ({
        ...prev,
        description: template.defaultDescription,
        debitAccountId: template.debitAccountId,
        creditAccountId: template.creditAccountId
      }));
      setShowTemplates(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // バリデーション
    const validation = validateJournalEntry({
      ...formData,
      amount: parseAmount(formData.amount)
    });
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 仕訳データを作成
      const journalEntry = {
        date: formData.date,
        description: formData.description,
        debit: {
          accountId: formData.debitAccountId,
          accountName: accounts.find(a => a.id === formData.debitAccountId)?.name,
          amount: parseAmount(formData.amount)
        },
        credit: {
          accountId: formData.creditAccountId,
          accountName: accounts.find(a => a.id === formData.creditAccountId)?.name,
          amount: parseAmount(formData.amount)
        }
      };

      const result = await onSubmit(journalEntry);
      
      if (result.success) {
        // フォームをリセット
        setFormData({
          date: new Date().toISOString().split('T')[0],
          description: '',
          debitAccountId: '',
          creditAccountId: '',
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
      debitAccountId: '',
      creditAccountId: '',
      amount: ''
    });
    setErrors({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">仕訳入力</h2>
        <button
          type="button"
          onClick={() => setShowTemplates(!showTemplates)}
          className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
        >
          {showTemplates ? '✕ 閉じる' : '📋 テンプレートから選択'}
        </button>
      </div>
      
      {/* テンプレート選択パネル */}
      {showTemplates && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-3">よく使う仕訳パターンを選択してください：</p>
          {Object.entries(templatesByCategory).map(([category, templates]) => (
            <div key={category} className="mb-3">
              <h4 className="text-xs font-semibold text-gray-700 mb-1">{category}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {templates.map(template => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleTemplateSelect(template.id)}
                    className="text-left text-xs p-2 bg-white hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300"
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-gray-500">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* 摘要入力 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            摘要
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="取引内容を入力"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* 借方・貸方入力 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 借方 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                借方科目
              </label>
              <AccountSelect
                accounts={accounts}
                value={formData.debitAccountId}
                onChange={(value) => handleChange('debitAccountId', value)}
                placeholder="借方科目を選択"
                position="debit"
                excludeAccountId={formData.creditAccountId}
              />
              {errors.debitAccountId && (
                <p className="text-red-500 text-sm mt-1">{errors.debitAccountId}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                金額
              </label>
              <input
                type="text"
                value={formData.amount ? formatAmount(formData.amount) : ''}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>
          </div>

          {/* 貸方 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                貸方科目
              </label>
              <AccountSelect
                accounts={accounts}
                value={formData.creditAccountId}
                onChange={(value) => handleChange('creditAccountId', value)}
                placeholder="貸方科目を選択"
                position="credit"
                excludeAccountId={formData.debitAccountId}
              />
              {errors.creditAccountId && (
                <p className="text-red-500 text-sm mt-1">{errors.creditAccountId}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                金額（自動）
              </label>
              <input
                type="text"
                value={formData.amount ? formatAmount(formData.amount) : ''}
                disabled
                className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* エラーメッセージ */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {errors.general}
          </div>
        )}

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

export default EntryForm;