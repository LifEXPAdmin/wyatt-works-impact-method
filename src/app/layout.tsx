import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.webmanifest",
  title: "From Idea to Impact — Wyatt Works Method",
  description: "A living, interactive blueprint to build your brand from idea to impact.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#0B0E14] text-zinc-100">
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        {children}
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