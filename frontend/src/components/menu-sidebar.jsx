"use client";

import {
  MessageSquare, // Ikon Chat
  Users, // Ikon Komunitas (Mirip Group/Kontak)
  User, // Ikon Profil
  Bell, // Ikon Notifikasi (Mirip Status/Channel)
  Settings, // Ikon Pengaturan
  LogOut, // Ikon Keluar
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function MenuSidebar() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const pathname = usePathname();

  const hideSidebar = ["/", "/auth/login", "/auth/register"].includes(pathname);
  if (hideSidebar) return null;

  const menuItems = [
    { icon: MessageSquare, label: "Chats", path: "/chat" },
    { icon: Users, label: "Communities", path: "/communities" },
    { icon: User, label: "Contacts", path: "/contacts" },
    { icon: Bell, label: "Status", path: "/status" },
  ];

  return (
    <div className="w-20 border-r border-gray-200 flex flex-col h-full bg-[#F7F5F3] items-center py-4">
      {/* Avatar Profil di Header */}
      <div
        className="mt-4 mb-6 relative w-12 h-12 rounded-full overflow-hidden cursor-pointer"
        onClick={() => router.push("/profile")}
      >
        <Image src="/foto.jpeg" alt="Profile" fill className="object-cover" />
      </div>

      {/* Item Menu */}
      <nav className="flex flex-col space-y-4 flex-grow">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.path;

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => router.push(item.path)}
                  className={`relative h-12 w-12 rounded-full flex items-center justify-center cursor-pointer
                        ${
                          isActive
                            ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            : "text-gray-600 hover:bg-gray-200"
                        }`}
                >
                  <IconComponent className="h-7 w-7" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-sm">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* Ikon Pengaturan di Footer */}
      <div className="mt-auto space-y-10">
        <button
          onClick={logout}
          className="relative h-14 w-14 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-300 cursor-pointer"
        >
          <LogOut className="h-9 w-9" />
        </button>
        <button
          onClick={() => router.push("/settings")}
          className="relative h-14 w-14 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-300 cursor-pointer"
        >
          <Settings className="h-9 w-9" />
        </button>
      </div>
    </div>
  );
}
