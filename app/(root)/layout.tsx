'use client'
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <main className="gradient-bg-welcome text-black h-screen w-full flex">
      {/* Mobile Sidebar Toggle Button */}
      <button 
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-n-8 rounded-lg"
      >
        <FiMenu className="text-white text-xl" />
      </button>

      {/* Sidebar - Hidden on mobile when closed */}
      <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative z-50 w-72 h-full`}>
        <Sidebar mobile={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />
      </div>

      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {children}
      </div>
    </main>
  );
}