// 支出専用テンプレート（すべて事業主借を使用）

export const expenseTemplates = [
  // 日常的な経費
  {
    id: 'transport-train',
    name: '電車・バス代',
    category: '交通費',
    expenseAccountId: '601', // 旅費交通費
    defaultDescription: '電車代',
    icon: '🚃'
  },
  {
    id: 'transport-taxi',
    name: 'タクシー代',
    category: '交通費',
    expenseAccountId: '601', // 旅費交通費
    defaultDescription: 'タクシー代',
    icon: '🚕'
  },
  {
    id: 'transport-parking',
    name: '駐車料金',
    category: '交通費',
    expenseAccountId: '616', // 車両費
    defaultDescription: '駐車場代',
    icon: '🅿️'
  },
  {
    id: 'transport-gas',
    name: 'ガソリン代',
    category: '交通費',
    expenseAccountId: '616', // 車両費
    defaultDescription: 'ガソリン代',
    icon: '⛽'
  },
  
  // 通信・IT関連
  {
    id: 'comm-mobile',
    name: '携帯電話代',
    category: '通信費',
    expenseAccountId: '602', // 通信費
    defaultDescription: '携帯電話代',
    icon: '📱'
  },
  {
    id: 'comm-internet',
    name: 'インターネット代',
    category: '通信費',
    expenseAccountId: '602', // 通信費
    defaultDescription: 'インターネット代',
    icon: '🌐'
  },
  {
    id: 'comm-software',
    name: 'ソフトウェア代',
    category: '通信費',
    expenseAccountId: '602', // 通信費
    defaultDescription: 'ソフトウェア利用料',
    icon: '💻'
  },
  
  // 事務用品・消耗品
  {
    id: 'supplies-office',
    name: '文房具',
    category: '消耗品',
    expenseAccountId: '604', // 事務用品費
    defaultDescription: '文房具',
    icon: '✏️'
  },
  {
    id: 'supplies-paper',
    name: 'コピー用紙',
    category: '消耗品',
    expenseAccountId: '604', // 事務用品費
    defaultDescription: 'コピー用紙',
    icon: '📄'
  },
  {
    id: 'supplies-printer',
    name: 'プリンターインク',
    category: '消耗品',
    expenseAccountId: '603', // 消耗品費
    defaultDescription: 'プリンターインク',
    icon: '🖨️'
  },
  
  // 会議・接待
  {
    id: 'meeting-cafe',
    name: 'カフェ打ち合わせ',
    category: '会議費',
    expenseAccountId: '606', // 会議費
    defaultDescription: '打ち合わせ（カフェ）',
    icon: '☕'
  },
  {
    id: 'meeting-lunch',
    name: 'ランチミーティング',
    category: '会議費',
    expenseAccountId: '606', // 会議費
    defaultDescription: 'ランチミーティング',
    icon: '🍱'
  },
  {
    id: 'entertainment-dinner',
    name: '接待交際費',
    category: '接待交際費',
    expenseAccountId: '605', // 接待交際費
    defaultDescription: '接待交際費',
    icon: '🍽️'
  },
  
  // 専門サービス
  {
    id: 'fee-accounting',
    name: '税理士報酬',
    category: '専門サービス',
    expenseAccountId: '609', // 支払報酬
    defaultDescription: '税理士報酬',
    icon: '📊'
  },
  {
    id: 'fee-legal',
    name: '弁護士報酬',
    category: '専門サービス',
    expenseAccountId: '609', // 支払報酬
    defaultDescription: '弁護士報酬',
    icon: '⚖️'
  },
  {
    id: 'fee-outsource',
    name: '外注費',
    category: '専門サービス',
    expenseAccountId: '610', // 外注費
    defaultDescription: '外注費',
    icon: '🤝'
  },
  
  // 広告・マーケティング
  {
    id: 'ad-online',
    name: 'Web広告費',
    category: '広告宣伝',
    expenseAccountId: '607', // 広告宣伝費
    defaultDescription: 'Web広告費',
    icon: '📱'
  },
  {
    id: 'ad-print',
    name: '印刷物・チラシ',
    category: '広告宣伝',
    expenseAccountId: '607', // 広告宣伝費
    defaultDescription: '印刷物制作費',
    icon: '📰'
  },
  
  // 固定費
  {
    id: 'rent-office',
    name: '事務所家賃',
    category: '固定費',
    expenseAccountId: '612', // 地代家賃
    defaultDescription: '事務所家賃',
    icon: '🏢'
  },
  {
    id: 'utility-electric',
    name: '電気代',
    category: '固定費',
    expenseAccountId: '611', // 水道光熱費
    defaultDescription: '電気代',
    icon: '💡'
  },
  {
    id: 'utility-water',
    name: '水道代',
    category: '固定費',
    expenseAccountId: '611', // 水道光熱費
    defaultDescription: '水道代',
    icon: '💧'
  },
  {
    id: 'insurance-business',
    name: '事業保険料',
    category: '固定費',
    expenseAccountId: '614', // 保険料
    defaultDescription: '事業保険料',
    icon: '🛡️'
  },
  
  // 学習・研修
  {
    id: 'training-seminar',
    name: 'セミナー参加費',
    category: '研修費',
    expenseAccountId: '617', // 研修費
    defaultDescription: 'セミナー参加費',
    icon: '👨‍🏫'
  },
  {
    id: 'training-book',
    name: '書籍代',
    category: '研修費',
    expenseAccountId: '618', // 新聞図書費
    defaultDescription: '書籍購入',
    icon: '📚'
  },
  {
    id: 'training-subscription',
    name: '定期購読料',
    category: '研修費',
    expenseAccountId: '618', // 新聞図書費
    defaultDescription: '定期購読料',
    icon: '📰'
  },
  
  // その他
  {
    id: 'fee-bank',
    name: '銀行手数料',
    category: 'その他',
    expenseAccountId: '608', // 支払手数料
    defaultDescription: '銀行振込手数料',
    icon: '🏦'
  },
  {
    id: 'tax-stamp',
    name: '収入印紙',
    category: 'その他',
    expenseAccountId: '613', // 租税公課
    defaultDescription: '収入印紙',
    icon: '📮'
  },
  {
    id: 'fee-membership',
    name: '会費・年会費',
    category: 'その他',
    expenseAccountId: '619', // 諸会費
    defaultDescription: '会費',
    icon: '🎫'
  },
  {
    id: 'misc-expense',
    name: 'その他経費',
    category: 'その他',
    expenseAccountId: '620', // 雑費
    defaultDescription: 'その他経費',
    icon: '📌'
  }
];

// カテゴリ別にグループ化
export function getExpenseTemplatesByCategory() {
  const grouped = {};
  expenseTemplates.forEach(template => {
    if (!grouped[template.category]) {
      grouped[template.category] = [];
    }
    grouped[template.category].push(template);
  });
  return grouped;
}

// IDでテンプレートを取得
export function getExpenseTemplateById(id) {
  return expenseTemplates.find(t => t.id === id);
}