import { ReactNode } from "react";
import AppTopBar from "./AppTopBar";

export default function AppShell({ 
  children, 
  sidebar, 
  right 
}: { 
  children: ReactNode; 
  sidebar?: ReactNode; 
  right?: ReactNode; 
}) {
  return (
    <div className="min-h-screen">
      <AppTopBar />
      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3">{sidebar}</aside>
        <main className="col-span-12 lg:col-span-6">{children}</main>
        <aside className="col-span-12 lg:col-span-3">{right}</aside>
      </div>
    </div>
  );
}
