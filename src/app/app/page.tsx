"use client";

import { useEffect, useState } from 'react';
import { loadStorage } from '@/lib/storage';
import { DayLog } from '@/types';

export default function DashboardPage() {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const data = loadStorage();
    setPoints(data.points || 0);
    const dayLogs = data.dayLogs || {};
    const dates = Object.keys(dayLogs).sort();
    // compute streak
    let currentStreak = 0;
    let prevDate: string | null = null;
    dates.forEach((date) => {
      const log: DayLog = dayLogs[date];
      if (log.completedMissionIds && log.completedMissionIds.length >= 3) {
        if (!prevDate) {
          currentStreak = 1;
        } else {
          const prev = new Date(prevDate);
          const cur = new Date(date);
          const diffDays = (cur.getTime() - prev.getTime()) / (24 * 3600 * 1000);
          if (diffDays === 1) {
            currentStreak += 1;
          } else {
            currentStreak = 1;
          }
        }
        prevDate = date;
      }
    });
    setStreak(currentStreak);
    // compute program progress (completed core days / 90)
    const completedDays = dates.filter((date) => {
      const log: DayLog = dayLogs[date];
      return log.completedMissionIds && log.completedMissionIds.length >= 3;
    }).length;
    setProgress(Math.min(100, Math.round((completedDays / 90) * 100)));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="grid gap-4">
        <div className="p-4 rounded-lg bg-gray-800">
          <div className="flex justify-between">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="bg-emerald-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="p-4 rounded-lg bg-gray-800 flex justify-between">
          <span>Streak 🔥</span>
          <span>{streak}</span>
        </div>
        <div className="p-4 rounded-lg bg-gray-800 flex justify-between">
          <span>Pontos ⭐</span>
          <span>{points}</span>
        </div>
        <div className="p-4 rounded-lg bg-gray-800">
          <span className="block mb-2 font-semibold">Missão do dia</span>
          <p>Verifique a aba Missões para completar suas tarefas de hoje.</p>
        </div>
      </div>
    </div>
  );
}
