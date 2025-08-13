// 収入専用テンプレート（すべて事業主貸を使用）

export const incomeTemplates = [
  // 売上関連
  {
    id: 'sales-service',
    name: 'サービス提供',
    category: '売上',
    incomeAccountId: '401', // 売上高
    defaultDescription: 'サービス提供売上',
    icon: '💼'
  },
  {
    id: 'sales-product',
    name: '商品販売',
    category: '売上',
    incomeAccountId: '401', // 売上高
    defaultDescription: '商品販売売上',
    icon: '📦'
  },
  {
    id: 'sales-consulting',
    name: 'コンサルティング',
    category: '売上',
    incomeAccountId: '401', // 売上高
    defaultDescription: 'コンサルティング料',
    icon: '👔'
  },
  {
    id: 'sales-teaching',
    name: '講師料・指導料',
    category: '売上',
    incomeAccountId: '401', // 売上高
    defaultDescription: '講師料',
    icon: '👨‍🏫'
  },
  {
    id: 'sales-writing',
    name: '原稿料・執筆料',
    category: '売上',
    incomeAccountId: '401', // 売上高
    defaultDescription: '原稿執筆料',
    icon: '✍️'
  },
  {
    id: 'sales-design',
    name: 'デザイン制作',
    category: '売上',
    incomeAccountId: '401', // 売上高
    defaultDescription: 'デザイン制作料',
    icon: '🎨'
  },
  {
    id: 'sales-programming',
    name: 'プログラミング',
    category: '売上',
    incomeAccountId: '401', // 売上高
    defaultDescription: '開発案件売上',
    icon: '💻'
  },
  {
    id: 'sales-monthly',
    name: '月額サービス',
    category: '売上',
    incomeAccountId: '401', // 売上高
    defaultDescription: '月額サービス料',
    icon: '📅'
  },
  {
    id: 'sales-commission',
    name: '紹介手数料',
    category: '売上',
    incomeAccountId: '401', // 売上高
    defaultDescription: '紹介手数料',
    icon: '🤝'
  },
  {
    id: 'sales-royalty',
    name: 'ロイヤリティ',
    category: '売上',
    incomeAccountId: '401', // 売上高
    defaultDescription: 'ロイヤリティ収入',
    icon: '👑'
  },
  
  // 雑収入関連
  {
    id: 'misc-interest',
    name: '利息収入',
    category: '雑収入',
    incomeAccountId: '402', // 雑収入
    defaultDescription: '預金利息',
    icon: '🏦'
  },
  {
    id: 'misc-refund',
    name: '還付金・返金',
    category: '雑収入',
    incomeAccountId: '402', // 雑収入
    defaultDescription: '還付金',
    icon: '💰'
  },
  {
    id: 'misc-grant',
    name: '補助金・助成金',
    category: '雑収入',
    incomeAccountId: '402', // 雑収入
    defaultDescription: '補助金',
    icon: '🏛️'
  },
  {
    id: 'misc-reward',
    name: '報奨金・賞金',
    category: '雑収入',
    incomeAccountId: '402', // 雑収入
    defaultDescription: '報奨金',
    icon: '🏆'
  },
  {
    id: 'misc-other',
    name: 'その他収入',
    category: '雑収入',
    incomeAccountId: '402', // 雑収入
    defaultDescription: 'その他収入',
    icon: '📝'
  }
];

// カテゴリ別にグループ化
export function getIncomeTemplatesByCategory() {
  const grouped = {};
  incomeTemplates.forEach(template => {
    if (!grouped[template.category]) {
      grouped[template.category] = [];
    }
    grouped[template.category].push(template);
  });
  return grouped;
}

// IDでテンプレートを取得
export function getIncomeTemplateById(id) {
  return incomeTemplates.find(t => t.id === id);
}