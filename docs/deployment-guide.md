# 起動・デプロイ方法ガイド

## 🟢 方法1: ワンクリック起動（macOS/Linux）

### 自動セットアップ機能付き
1. `finance_app` フォルダを開く
2. **`start.command`** をダブルクリック
3. 初回は自動的に以下を実行：
   - Node.jsの確認
   - 依存パッケージのインストール（npm install）
   - 開発サーバーの起動
4. ブラウザが自動的に開きます
5. 終了時はターミナルで `Control + C`

**特徴**：
- ✅ 初回セットアップ自動化
- ✅ 最新のコードが常に反映される
- ✅ ホットリロード対応

---

## 🔵 方法2: 手動起動（全OS対応）

### Windows / 手動実行の場合
```bash
# プロジェクトフォルダに移動
cd finance_app

# 初回のみ：依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```
- ブラウザで http://localhost:3000 を開く
- メリット：どのOSでも同じ方法で起動可能
- デメリット：毎回コマンド実行が必要

---

## 🟡 方法3: GitHub Pagesでホスティング

### セットアップ手順

1. **リポジトリの準備**
```bash
# すでにGitHubにプッシュ済みの場合はスキップ
git remote -v  # リモートリポジトリを確認
```

2. **GitHub Pages用の設定追加**
vite.config.jsを編集：
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/finance_app/',  // リポジトリ名に合わせて設定
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
https://[GitHubユーザー名].github.io/finance_app/
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