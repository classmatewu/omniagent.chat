import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'omniagent.chat — AI Agents Are Inevitable',
  description:
    'AI and Agents are growing exponentially and irreversibly. Discover the OpenClaw & Skills ecosystem powering the next wave of intelligent automation.',
  metadataBase: new URL('https://omniagent.chat'),
  openGraph: {
    title: 'omniagent.chat — AI Agents Are Inevitable',
    description:
      'AI and Agents are growing exponentially and irreversibly. Discover the OpenClaw & Skills ecosystem.',
    url: 'https://omniagent.chat',
    siteName: 'omniagent.chat',
    type: 'website',
  },
  alternates: {
    canonical: 'https://omniagent.chat',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen`}>{children}</body>
    </html>
  );
}
