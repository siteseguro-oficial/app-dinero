"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const pin = typeof window !== 'undefined' ? localStorage.getItem('auth_pin') : null;
    if (!pin) {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 pb-20">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 border-t border-gray-700 flex justify-around items-center text-sm">
        <Link href="/app" className="flex flex-col items-center py-2">Home</Link>
        <Link href="/app/missions" className="flex flex-col items-center py-2">Missões</Link>
        <Link href="/app/earnings" className="flex flex-col items-center py-2">Ganhos</Link>
        <Link href="/app/history" className="flex flex-col items-center py-2">Histórico</Link>
        <Link href="/app/profile" className="flex flex-col items-center py-2">Perfil</Link>
      </nav>
    </div>
  );
}
