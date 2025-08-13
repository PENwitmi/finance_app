@echo off
echo =========================================
echo    複式帳簿管理システム v0.1.0-alpha
echo =========================================
echo.

REM Node.jsがインストールされているか確認
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.jsがインストールされていません
    echo    https://nodejs.org/ からインストールしてください
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js を検出
node --version
echo.

REM node_modulesが存在しない場合はインストール
if not exist "node_modules" (
    echo 📦 初回セットアップを実行中...
    echo    依存パッケージをインストールしています
    echo    （数分かかる場合があります）
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ パッケージのインストールに失敗しました
        pause
        exit /b 1
    )
)

echo.
echo 🚀 開発サーバーを起動中...
echo.
echo =========================================
echo ブラウザで http://localhost:3000 を開いてください
echo 終了する場合は Ctrl + C を押してください
echo =========================================
echo.

REM 開発サーバーを起動
call npm run dev