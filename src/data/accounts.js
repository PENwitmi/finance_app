export const initialAccounts = [
  // 資産（よく使う順）
  { id: "101", name: "現金", category: "asset", subCategory: "流動資産", sortOrder: 1, isActive: true },
  { id: "102", name: "普通預金", category: "asset", subCategory: "流動資産", sortOrder: 2, isActive: true },
  { id: "103", name: "クレジットカード", category: "asset", subCategory: "流動資産", sortOrder: 3, isActive: true },
  { id: "104", name: "電子マネー", category: "asset", subCategory: "流動資産", sortOrder: 4, isActive: true },
  { id: "105", name: "売掛金", category: "asset", subCategory: "流動資産", sortOrder: 5, isActive: true },
  { id: "106", name: "事業主貸", category: "asset", subCategory: "流動資産", sortOrder: 6, isActive: true },
  
  // 負債
  { id: "201", name: "買掛金", category: "liability", subCategory: "流動負債", sortOrder: 20, isActive: true },
  { id: "202", name: "未払金", category: "liability", subCategory: "流動負債", sortOrder: 21, isActive: true },
  { id: "203", name: "クレジット未払金", category: "liability", subCategory: "流動負債", sortOrder: 22, isActive: true },
  { id: "204", name: "事業主借", category: "liability", subCategory: "流動負債", sortOrder: 23, isActive: true },
  
  // 資本
  { id: "301", name: "元入金", category: "equity", subCategory: "資本金", sortOrder: 30, isActive: true },
  
  // 収益（シンプルに）
  { id: "401", name: "売上高", category: "revenue", subCategory: "売上", sortOrder: 40, isActive: true },
  { id: "402", name: "雑収入", category: "revenue", subCategory: "その他収益", sortOrder: 41, isActive: true },
  
  // 費用（経費管理重視・詳細化）
  { id: "501", name: "仕入高", category: "expense", subCategory: "売上原価", sortOrder: 50, isActive: true },
  
  // 販管費（経費として重要な項目を充実）
  { id: "601", name: "旅費交通費", category: "expense", subCategory: "販管費", sortOrder: 60, isActive: true },
  { id: "602", name: "通信費", category: "expense", subCategory: "販管費", sortOrder: 61, isActive: true },
  { id: "603", name: "消耗品費", category: "expense", subCategory: "販管費", sortOrder: 62, isActive: true },
  { id: "604", name: "事務用品費", category: "expense", subCategory: "販管費", sortOrder: 63, isActive: true },
  { id: "605", name: "接待交際費", category: "expense", subCategory: "販管費", sortOrder: 64, isActive: true },
  { id: "606", name: "会議費", category: "expense", subCategory: "販管費", sortOrder: 65, isActive: true },
  { id: "607", name: "広告宣伝費", category: "expense", subCategory: "販管費", sortOrder: 66, isActive: true },
  { id: "608", name: "支払手数料", category: "expense", subCategory: "販管費", sortOrder: 67, isActive: true },
  { id: "609", name: "支払報酬", category: "expense", subCategory: "販管費", sortOrder: 68, isActive: true },
  { id: "610", name: "外注費", category: "expense", subCategory: "販管費", sortOrder: 69, isActive: true },
  { id: "611", name: "水道光熱費", category: "expense", subCategory: "販管費", sortOrder: 70, isActive: true },
  { id: "612", name: "地代家賃", category: "expense", subCategory: "販管費", sortOrder: 71, isActive: true },
  { id: "613", name: "租税公課", category: "expense", subCategory: "販管費", sortOrder: 72, isActive: true },
  { id: "614", name: "保険料", category: "expense", subCategory: "販管費", sortOrder: 73, isActive: true },
  { id: "615", name: "修繕費", category: "expense", subCategory: "販管費", sortOrder: 74, isActive: true },
  { id: "616", name: "車両費", category: "expense", subCategory: "販管費", sortOrder: 75, isActive: true },
  { id: "617", name: "研修費", category: "expense", subCategory: "販管費", sortOrder: 76, isActive: true },
  { id: "618", name: "新聞図書費", category: "expense", subCategory: "販管費", sortOrder: 77, isActive: true },
  { id: "619", name: "諸会費", category: "expense", subCategory: "販管費", sortOrder: 78, isActive: true },
  { id: "620", name: "雑費", category: "expense", subCategory: "販管費", sortOrder: 79, isActive: true },
];

export const accountCategories = {
  asset: "資産",
  liability: "負債",
  equity: "資本",
  revenue: "収益",
  expense: "費用"
};

export const getCategoryLabel = (category) => {
  return accountCategories[category] || category;
};