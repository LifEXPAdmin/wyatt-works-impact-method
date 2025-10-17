import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import OnboardingModal from "@/components/OnboardingModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.webmanifest",
  title: "From Idea to Impact — Wyatt Works Method",
  description: "A living, interactive blueprint to build your brand from idea to impact.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Wyatt Works Method",
    "msapplication-TileColor": "#0B0E14",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2EA8FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0E14" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#0B0E14] text-zinc-100">
      <body 
        className={cn(inter.className, "min-h-screen antialiased")}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0)',
          paddingBottom: 'env(safe-area-inset-bottom, 0)',
          paddingLeft: 'env(safe-area-inset-left, 0)',
          paddingRight: 'env(safe-area-inset-right, 0)',
        }}
      >
        <ScrollProgress />
        <NavBar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <OnboardingModal />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(()=>{});
              });
            }`
          }}
        />
        <script
          async
          data-domain="method.wyatt-works.com"
          src="https://plausible.io/js/script.js"
        />
      </body>
    </html>
  );
}