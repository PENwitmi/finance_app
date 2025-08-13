import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import EntryModeSelector from './components/EntryModeSelector';
import JournalList from './components/JournalList';
import TrialBalance from './components/TrialBalance';
import ExpenseSummary from './components/ExpenseSummary';
import MonthlyExpenseReport from './components/MonthlyExpenseReport';
import { useIndexedDB, useJournals, useAccounts } from './hooks/useIndexedDB';
import * as db from './utils/db';

function App() {
  const [currentView, setCurrentView] = useState('entry');
  const { isDBReady, error: dbError } = useIndexedDB();
  const { journals, loading: journalsLoading, addJournal, updateJournal, deleteJournal } = useJournals();
  const { accounts, loading: accountsLoading } = useAccounts();

  // エクスポート機能
  const handleExport = async () => {
    try {
      const jsonData = await db.exportToJSON();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bookkeeping_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('エクスポートに失敗しました');
    }
  };

  // インポート機能
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();
        await db.importFromJSON(text);
        window.location.reload(); // データを再読み込み
      } catch (error) {
        console.error('Import failed:', error);
        alert('インポートに失敗しました');
      }
    };
    input.click();
  };

  // ローディング状態
  if (!isDBReady || journalsLoading || accountsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // エラー状態
  if (dbError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>データベースの初期化に失敗しました</p>
          <p className="text-sm mt-2">{dbError.message}</p>
        </div>
      </div>
    );
  }

  // ビューのレンダリング
  const renderView = () => {
    switch (currentView) {
      case 'entry':
        return (
          <EntryModeSelector 
            accounts={accounts} 
            onSubmit={addJournal}
          />
        );
      
      case 'journal':
        return (
          <JournalList 
            journals={journals}
            onEdit={(id) => {
              // 編集機能は後で実装
              alert('編集機能は開発中です');
            }}
            onDelete={deleteJournal}
          />
        );
      
      case 'reports':
        return (
          <TrialBalance 
            journals={journals}
            accounts={accounts}
          />
        );
      
      case 'expenses':
        return (
          <div className="space-y-6">
            <ExpenseSummary 
              entries={journals}
              accounts={accounts}
            />
            <MonthlyExpenseReport
              entries={journals} 
              accounts={accounts}
            />
          </div>
        );
      
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6">設定</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium mb-2">データ管理</h3>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleExport}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    データをエクスポート
                  </button>
                  <button
                    onClick={handleImport}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    データをインポート
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('すべてのデータが削除され、勘定科目が初期化されます。よろしいですか？')) {
                        // IndexedDBを完全に削除
                        indexedDB.deleteDatabase('bookkeeping_db');
                        // ページをリロード
                        window.location.reload();
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    データベースを初期化
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-md font-medium mb-2">統計情報</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>仕訳件数: {journals.length} 件</p>
                  <p>勘定科目数: {accounts.length} 件</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout 
      currentView={currentView}
      onViewChange={setCurrentView}
    >
      {renderView()}
    </Layout>
  );
}

export default App;