"use client";

import { Input } from "@/components/ui/input";
import { Search, MoreVertical, Paperclip, Send } from "lucide-react";
import Image from "next/image";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef, useState } from "react";

export default function ChatWindow() {
  const {
    messages,
    selectedUser,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;
    subscribeToMessages();
    return () => unsubscribeFromMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser?.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col h-full">
      {/* Header Chat */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center">
          <Image
            className="rounded-full"
            src={selectedUser?.profilePic || "/foto.jpeg"}
            alt={selectedUser?.username || "Profile"}
            width={50}
            height={50}
          />
          <div className="ml-3">
            <h2 className="text-xl text-black font-normal">
              {selectedUser ? selectedUser.username : "Pilih pengguna"}
            </h2>
            <p className="text-sm text-gray-600">&nbsp;</p>
          </div>
        </div>
        {/* Ikon untuk panggilan, video, dll. */}
        <div className="flex space-x-10 text-gray-900 px-5">
          <Search className="h-7 w-7 cursor-pointer hover:text-gray-700" />
          <MoreVertical className="h-7 w-7 cursor-pointer hover:text-gray-700" />
        </div>
      </div>

      {/* Area Pesan */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-[#F4F0EA]">
        {selectedUser ? (
          messages.map((msg) => {
            const isSentByMe = msg.senderId === authUser?.id;
            return (
              <div
                key={msg.id}
                className={`flex mb-2 ${
                  isSentByMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-3xl text-lg text-black ${
                    isSentByMe
                      ? "bg-[#D9FDD3]"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {msg.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={msg.image}
                      alt="image"
                      className="max-w-xs rounded mb-1"
                    />
                  ) : null}
                  {msg.content}
                  <span className="block text-sm text-right text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-500">
            Pilih pengguna untuk mulai chat
          </div>
        )}
      </div>

      {/* Area Input Chat */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!text.trim() || !selectedUser) return;
          await sendMessage({ content: text });
          setText("");
        }}
        className="py-1 mb-5 border-t h-[70px] border-gray-100 bg-white flex items-center space-x-4 rounded-full mx-5"
      >
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 pl-5 cursor-pointer"
        >
          <Paperclip className="h-8 w-8" />
        </button>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ketik pesan"
          className="px-3 py-0 rounded-2xl h-14 text-lg xl:text-lg border-none focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:outline-none transition-none placeholder:text-xl"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-14 flex items-center justify-center mr-2 p-0 cursor-pointer"
        >
          <Send className="h-7 w-7" />
        </button>
      </form>
    </div>
  );
}
