// Libs
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import type { ReactNode } from 'react';

// Components
import Providers from './providers';

// CSS
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TourGemini',
  description: 'TourGemini: Generate Tours using AI!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
