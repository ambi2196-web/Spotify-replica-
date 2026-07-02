import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import PlayerBar from "@/components/layout/PlayerBar";
import BottomNav from "@/components/layout/BottomNav";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resonance",
  description: "A product strategy thesis for Spotify's audio future.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="flex h-full flex-col overflow-hidden bg-surface-1 text-text-primary">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto" id="main-content">
            {children}
          </main>
        </div>
        <PlayerBar />
        <BottomNav />
      </body>
    </html>
  );
}
