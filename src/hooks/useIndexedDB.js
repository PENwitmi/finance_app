import { useState, useEffect } from 'react';
import * as db from '../utils/db';

export const useIndexedDB = () => {
  const [isDBReady, setIsDBReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await db.initDB();
        setIsDBReady(true);
      } catch (err) {
        setError(err);
        console.error('Database initialization failed:', err);
      }
    };

    initDatabase();
  }, []);

  return { isDBReady, error };
};

export const useJournals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadJournals = async () => {
    try {
      setLoading(true);
      const data = await db.getAllData('journals');
      const activeJournals = data.filter(j => !j.isDeleted);
      setJournals(activeJournals.sort((a, b) => b.date.localeCompare(a.date)));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addJournal = async (journalData) => {
    try {
      const newJournal = {
        ...journalData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false
      };
      
      await db.addData('journals', newJournal);
      await loadJournals();
      return { success: true, data: newJournal };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const updateJournal = async (id, updateData) => {
    try {
      const journal = await db.getData('journals', id);
      const updatedJournal = {
        ...journal,
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      await db.updateData('journals', updatedJournal);
      await loadJournals();
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const deleteJournal = async (id) => {
    try {
      // 論理削除
      await updateJournal(id, { isDeleted: true });
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  useEffect(() => {
    loadJournals();
  }, []);

  return {
    journals,
    loading,
    error,
    addJournal,
    updateJournal,
    deleteJournal,
    refreshJournals: loadJournals
  };
};

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDBReady } = useIndexedDB();

  const loadAccounts = async () => {
    try {
      setLoading(true);
      
      // DBが準備できるまで待つ
      if (!isDBReady) {
        setTimeout(loadAccounts, 100);
        return;
      }
      
      const data = await db.getAllData('accounts');
      const { initialAccounts } = await import('../data/accounts');
      
      // 既存データがない、または初期データと数が異なる場合は更新
      if (data.length === 0 || data.length !== initialAccounts.length) {
        // 既存のデータをクリアして新しいデータを追加
        for (const account of initialAccounts) {
          await db.updateData('accounts', account);
        }
        setAccounts(initialAccounts);
      } else {
        // 不足している勘定科目があるか確認して追加
        const existingIds = new Set(data.map(a => a.id));
        for (const account of initialAccounts) {
          if (!existingIds.has(account.id)) {
            await db.updateData('accounts', account);
          }
        }
        // 最新のデータを再取得
        const updatedData = await db.getAllData('accounts');
        setAccounts(updatedData.sort((a, b) => a.sortOrder - b.sortOrder));
      }
    } catch (err) {
      console.error('Failed to load accounts:', err);
      // エラー時は初期データを直接使用
      const { initialAccounts } = await import('../data/accounts');
      setAccounts(initialAccounts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDBReady) {
      loadAccounts();
    }
  }, [isDBReady]);

  return { accounts, loading, refreshAccounts: loadAccounts };
};