"use client";

import { useEffect, useState } from 'react';
import { loadStorage, saveStorage } from '@/lib/storage';
import { DayLog } from '@/types';

export default function EarningsPage() {
  const [value, setValue] = useState('');
  const [logs, setLogs] = useState<DayLog[]>([]);

  useEffect(() => {
    refreshLogs();
  }, []);

  const refreshLogs = () => {
    const data = loadStorage();
    const dayLogs = data.dayLogs || {};
    const recent = Object.values(dayLogs)
      .sort((a: any, b: any) => (a.dateISO < b.dateISO ? 1 : -1))
      .slice(0, 7) as DayLog[];
    setLogs(recent);
  };

  const addIncome = () => {
    const amount = parseFloat(value.replace(',', '.'));
    if (isNaN(amount) || amount <= 0) return;
    const data = loadStorage();
    const today = new Date().toISOString().substring(0, 10);
    if (!data.dayLogs) data.dayLogs = {};
    if (!data.dayLogs[today]) {
      data.dayLogs[today] = {
        dateISO: today,
        completedMissionIds: [],
        income: 0,
        streak: 0,
        pointsEarned: 0,
      };
    }
    data.dayLogs[today].income += amount;
    saveStorage(data);
    setValue('');
    refreshLogs();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ganhos</h1>
      <div className="mb-4">
        <label className="block text-sm mb-2">
          Digite o valor ganho hoje (em USD ou moeda local)
        </label>
        <div className="flex">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-3 py-2 rounded-l-md bg-gray-800 focus:outline-none"
            placeholder="0.00"
          />
          <button
            onClick={addIncome}
            className="px-4 py-3 rounded-r-md bg-emerald-600 text-white"
          >
            Adicionar
          </button>
        </div>
      </div>
      <h2 className="text-lg semibold mb-2">Últimos 7 dias</h2>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li
            key={log.dateISO}
            className="p-4 bg-gray-800 rounded-md flex justify-between"
          >
            <span>{log.dateISO}</span>
            <span>{log.income.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      {logs.length === 0 && <p className="mt-4">Sem registros de ganhos.</p>}
    </div>
  );
}
