Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   複式帳簿管理システム v0.1.0-alpha" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Node.jsがインストールされているか確認
try {
    $nodeVersion = node --version 2>$null
    if ($?) {
        Write-Host "✅ Node.js $nodeVersion を検出" -ForegroundColor Green
    } else {
        throw
    }
} catch {
    Write-Host "❌ Node.jsがインストールされていません" -ForegroundColor Red
    Write-Host "   https://nodejs.org/ からインストールしてください" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Enterキーを押して終了..."
    Read-Host
    exit 1
}

Write-Host ""

# node_modulesが存在しない場合はインストール
if (!(Test-Path "node_modules")) {
    Write-Host "📦 初回セットアップを実行中..." -ForegroundColor Yellow
    Write-Host "   依存パッケージをインストールしています"
    Write-Host "   （数分かかる場合があります）"
    Write-Host ""
    
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ パッケージのインストールに失敗しました" -ForegroundColor Red
        Write-Host "Enterキーを押して終了..."
        Read-Host
        exit 1
    }
}

Write-Host ""
Write-Host "🚀 開発サーバーを起動中..." -ForegroundColor Green
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "ブラウザで http://localhost:3000 を開いてください" -ForegroundColor Yellow
Write-Host "終了する場合は Ctrl + C を押してください" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 開発サーバーを起動
npm run dev