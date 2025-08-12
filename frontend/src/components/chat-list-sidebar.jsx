"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PlusSquare, MoreVertical as DotsVerticalIcon } from "lucide-react";
import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";

function NewChatIcon(props) {
  return <PlusSquare {...props} />;
}

export default function ChatListSidebar() {
  const { users, getUsers, setSelectedUser, getMessages, selectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    border-2 !border-transparent hover:!border-gray-300
    focus:!border-[#1DAA61] focus:outline-none
    focus-visible:ring-0 focus:ring-0 focus:shadow-none
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
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user.id);
          const isActive = selectedUser?.id === user.id;
          return (
            <button
              key={user.id}
              className={`w-full flex items-center p-5 border-b border-gray-100 hover:bg-gray-100 cursor-pointer rounded-2xl text-left ${
                isActive ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => {
                setSelectedUser(user);
                getMessages(user.id);
              }}
            >
              <div className="relative">
                <Image
                  className="rounded-full"
                  src={user.profilePic || "/foto.jpeg"}
                  alt={user.username}
                  width={60}
                  height={60}
                />
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-center">
                  <h2 className="font-normal text-lg">{user.username}</h2>
                </div>
                {/* Placeholder last message */}
                <p className="text text-gray-600 truncate">&nbsp;</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
