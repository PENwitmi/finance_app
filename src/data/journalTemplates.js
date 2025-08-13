// よく使う仕訳パターンのテンプレート

export const journalTemplates = [
  {
    id: 'cash-sales',
    name: '現金売上',
    category: '売上関連',
    description: '商品やサービスを現金で販売した時',
    debitAccountId: '101', // 現金
    creditAccountId: '401', // 売上高
    defaultDescription: '売上（現金）'
  },
  {
    id: 'bank-sales',
    name: '振込売上',
    category: '売上関連',
    description: '売上代金が銀行口座に振り込まれた時',
    debitAccountId: '102', // 普通預金
    creditAccountId: '401', // 売上高
    defaultDescription: '売上（振込）'
  },
  {
    id: 'credit-sales',
    name: '掛け売上',
    category: '売上関連',
    description: '後日支払いの約束で販売した時',
    debitAccountId: '103', // 売掛金
    creditAccountId: '401', // 売上高
    defaultDescription: '売上（掛け）'
  },
  {
    id: 'purchase-cash',
    name: '現金仕入',
    category: '仕入関連',
    description: '商品を現金で仕入れた時',
    debitAccountId: '501', // 仕入高
    creditAccountId: '101', // 現金
    defaultDescription: '仕入（現金）'
  },
  {
    id: 'purchase-credit',
    name: '掛け仕入',
    category: '仕入関連',
    description: '後日支払いの約束で仕入れた時',
    debitAccountId: '501', // 仕入高
    creditAccountId: '201', // 買掛金
    defaultDescription: '仕入（掛け）'
  },
  {
    id: 'travel-expense',
    name: '交通費支払',
    category: '経費関連',
    description: '電車代やガソリン代などを支払った時',
    debitAccountId: '601', // 旅費交通費
    creditAccountId: '101', // 現金
    defaultDescription: '交通費'
  },
  {
    id: 'utility-expense',
    name: '水道光熱費支払',
    category: '経費関連',
    description: '電気・ガス・水道料金を支払った時',
    debitAccountId: '605', // 水道光熱費
    creditAccountId: '102', // 普通預金
    defaultDescription: '水道光熱費'
  },
  {
    id: 'rent-expense',
    name: '家賃支払',
    category: '経費関連',
    description: '事務所や店舗の家賃を支払った時',
    debitAccountId: '606', // 地代家賃
    creditAccountId: '102', // 普通預金
    defaultDescription: '家賃'
  },
  {
    id: 'supplies-expense',
    name: '消耗品購入',
    category: '経費関連',
    description: '事務用品などを購入した時',
    debitAccountId: '603', // 消耗品費
    creditAccountId: '101', // 現金
    defaultDescription: '消耗品'
  },
  {
    id: 'opening-capital',
    name: '開業資金（現金）',
    category: '資本取引',
    description: '事業開始時に現金を元入れした時',
    debitAccountId: '101', // 現金
    creditAccountId: '301', // 元入金
    defaultDescription: '開業資金（現金）'
  },
  {
    id: 'opening-bank',
    name: '開業資金（預金）',
    category: '資本取引',
    description: '事業開始時に預金を元入れした時',
    debitAccountId: '102', // 普通預金
    creditAccountId: '301', // 元入金
    defaultDescription: '開業資金（預金）'
  },
  {
    id: 'owner-withdrawal',
    name: '事業主貸（生活費）',
    category: '事業主取引',
    description: '事業資金から個人の生活費を引き出した時',
    debitAccountId: '104', // 事業主貸
    creditAccountId: '101', // 現金
    defaultDescription: '生活費引出'
  },
  {
    id: 'owner-investment',
    name: '事業主借（個人資金投入）',
    category: '事業主取引',
    description: '個人の資金を事業に投入した時',
    debitAccountId: '101', // 現金
    creditAccountId: '204', // 事業主借
    defaultDescription: '個人資金投入'
  },
  {
    id: 'collect-receivable',
    name: '売掛金回収',
    category: '債権債務',
    description: '売掛金が振り込まれた時',
    debitAccountId: '102', // 普通預金
    creditAccountId: '103', // 売掛金
    defaultDescription: '売掛金回収'
  },
  {
    id: 'pay-payable',
    name: '買掛金支払',
    category: '債権債務',
    description: '買掛金を支払った時',
    debitAccountId: '201', // 買掛金
    creditAccountId: '102', // 普通預金
    defaultDescription: '買掛金支払'
  },
  {
    id: 'cash-deposit',
    name: '現金預入',
    category: '資金移動',
    description: '現金を銀行に預け入れた時',
    debitAccountId: '102', // 普通預金
    creditAccountId: '101', // 現金
    defaultDescription: '現金預入'
  },
  {
    id: 'cash-withdrawal',
    name: '現金引出',
    category: '資金移動',
    description: '銀行から現金を引き出した時',
    debitAccountId: '101', // 現金
    creditAccountId: '102', // 普通預金
    defaultDescription: '現金引出'
  }
];

// カテゴリ別にグループ化したテンプレートを取得
export const getTemplatesByCategory = () => {
  return journalTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {});
};

// テンプレートIDから特定のテンプレートを取得
export const getTemplateById = (id) => {
  return journalTemplates.find(template => template.id === id);
};