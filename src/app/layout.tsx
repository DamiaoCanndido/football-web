import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Provider from '@/contexts/provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Football web',
  description: 'Football web',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
