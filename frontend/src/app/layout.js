import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MenuSidebar from "@/components/menu-sidebar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Realtime Chat",
  description: "Chat App with Socket.IO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900 flex h-screen overflow-hidden`}
        suppressHydrationWarning
      >
        <Toaster position="top-right" />
        <MenuSidebar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
