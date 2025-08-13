#!/bin/bash
# 本番用ビルドスクリプト

cd "$(dirname "$0")"

echo "========================================="
echo "   複式帳簿管理システム - ビルド"
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
    echo "📦 依存パッケージをインストール中..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ パッケージのインストールに失敗しました"
        echo "Enterキーを押して終了..."
        read
        exit 1
    fi
fi

echo ""
echo "🔨 本番用ビルドを開始..."
echo ""

# ビルド実行
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo "✅ ビルド完了！"
    echo ""
    echo "配布用ファイルが dist/ フォルダに生成されました"
    echo "静的サーバーでホスティングできます"
    echo "========================================="
else
    echo ""
    echo "❌ ビルドに失敗しました"
fi

echo ""
echo "Enterキーを押して終了..."
read