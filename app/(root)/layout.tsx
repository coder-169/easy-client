import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="gradient-bg-welcome text-black h-screen justify-center grid grid-cols-5 w-full">
      <div className="bg-white shadow-lg col-span-1 h-full">
        <Sidebar />
      </div>
      <div className="col-span-4 overflow-y-scroll">{children}</div>
    </main>
  );
}
