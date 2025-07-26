import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare, // Ikon Chat
  Users, // Ikon Komunitas (Mirip Group/Kontak)
  User, // Ikon Profil
  Bell, // Ikon Notifikasi (Mirip Status/Channel)
  Settings, // Ikon Pengaturan
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MenuSidebar() {
  const router = useRouter();

  const menuItems = [
    { icon: MessageSquare, label: "Chats", path: "/chat", active: true },
    { icon: Users, label: "Communities", path: "/communities", active: false },
    { icon: User, label: "Contacts", path: "/contacts", active: false },
    { icon: Bell, label: "Status", path: "status", active: false },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F7F5F3] items-center py-4">
      {/* Avatar Profil di Header */}
      <div className="mt-4 mb-6">
        <Image
          className="rounded-full cursor-pointer"
          src="/foto.jpeg"
          alt="Profile"
          width={45}
          height={45}
          onClick={() => router.push("/profile")}
        />
      </div>

      {/* Item Menu */}
      <nav className="flex flex-col space-y-4 flex-grow">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => router.push(item.path)}
                  className={`relative h-12 w-12 rounded-full flex items-center justify-center
                        ${
                          item.active
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
      <div className="mt-auto">
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
