import { StorageSchema } from '@/types';

const STORAGE_KEY = 'dinero-data';

export function loadStorage(): StorageSchema {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StorageSchema) : {};
  } catch {
    return {};
  }
}

export function saveStorage(data: StorageSchema) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}
