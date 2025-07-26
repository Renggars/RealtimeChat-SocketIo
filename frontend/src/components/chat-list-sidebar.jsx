import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PlusSquare, MoreVertical as DotsVerticalIcon } from "lucide-react";

function NewChatIcon(props) {
  return <PlusSquare {...props} />;
}

export default function ChatListSidebar() {
  // Ubah nama fungsi di sini
  const chatItems = [
    {
      name: "Akuu (Anda)",
      lastMessage: "✔️ tes",
      time: "12.20",
      avatarFallback: "A",
      unread: 0,
      showBadge: false,
    },
    {
      name: "Akuu (Anda)",
      lastMessage: "✔️ tes",
      time: "12.20",
      avatarFallback: "A",
      unread: 0,
      showBadge: false,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header Sidebar */}
      <div className="py-4 px-7 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-[#1DAA61]">NexChat</h1>

        {/* Ikon */}
        <div className="flex space-x-3 text-gray-900">
          <div className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer">
            <NewChatIcon className="h-7 w-7" />
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer">
            <DotsVerticalIcon className="h-7 w-7" />
          </div>
        </div>
      </div>

      {/* Pencarian */}
      <div className="px-6">
        <Input
          placeholder="Cari atau mulai chat baru"
          className="rounded-3xl py-6 px-4 bg-gray-100 text-gray-600 placeholder:text-gray-400
    border-2 border-transparent hover:border-gray-300
    focus:border-[#1DAA61]
    focus-visible:ring-2 focus-visible:ring-[#1DAA61] focus-visible:ring-offset-0
    transition-colors duration-200 ease-in-out xl:text-lg"
        />
      </div>

      {/* Filter */}
      <div className="flex py-4 px-6 pb-2 space-x-2 text-lg text-gray-600">
        <button className="h-auto hover:bg-gray-100 rounded-3xl border-2 border-gray-200 py-1 px-4 cursor-pointer">
          Semua
        </button>
        <button className="h-auto hover:bg-gray-100 rounded-3xl border-2 border-gray-200 py-1 px-4 cursor-pointer">
          Belum dibaca
        </button>
        <button className="h-auto hover:bg-gray-100 rounded-3xl border-2 border-gray-200 py-1 px-4 cursor-pointer">
          Favorit
        </button>
        <button className="h-auto hover:bg-gray-100 rounded-3xl border-2 border-gray-200 py-1 px-4 cursor-pointer">
          Grup
        </button>
      </div>

      {/* Daftar Chat */}
      <div className="flex-1 overflow-y-auto px-4 space-y-[6px]">
        {chatItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-5 border-b bg-gray-100 border-gray-100 hover:bg-gray-100 cursor-pointer rounded-2xl"
          >
            <Image
              className="rounded-full cursor-pointer"
              src="/foto.jpeg"
              alt="Profile"
              width={60}
              height={60}
              onClick={() => router.push("/profile")}
            />
            <div className="ml-4 flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="font-normal text-lg">{item.name}</h2>
                <div className="flex items-center space-x-2">
                  {item.unread > 0 && item.showBadge && (
                    <span className="bg-green hover:bg-gray-100xs font-bold px-2 py-1 rou4 cursor-pointerded-full">
                      {item.unread}
                    </span>
                  )}
                  <span className=" text-gray-500">{item.time}</span>
                </div>
              </div>
              <p className="text text-gray-600 truncate">{item.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
