#!/bin/bash
# 複式帳簿管理システム起動スクリプト

cd "$(dirname "$0")"

echo "========================================="
echo "   複式帳簿管理システム"
echo "========================================="
echo ""

# 空いているポートを探す
PORT=8080
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; do
    echo "ポート $PORT は使用中です。別のポートを試します..."
    PORT=$((PORT + 1))
done

echo "ポート $PORT で起動します..."
echo ""
echo "ブラウザが自動的に開きます"
echo "終了する場合は Control + C を押してください"
echo ""
echo "========================================="

# 簡易サーバーを起動（Python3を使用）
python3 -m http.server $PORT --directory dist &
SERVER_PID=$!

# ブラウザを開く
sleep 2
open http://localhost:$PORT

# サーバーを実行し続ける
wait $SERVER_PID