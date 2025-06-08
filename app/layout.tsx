import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Easy Krypt",
  description: "A Smart, easy to use, Web3 Bank Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <TransactionsProvider> */}
      <AuthProvider>
        <body className={` antialiased`}>
          <Toaster position="bottom-right" />
          {children}
        </body>
      </AuthProvider>
      {/* </TransactionsProvider> */}
    </html>
  );
}
