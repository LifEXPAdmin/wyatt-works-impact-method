import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'From Idea to Impact | The Wyatt Works Method',
  description: 'Transform your ideas into powerful impact with our proven methodology. Interactive checklists and guidelines for personal and business implementation.',
  keywords: ['idea to impact', 'wyatt works method', 'implementation guide', 'personal development', 'business strategy', 'checklist'],
  authors: [{ name: 'Wyatt Works' }],
  creator: 'Wyatt Works',
  publisher: 'Wyatt Works',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://method.wyatt-works.com',
    siteName: 'From Idea to Impact',
    title: 'From Idea to Impact | The Wyatt Works Method',
    description: 'Transform your ideas into powerful impact with our proven methodology.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'From Idea to Impact - The Wyatt Works Method',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Idea to Impact | The Wyatt Works Method',
    description: 'Transform your ideas into powerful impact with our proven methodology.',
    images: ['/og-image.png'],
    creator: '@wyattworks',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}