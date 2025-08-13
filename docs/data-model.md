# データモデル設計書

## データスキーマ定義

### 1. 仕訳エントリ (Journal Entry)
```javascript
{
  id: string,              // UUID
  date: string,            // 日付 (YYYY-MM-DD)
  description: string,     // 摘要
  debit: {
    accountId: string,     // 借方勘定科目ID
    accountName: string,   // 借方勘定科目名（キャッシュ）
    amount: number         // 借方金額
  },
  credit: {
    accountId: string,     // 貸方勘定科目ID
    accountName: string,   // 貸方勘定科目名（キャッシュ）
    amount: number         // 貸方金額
  },
  createdAt: string,       // 作成日時 (ISO 8601)
  updatedAt: string,       // 更新日時 (ISO 8601)
  isDeleted: boolean       // 削除フラグ（論理削除）
}
```

### 2. 勘定科目マスタ (Account Master)
```javascript
{
  id: string,              // 科目コード (例: "101")
  name: string,            // 科目名 (例: "現金")
  category: string,        // カテゴリ (asset|liability|equity|revenue|expense)
  subCategory: string,     // サブカテゴリ (例: "流動資産")
  isActive: boolean,       // 有効フラグ
  sortOrder: number,       // 表示順
  createdAt: string,       // 作成日時
  updatedAt: string        // 更新日時
}
```

### 3. 会計期間 (Accounting Period)
```javascript
{
  id: string,              // UUID
  name: string,            // 期間名 (例: "2025年度")
  startDate: string,       // 開始日 (YYYY-MM-DD)
  endDate: string,         // 終了日 (YYYY-MM-DD)
  isCurrent: boolean,      // 現在の期間フラグ
  isLocked: boolean        // ロック済みフラグ
}
```

## IndexedDB構造

### データベース名: `bookkeeping_db`

### オブジェクトストア

#### 1. journals
- **キー**: `id`
- **インデックス**:
  - `date` (日付による検索)
  - `debit.accountId` (借方科目による検索)
  - `credit.accountId` (貸方科目による検索)
  - `createdAt` (作成日時による並び替え)

#### 2. accounts
- **キー**: `id`
- **インデックス**:
  - `category` (カテゴリによるフィルタ)
  - `name` (科目名による検索)
  - `sortOrder` (表示順)

#### 3. periods
- **キー**: `id`
- **インデックス**:
  - `isCurrent` (現在期間の取得)
  - `startDate` (期間による検索)

## 初期データ

### 勘定科目初期データ
```javascript
const initialAccounts = [
  // 資産
  { id: "101", name: "現金", category: "asset", subCategory: "流動資産", sortOrder: 1 },
  { id: "102", name: "普通預金", category: "asset", subCategory: "流動資産", sortOrder: 2 },
  { id: "103", name: "売掛金", category: "asset", subCategory: "流動資産", sortOrder: 3 },
  { id: "180", name: "開業費", category: "asset", subCategory: "繰延資産", sortOrder: 10 },
  
  // 負債
  { id: "201", name: "買掛金", category: "liability", subCategory: "流動負債", sortOrder: 20 },
  { id: "202", name: "未払金", category: "liability", subCategory: "流動負債", sortOrder: 21 },
  
  // 資本
  { id: "301", name: "元入金", category: "equity", subCategory: "資本金", sortOrder: 30 },
  
  // 収益
  { id: "401", name: "売上高", category: "revenue", subCategory: "売上", sortOrder: 40 },
  
  // 費用
  { id: "501", name: "仕入高", category: "expense", subCategory: "売上原価", sortOrder: 50 },
  { id: "601", name: "旅費交通費", category: "expense", subCategory: "販管費", sortOrder: 60 },
  { id: "602", name: "通信費", category: "expense", subCategory: "販管費", sortOrder: 61 },
  { id: "603", name: "消耗品費", category: "expense", subCategory: "販管費", sortOrder: 62 },
  { id: "604", name: "接待交際費", category: "expense", subCategory: "販管費", sortOrder: 63 },
  { id: "605", name: "水道光熱費", category: "expense", subCategory: "販管費", sortOrder: 64 },
  { id: "606", name: "地代家賃", category: "expense", subCategory: "販管費", sortOrder: 65 },
];
```

## データ操作API

### 仕訳操作
```javascript
// 作成
createJournal(journalData)
// 取得
getJournals(filter)
getJournalById(id)
// 更新
updateJournal(id, updateData)
// 削除（論理削除）
deleteJournal(id)
```

### 勘定科目操作
```javascript
// 取得
getAccounts()
getAccountsByCategory(category)
getAccountById(id)
// 作成
createAccount(accountData)
// 更新
updateAccount(id, updateData)
```

## バリデーションルール

### 仕訳入力
1. **日付**: 必須、有効な日付形式
2. **摘要**: 必須、最大100文字
3. **借方・貸方金額**: 必須、正の数値、一致必須
4. **勘定科目**: 必須、有効な科目ID

### 勘定科目
1. **科目コード**: 必須、一意、3-4桁の数字
2. **科目名**: 必須、最大20文字
3. **カテゴリ**: 必須、定義済みの値のみ

## JSON Export/Import形式

### Export形式
```json
{
  "version": "1.0",
  "exportDate": "2025-08-13T10:00:00Z",
  "data": {
    "journals": [...],
    "accounts": [...],
    "periods": [...]
  },
  "metadata": {
    "journalCount": 100,
    "accountCount": 15,
    "dateRange": {
      "from": "2025-01-01",
      "to": "2025-12-31"
    }
  }
}
```