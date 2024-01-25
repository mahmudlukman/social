import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Topbar from '@/components/shared/Topbar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';
import Bottombar from '@/components/shared/Bottombar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social',
  description: 'A Social Media App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>{children}</body>
    </html>
  );
}
