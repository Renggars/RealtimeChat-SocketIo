"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuSidebar from "@/components/menu-sidebar"; // Komponen baru
import ChatListSidebar from "@/components/chat-list-sidebar"; // Mengganti nama Sidebar menjadi ChatListSidebar
import ChatWindow from "@/components/chat-window";

export default function ChatPage() {
  const router = useRouter();
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      setTokenValid(true);
    }
  }, []);

  if (!tokenValid) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Menu Paling Kiri */}
      <div className="w-20 border-r border-gray-200">
        {" "}
        {/* Lebar tetap kecil untuk ikon */}
        <MenuSidebar />
      </div>

      {/* Sidebar Daftar Chat (sebelumnya Sidebar) */}
      <div className="w-[30%] border-r border-gray-200">
        {" "}
        {/* Sesuaikan lebar jika perlu, misal w-80 atau w-1/4 */}
        <ChatListSidebar />
      </div>

      {/* Jendela Chat Kanan */}
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
}
