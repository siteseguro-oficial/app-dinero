"use client";

import { useEffect, useState } from 'react';
import { loadStorage, saveStorage } from '@/lib/storage';
import { UserProfile } from '@/types';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    goal: '',
    startDate: new Date().toISOString().substring(0, 10),
    programDuration: 90,
    dailyMinutesTarget: 30,
    incomeTarget: 1000,
  });

  useEffect(() => {
    const data = loadStorage();
    if (data.userProfile) {
      setProfile(data.userProfile);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const save = () => {
    const data = loadStorage();
    data.userProfile = profile;
    saveStorage(data);
    alert('Perfil salvo!');
  };

  const reset = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados e sair?')) {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        location.href = '/';
      }
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Perfil</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nome</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Objetivo</label>
          <input
            type="text"
            name="goal"
            value={profile.goal}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Data de início</label>
          <input
            type="date"
            name="startDate"
            value={profile.startDate}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Duração do programa (dias)</label>
          <input
            type="number"
            name="programDuration"
            value={profile.programDuration}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Minutos diários alvo</label>
          <input
            type="number"
            name="dailyMinutesTarget"
            value={profile.dailyMinutesTarget}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Meta de renda (mensal)</label>
          <input
            type="number"
            name="incomeTarget"
            value={profile.incomeTarget}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={save}
            className="flex-1 py-3 rounded-md bg-emerald-600 text-white"
          >
            Salvar
          </button>
          <button
            onClick={reset}
            className="flex-1 py-3 rounded-md bg-red-600 text-white"
          >
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
}
