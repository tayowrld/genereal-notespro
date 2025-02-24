
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileWarning } from "./MobileWarning";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <MobileWarning />
      <div className="app-content min-h-screen flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
}
