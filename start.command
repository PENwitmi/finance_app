#!/bin/bash
# 複式帳簿管理システム起動スクリプト

cd "$(dirname "$0")"

echo "========================================="
echo "   複式帳簿管理システム v0.1.0-alpha"
echo "========================================="
echo ""

# Node.jsがインストールされているか確認
if ! command -v node &> /dev/null; then
    echo "❌ Node.jsがインストールされていません"
    echo "   https://nodejs.org/ からインストールしてください"
    echo ""
    echo "Enterキーを押して終了..."
    read
    exit 1
fi

echo "✅ Node.js $(node --version) を検出"

# node_modulesが存在しない場合はインストール
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 初回セットアップを実行中..."
    echo "   依存パッケージをインストールしています"
    echo "   （数分かかる場合があります）"
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ パッケージのインストールに失敗しました"
        echo "Enterキーを押して終了..."
        read
        exit 1
    fi
fi

# 空いているポートを探す
PORT=3000
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; do
    echo "ポート $PORT は使用中です。別のポートを試します..."
    PORT=$((PORT + 1))
done

echo ""
echo "🚀 開発サーバーを起動中..."
echo "   ポート: $PORT"
echo ""
echo "========================================="
echo "ブラウザが自動的に開きます"
echo "終了する場合は Control + C を押してください"
echo "========================================="
echo ""

# 開発サーバーを起動（最新のコードを自動反映）
VITE_PORT=$PORT npm run dev -- --port $PORT --open