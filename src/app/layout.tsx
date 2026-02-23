import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Dinero Challenge App',
  description: 'Desafio de Renda Extra (MVP)',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased bg-gray-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}
