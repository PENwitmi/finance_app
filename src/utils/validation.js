export const validateJournalEntry = (data) => {
  const errors = {};

  // 日付の検証
  if (!data.date) {
    errors.date = '日付は必須です';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.date = '正しい日付形式で入力してください';
  }

  // 摘要の検証
  if (!data.description) {
    errors.description = '摘要は必須です';
  } else if (data.description.length > 100) {
    errors.description = '摘要は100文字以内で入力してください';
  }

  // 借方科目の検証
  if (!data.debitAccountId) {
    errors.debitAccountId = '借方科目を選択してください';
  }

  // 貸方科目の検証
  if (!data.creditAccountId) {
    errors.creditAccountId = '貸方科目を選択してください';
  }

  // 金額の検証
  if (!data.amount || data.amount <= 0) {
    errors.amount = '金額は1円以上で入力してください';
  } else if (data.amount > 999999999) {
    errors.amount = '金額が大きすぎます';
  }

  // 借方と貸方が同じ科目でないか
  if (data.debitAccountId === data.creditAccountId && data.debitAccountId) {
    errors.general = '借方と貸方に同じ科目を指定することはできません';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatAmount = (amount) => {
  if (!amount) return '0';
  return new Intl.NumberFormat('ja-JP').format(amount);
};

export const parseAmount = (str) => {
  if (!str) return 0;
  return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
};