# 起動・デプロイ方法ガイド

## 🟢 方法1: ワンクリック起動（推奨）

### Macでの使い方
1. Finderで `bookkeeping-app` フォルダを開く
2. **`start.command`** をダブルクリック
3. 自動的にブラウザが開きます
4. 終了時はターミナルで `Control + C`

---

## 🔵 方法2: 開発モード

### コマンドで起動
```bash
cd "/Users/nishimototakashi/claude code/finance/bookkeeping-app"
npm run dev
```
- メリット：コード変更が即座に反映される
- デメリット：毎回コマンド実行が必要

---

## 🟡 方法3: GitHub Pagesでホスティング

### セットアップ手順

1. **GitHubリポジトリ作成**
```bash
cd "/Users/nishimototakashi/claude code/finance/bookkeeping-app"
git init
git add .
git commit -m "Initial commit"
gh repo create bookkeeping-app --public --source=. --remote=origin --push
```

2. **GitHub Pages用の設定追加**
vite.config.jsを編集：
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/bookkeeping-app/',  // この行を追加
  // ...
})
```

3. **デプロイスクリプト追加**
package.jsonに追加：
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

4. **デプロイ実行**
```bash
npm install --save-dev gh-pages
npm run deploy
```

5. **アクセス**
```
https://[GitHubユーザー名].github.io/bookkeeping-app/
```

### GitHub Pagesのメリット
- 無料でホスティング
- どこからでもアクセス可能
- 他の人と共有できる
- スマホからも利用可能

---

## 🟣 方法4: Vercelでホスティング（最も簡単）

### 手順
1. [Vercel](https://vercel.com)にアクセス
2. GitHubでログイン
3. リポジトリをインポート
4. 自動的にデプロイ完了

### Vercelのメリット
- 設定不要で自動デプロイ
- 高速なCDN配信
- プレビュー環境も自動生成
- カスタムドメイン対応

---

## 📱 モバイル対応について

このアプリはレスポンシブ対応済みなので：
- スマートフォンでも利用可能
- タブレットでも快適に操作
- GitHub PagesかVercelでホスティングすれば、どのデバイスからでもアクセス可能

---

## 💾 データの保管場所

- **ローカル起動時**: ブラウザのIndexedDBに保存
- **GitHub Pages/Vercel**: 各デバイスのブラウザに個別保存
- **バックアップ**: JSONエクスポート機能で定期的に保存推奨