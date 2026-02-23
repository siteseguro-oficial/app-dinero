"use client";

import { useEffect, useState } from 'react';
import { loadStorage } from '@/lib/storage';
import { DayLog } from '@/types';

export default function HistoryPage() {
  const [logs, setLogs] = useState<DayLog[]>([]);

  useEffect(() => {
    const data = loadStorage();
    const dayLogs = data.dayLogs || {};
    const arr = Object.values(dayLogs)
      .sort((a: any, b: any) => (a.dateISO < b.dateISO ? 1 : -1)) as DayLog[];
    setLogs(arr);
  }, []);

  const statusLabel = (log: DayLog) => {
    const count = log.completedMissionIds?.length || 0;
    if (count >= 3) return 'Completo';
    if (count > 0) return 'Parcial';
    return 'Incompleto';
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Histórico</h1>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li
            key={log.dateISO}
            className="p-4 bg-gray-800 rounded-md flex justify-between"
          >
            <span>{log.dateISO}</span>
            <span>{statusLabel(log)}</span>
          </li>
        ))}
        {logs.length === 0 && <p>Ainda não há histórico.</p>}
      </ul>
    </div>
  );
}
