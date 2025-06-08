export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" flex min-h-screen items-start justify-center  w-full">
      {children}
    </main>
  );
}
