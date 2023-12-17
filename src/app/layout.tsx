"use client";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new QueryClient();
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className="mx-auto w-full max-w-screen-sm bg-white min-h-screen">
          <Navbar />
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
