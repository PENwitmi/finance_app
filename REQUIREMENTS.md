# 🖥️ システム要件

## 🪟 Windows

### 必要なソフトウェア
| ソフトウェア | バージョン | インストール方法 |
|-------------|----------|---------------|
| **Node.js** | v16以上（推奨v18 LTS） | [公式サイト](https://nodejs.org/)からインストーラーをダウンロード |
| **Git** | 最新版 | [Git for Windows](https://git-scm.com/download/win)をダウンロード |

### 推奨ブラウザ
- Chrome（推奨）またはEdge

### セットアップ手順
```powershell
# 1. Node.jsをインストール後、確認
node --version
npm --version

# 2. プロジェクトをクローン
git clone https://github.com/PENwitmi/finance_app.git
cd finance_app

# 3. 依存関係をインストール
npm install

# 4. 起動
npm run dev
```

### Windows固有の注意点
- PowerShell管理者権限が必要な場合があります
- Windows Defenderがnpm installを遅くする場合があります
- 改行コードはCRLFではなくLFを使用

---

## 🍎 macOS

### 必要なソフトウェア
| ソフトウェア | バージョン | インストール方法 |
|-------------|----------|---------------|
| **Node.js** | v16以上（推奨v18 LTS） | Homebrew: `brew install node` |
| **Git** | 最新版 | macOS標準搭載（Xcodeツール） |

### 推奨ブラウザ
- Safari（標準）またはChrome

### セットアップ手順
```bash
# 1. Homebrewがない場合はインストール
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Node.jsをインストール
brew install node

# 3. プロジェクトをクローン
git clone https://github.com/PENwitmi/finance_app.git
cd finance_app

# 4. 依存関係をインストール
npm install

# 5. 起動（2つの方法）
# 方法A: start.commandをダブルクリック
./start.command

# 方法B: ターミナルから
npm run dev
```

### macOS固有の機能
- ✅ `start.command`でワンクリック起動可能
- ✅ Finderからダブルクリックで実行

---

## 🐧 Linux (Ubuntu/Debian系)

### 必要なソフトウェア
| ソフトウェア | バージョン | インストール方法 |
|-------------|----------|---------------|
| **Node.js** | v16以上（推奨v18 LTS） | NodeSourceリポジトリ経由 |
| **Git** | 最新版 | `apt install git` |
| **build-essential** | - | `apt install build-essential` |

### 推奨ブラウザ
- Chrome または Firefox

### セットアップ手順
```bash
# 1. システムを更新
sudo apt update && sudo apt upgrade -y

# 2. 必要なパッケージをインストール
sudo apt install -y curl git build-essential

# 3. Node.js 18.xをインストール
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. プロジェクトをクローン
git clone https://github.com/PENwitmi/finance_app.git
cd finance_app

# 5. 依存関係をインストール
npm install

# 6. 起動
npm run dev
```

### Linux固有の注意点
- ポート3000の権限に注意
- ファイアウォール設定を確認

---

## 🐧 Linux (RedHat/CentOS/Fedora系)

### セットアップ手順
```bash
# 1. Node.jsをインストール
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs git

# 2. プロジェクトをクローン＆実行
git clone https://github.com/PENwitmi/finance_app.git
cd finance_app
npm install
npm run dev
```

---

## 📱 共通要件（全OS）

### ハードウェア要件
| 項目 | 最小要件 | 推奨 |
|------|---------|------|
| **メモリ** | 4GB | 8GB以上 |
| **ディスク空き容量** | 500MB | 1GB以上 |
| **CPU** | デュアルコア | クアッドコア以上 |

### ブラウザ要件
| ブラウザ | 最小バージョン | 備考 |
|----------|--------------|------|
| **Chrome** | 90+ | 最も推奨 |
| **Safari** | 14+ | macOSのみ |
| **Firefox** | 88+ | 全OS対応 |
| **Edge** | 90+ | Windows推奨 |

### 2. プロジェクトのセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/PENwitmi/finance_app.git
cd finance_app

# 依存関係をインストール
npm install
```

### 3. 実行方法

#### 方法A: start.commandを使用（macOSのみ）
```bash
# Finderでダブルクリック
./start.command
```

#### 方法B: npmコマンドを使用（全OS共通）
```bash
# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

## トラブルシューティング

### ❌ "command not found: node"
→ Node.jsがインストールされていません。上記の手順でインストールしてください。

### ❌ "npm install" でエラー
```bash
# キャッシュをクリア
npm cache clean --force

# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### ❌ ポート3000が使用中
```bash
# 別のポートで起動
npm run dev -- --port 3001
```

### ❌ start.commandが実行できない（macOS）
```bash
# 実行権限を付与
chmod +x start.command
```

## 推奨開発環境

### エディタ
- **Visual Studio Code** （推奨）
  - 拡張機能: ES7+ React/Redux/React-Native snippets
  - 拡張機能: Tailwind CSS IntelliSense

### ブラウザ拡張
- **React Developer Tools**
- **Redux DevTools**（将来的に使用予定）

## データの保存場所

| データ種別 | 保存場所 | 容量制限 |
|-----------|---------|----------|
| **仕訳データ** | IndexedDB | ブラウザ依存（通常10GB以上） |
| **設定** | LocalStorage | 5-10MB |
| **バックアップ** | ダウンロードフォルダ（JSON） | なし |

## ⚠️ 注意事項

### データの永続性について
- **IndexedDBの制限**: ブラウザのキャッシュクリアでデータが消える可能性
- **推奨**: 定期的にJSONエクスポートでバックアップ
- **将来対応**: Firebase連携で完全な永続化を予定

### プライバシー
- すべてのデータはローカル（あなたのPC）に保存されます
- 外部サーバーへの送信は一切ありません
- 完全にオフラインで動作可能

## サポート

### 問題が解決しない場合
1. [Issues](https://github.com/PENwitmi/finance_app/issues)で報告
2. 以下の情報を含めてください：
   - OS名とバージョン
   - Node.jsのバージョン（`node --version`）
   - エラーメッセージのスクリーンショット