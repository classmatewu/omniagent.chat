import type { Metadata } from 'next';
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
  weight: ['400', '500', '600', '700', '800'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700'],
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
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body className={`${jakarta.className} min-h-screen`}>{children}</body>
    </html>
  );
}
