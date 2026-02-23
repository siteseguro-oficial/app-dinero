"use client";

import { useEffect, useState } from 'react';
import { getMissions } from '@/data/missions';
import { loadStorage, saveStorage } from '@/lib/storage';
import { Mission } from '@/types';

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Determine today's program day and load missions
  useEffect(() => {
    const data = loadStorage();
    let profile = data.userProfile;
    const today = new Date();
    const todayISO = today.toISOString().substring(0, 10);
    // If no profile, initialize with defaults
    if (!profile) {
      profile = {
        name: '',
        goal: '',
        startDate: todayISO,
        programDuration: 90,
        dailyMinutesTarget: 30,
        incomeTarget: 1000,
      };
      data.userProfile = profile;
      saveStorage(data);
    }
    const startDate = new Date(profile.startDate);
    const diffDays = Math.floor((today.getTime() - startDate.getTime()) / (24 * 3600 * 1000));
    const dayNumber = Math.min(diffDays + 1, profile.programDuration);
    const todaysMissions = getMissions().filter((m) => m.day === dayNumber);
    setMissions(todaysMissions);
    // Load completed missions from DayLog
    const log = data.dayLogs?.[todayISO];
    if (log) {
      setCompletedIds(log.completedMissionIds);
    }
  }, []);

  const toggle = (id: string) => {
    const data = loadStorage();
    const todayISO = new Date().toISOString().substring(0, 10);
    if (!data.dayLogs) data.dayLogs = {};
    if (!data.dayLogs[todayISO]) {
      data.dayLogs[todayISO] = {
        dateISO: todayISO,
        completedMissionIds: [],
        income: 0,
        streak: 0,
        pointsEarned: 0,
      };
    }
    const log = data.dayLogs[todayISO];
    let updated: string[];
    let pointChange = 0;
    const mission = missions.find((m) => m.id === id);
    if (!mission) return;
    if (completedIds.includes(id)) {
      updated = completedIds.filter((x) => x !== id);
      pointChange = -mission.points;
    } else {
      updated = [...completedIds, id];
      pointChange = mission.points;
    }
    setCompletedIds(updated);
    log.completedMissionIds = updated;
    data.points = (data.points || 0) + pointChange;
    saveStorage(data);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Missões do dia</h1>
      <ul className="space-y-2">
        {missions.map((m) => (
          <li
            key={m.id}
            className="p-4 bg-gray-800 rounded-md flex items-center justify-between"
          >
            <div className="flex-1 pr-4">
              <p className="font-semibold">
                {m.title}
                {m.isOptional ? ' (opcional)' : ''}
              </p>
              <p className="text-sm text-gray-400">{m.description}</p>
            </div>
            <input
              type="checkbox"
              checked={completedIds.includes(m.id)}
              onChange={() => toggle(m.id)}
              className="h-5 w-5 text-emerald-500"
            />
          </li>
        ))}
        {missions.length === 0 && (
          <li className="p-4 bg-gray-800 rounded-md">Nenhuma missão para hoje.</li>
        )}
      </ul>
    </div>
  );
}
