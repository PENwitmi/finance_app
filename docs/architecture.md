# アーキテクチャ設計書

## システム構成

### 全体アーキテクチャ
```
┌─────────────────────────────────────────────┐
│             ユーザーインターフェース          │
│                 (React + Tailwind)           │
├─────────────────────────────────────────────┤
│              アプリケーション層               │
│         (State Management + Business Logic)  │
├─────────────────────────────────────────────┤
│                データ永続化層                 │
│              (IndexedDB + JSON Export)       │
└─────────────────────────────────────────────┘
```

## レイヤー詳細

### 1. プレゼンテーション層
- **React Components**: UIコンポーネント群
- **Tailwind CSS**: スタイリング
- **責務**: ユーザー入力の受付と表示

### 2. アプリケーション層
- **State Management**: React Context API / useState
- **Business Logic**: 仕訳処理、バリデーション、計算ロジック
- **責務**: ビジネスルールの実装

### 3. データ層
- **IndexedDB**: ブラウザ内データベース
- **JSON Export/Import**: バックアップ・復元機能
- **責務**: データの永続化と取得

## コンポーネント構成

### コンポーネントツリー
```
App.jsx
├── Layout.jsx (レイアウト)
│   ├── Header.jsx (ヘッダー)
│   └── Navigation.jsx (ナビゲーション)
├── EntryForm.jsx (仕訳入力)
│   ├── DatePicker.jsx (日付選択)
│   ├── AccountSelect.jsx (勘定科目選択)
│   └── AmountInput.jsx (金額入力)
├── JournalList.jsx (仕訳一覧)
│   └── JournalItem.jsx (仕訳行)
└── Reports.jsx (レポート画面)
    ├── TrialBalance.jsx (試算表)
    └── GeneralLedger.jsx (総勘定元帳)
```

## データフロー

### 仕訳入力フロー
1. ユーザーが仕訳データを入力
2. バリデーション（借方=貸方チェック）
3. 仕訳データオブジェクト生成
4. IndexedDBへ保存
5. 状態更新とUI反映

### データ取得フロー
1. コンポーネントマウント時
2. IndexedDBからデータ取得
3. State更新
4. UIレンダリング

## 状態管理設計

### グローバル状態（Context）
```javascript
{
  journals: [],        // 仕訳データ配列
  accounts: [],        // 勘定科目マスタ
  currentPeriod: {},   // 現在の会計期間
  settings: {}         // アプリ設定
}
```

### ローカル状態（Component State）
- フォーム入力値
- バリデーションエラー
- UIの表示/非表示

## セキュリティ考慮事項
- データはローカルのみ保存（サーバー送信なし）
- XSS対策：React標準のエスケープ処理
- データ暗号化：必要に応じて実装可能

## パフォーマンス最適化
- React.memo によるコンポーネントメモ化
- useMemo/useCallback による再計算防止
- 仮想スクロール（大量データ時）

## 拡張性
- Phase2以降の機能追加を考慮した設計
- モジュール化による機能分離
- TypeScript移行を視野に入れた構造