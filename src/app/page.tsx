'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [mode, setMode] = useState<'pin' | 'email'>('pin');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // if already authenticated with pin or email, redirect
    const storedPin = typeof window !== 'undefined' ? localStorage.getItem('auth_pin') : null;
    const storedEmail = typeof window !== 'undefined' ? localStorage.getItem('auth_email') : null;
    if (storedPin || storedEmail) {
      router.push('/app');
    }
  }, [router]);

  const handlePinLogin = () => {
    if (pin.length >= 4) {
      localStorage.setItem('auth_pin', pin);
      router.push('/app');
    }
  };

  const handleEmailLogin = () => {
    if (email.includes('@')) {
      localStorage.setItem('auth_email', email);
      router.push('/app');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="max-w-md w-full space-y-6">
        {mode === 'pin' ? (
          <>
            <h1 className="text-2xl font-bold text-center">Digite seu PIN</h1>
            <input
              type="password"
              inputMode="numeric"
              placeholder="PIN (4 ou mais dígitos)"
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md disabled:opacity-50"
              onClick={handlePinLogin}
              disabled={pin.length < 4}
            >
              Entrar com PIN
            </button>
            <p className="text-sm text-center">
              ou{' '}
              <button
                type="button"
                onClick={() => setMode('email')}
                className="text-blue-400 underline"
              >
                entrar com e-mail
              </button>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center">Digite seu e-mail</h1>
            <input
              type="email"
              placeholder="seuemail@example.com"
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md disabled:opacity-50"
              onClick={handleEmailLogin}
              disabled={!email || !email.includes('@')}
            >
              Entrar com e-mail
            </button>
            <p className="text-sm text-center">
              ou{' '}
              <button
                type="button"
                onClick={() => setMode('pin')}
                className="text-blue-400 underline"
              >
                entrar com PIN
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
