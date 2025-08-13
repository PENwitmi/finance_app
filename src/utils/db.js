const DB_NAME = 'bookkeeping_db';
const DB_VERSION = 1;

let db = null;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // 仕訳データストア
      if (!db.objectStoreNames.contains('journals')) {
        const journalStore = db.createObjectStore('journals', { keyPath: 'id' });
        journalStore.createIndex('date', 'date', { unique: false });
        journalStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // 勘定科目マスタストア
      if (!db.objectStoreNames.contains('accounts')) {
        const accountStore = db.createObjectStore('accounts', { keyPath: 'id' });
        accountStore.createIndex('category', 'category', { unique: false });
        accountStore.createIndex('sortOrder', 'sortOrder', { unique: false });
      }

      // 会計期間ストア
      if (!db.objectStoreNames.contains('periods')) {
        const periodStore = db.createObjectStore('periods', { keyPath: 'id' });
        periodStore.createIndex('isCurrent', 'isCurrent', { unique: false });
      }
    };
  });
};

// 汎用的なCRUD操作
export const addData = (storeName, data) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }
    
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.add(data);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getData = (storeName, id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAllData = (storeName) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      resolve([]);
      return;
    }
    
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const updateData = (storeName, data) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }
    
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(data);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteData = (storeName, id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// 仕訳専用の操作
export const getJournalsByDateRange = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['journals'], 'readonly');
    const store = transaction.objectStore('journals');
    const index = store.index('date');
    const range = IDBKeyRange.bound(startDate, endDate);
    const request = index.getAll(range);

    request.onsuccess = () => {
      const journals = request.result.filter(j => !j.isDeleted);
      resolve(journals);
    };
    request.onerror = () => reject(request.error);
  });
};

// JSONエクスポート
export const exportToJSON = async () => {
  const journals = await getAllData('journals');
  const accounts = await getAllData('accounts');
  const periods = await getAllData('periods');

  const exportData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    data: {
      journals: journals.filter(j => !j.isDeleted),
      accounts,
      periods
    },
    metadata: {
      journalCount: journals.length,
      accountCount: accounts.length
    }
  };

  return JSON.stringify(exportData, null, 2);
};

// JSONインポート
export const importFromJSON = async (jsonString) => {
  try {
    const importData = JSON.parse(jsonString);
    
    // バージョンチェック
    if (importData.version !== '1.0') {
      throw new Error('サポートされていないデータ形式です');
    }

    // 既存データをクリア（オプション）
    // await clearAllData();

    // データをインポート
    for (const journal of importData.data.journals) {
      await addData('journals', journal);
    }
    for (const account of importData.data.accounts) {
      await updateData('accounts', account);
    }
    for (const period of importData.data.periods) {
      await updateData('periods', period);
    }

    return true;
  } catch (error) {
    console.error('Import error:', error);
    throw error;
  }
};