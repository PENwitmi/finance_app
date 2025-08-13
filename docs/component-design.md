# コンポーネント設計書

## コンポーネント一覧

### 1. App.jsx
**責務**: アプリケーション全体の管理
```jsx
// Props: なし
// State:
- currentView: 'entry' | 'journal' | 'reports' | 'settings'
- journals: Journal[]
- accounts: Account[]

// 機能:
- 初期データロード
- グローバル状態管理
- ルーティング制御
```

### 2. Layout.jsx
**責務**: 画面レイアウト管理
```jsx
// Props:
- children: ReactNode
- currentView: string
- onViewChange: (view: string) => void

// レイアウト:
┌─────────────────────────────┐
│         Header              │
├─────────────────────────────┤
│  Navigation Tabs            │
├─────────────────────────────┤
│                             │
│      {children}             │
│                             │
└─────────────────────────────┘
```

### 3. EntryForm.jsx
**責務**: 仕訳入力フォーム
```jsx
// Props:
- accounts: Account[]
- onSubmit: (journal: Journal) => void

// State:
- date: string
- description: string
- debitAccountId: string
- creditAccountId: string
- amount: number
- errors: ValidationErrors

// 機能:
- フォーム入力管理
- バリデーション
- 仕訳データ送信
```

**UIレイアウト**:
```
┌─────────────────────────────────────────┐
│ 日付: [____カレンダー____]              │
│                                         │
│ 摘要: [_____________________________]  │
│                                         │
│ 借方科目: [▼選択してください    ]       │
│ 金額: [______________] 円               │
│                                         │
│ 貸方科目: [▼選択してください    ]       │
│ 金額: [______________] 円 (自動)        │
│                                         │
│ [登録] [クリア]                         │
└─────────────────────────────────────────┘
```

### 4. AccountSelect.jsx
**責務**: 勘定科目選択ドロップダウン
```jsx
// Props:
- accounts: Account[]
- value: string
- onChange: (accountId: string) => void
- placeholder: string
- category?: string // フィルタ用

// 機能:
- カテゴリ別グループ表示
- 検索機能（オプション）
```

### 5. JournalList.jsx
**責務**: 仕訳一覧表示
```jsx
// Props:
- journals: Journal[]
- onEdit: (id: string) => void
- onDelete: (id: string) => void

// State:
- sortBy: 'date' | 'amount'
- sortOrder: 'asc' | 'desc'
- filter: FilterOptions

// 表示形式:
┌────┬──────────┬────────────┬──────────┬──────────┬────────┐
│ No │   日付   │    摘要    │ 借方科目 │ 貸方科目 │  金額  │
├────┼──────────┼────────────┼──────────┼──────────┼────────┤
│ 1  │ 2025/8/1 │ 開業資金   │ 普通預金 │ 元入金   │100,000 │
│ 2  │ 2025/8/2 │ 事務用品   │ 消耗品費 │ 現金     │  5,000 │
└────┴──────────┴────────────┴──────────┴──────────┴────────┘
```

### 6. Reports.jsx
**責務**: レポート画面管理
```jsx
// Props:
- journals: Journal[]
- accounts: Account[]

// State:
- reportType: 'trial' | 'balance' | 'income'
- period: DateRange

// 子コンポーネント:
- TrialBalance.jsx
- BalanceSheet.jsx
- IncomeStatement.jsx
```

### 7. TrialBalance.jsx
**責務**: 試算表表示
```jsx
// Props:
- journals: Journal[]
- accounts: Account[]
- period: DateRange

// 表示形式:
┌──────────────┬────────────┬────────────┐
│   勘定科目   │  借方残高  │  貸方残高  │
├──────────────┼────────────┼────────────┤
│ 現金         │    50,000  │         0  │
│ 普通預金     │   100,000  │         0  │
│ 売掛金       │    30,000  │         0  │
│ 買掛金       │         0  │    20,000  │
│ 元入金       │         0  │   100,000  │
│ 売上高       │         0  │    80,000  │
│ 仕入高       │    20,000  │         0  │
├──────────────┼────────────┼────────────┤
│ 合計         │   200,000  │   200,000  │
└──────────────┴────────────┴────────────┘
```

## コンポーネント間の通信

### データフロー
```
App.jsx (State管理)
    ↓ accounts, journals
EntryForm.jsx
    ↓ onSubmit(journal)
App.jsx
    ↓ 更新されたjournals
JournalList.jsx / Reports.jsx
```

### イベントフロー
```
ユーザー入力 → EntryForm
    ↓ バリデーション
    ↓ onSubmit
App.jsx → IndexedDB保存
    ↓ State更新
全コンポーネント再レンダリング
```

## スタイリング方針

### Tailwind CSSクラス設計
```jsx
// ボタン
const buttonClasses = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded",
  secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded",
  danger: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
};

// フォーム入力
const inputClasses = "border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

// カード
const cardClasses = "bg-white rounded-lg shadow-md p-6";
```

## エラーハンドリング

### フォームバリデーション
```jsx
const validationRules = {
  date: {
    required: true,
    pattern: /^\d{4}-\d{2}-\d{2}$/
  },
  description: {
    required: true,
    maxLength: 100
  },
  amount: {
    required: true,
    min: 1,
    max: 999999999
  }
};
```

### エラー表示
```jsx
// エラーメッセージコンポーネント
<ErrorMessage 
  show={errors.amount} 
  message="金額は必須です" 
/>
```

## レスポンシブ対応

### ブレークポイント
- **モバイル**: < 640px
- **タブレット**: 640px - 1024px
- **デスクトップ**: > 1024px

### レスポンシブクラス例
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* コンテンツ */}
</div>
```

## パフォーマンス最適化

### メモ化戦略
```jsx
// 重い計算のメモ化
const trialBalance = useMemo(
  () => calculateTrialBalance(journals, accounts),
  [journals, accounts]
);

// コンポーネントのメモ化
const JournalItem = React.memo(({ journal }) => {
  // レンダリング
});
```

### 遅延ローディング
```jsx
const Reports = React.lazy(() => import('./Reports'));
```