"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length >= 4) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_pin', pin);
      }
      router.push('/app');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">Digite seu PIN</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="password"
          inputMode="numeric"
          pattern="\\d*"
          placeholder="****"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full p-3 mb-4 text-center rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={pin.length < 4}
          className="w-full py-3 rounded-md bg-emerald-600 text-white disabled:opacity-50"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
