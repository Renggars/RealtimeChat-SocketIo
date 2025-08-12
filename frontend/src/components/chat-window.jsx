"use client";

import { Input } from "@/components/ui/input";
import { Search, MoreVertical, Paperclip, Send, Images } from "lucide-react";
import Image from "next/image";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

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
        {imagePreview && (
          <div className="absolute bottom-25 right-8 bg-white rounded-lg shadow-lg p-2 border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="preview"
              className="max-h-56 w-auto object-cover rounded"
            />
            <button
              type="button"
              className="block mt-2 cursor-pointer text-xl font-medium bg-red-500 hover:bg-red-600 text-white rounded-full py-2 px-4"
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Area Input Chat */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!selectedUser) return;
          if (!text.trim() && !imageFile) return;
          await sendMessage({ content: text.trim() || undefined, imageFile });
          setText("");
          setImageFile(null);
          setImagePreview(null);
        }}
        className="py-1 mb-5 border-t h-[70px] border-gray-100 bg-white flex items-center space-x-4 rounded-full mx-5"
      >
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 pl-5 cursor-pointer"
            >
              <Paperclip className="h-8 w-8" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 space-y-2" sideOffset={30}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-4 p-2 px-4 rounded hover:bg-gray-100 w-full text-left text-xl cursor-pointer"
            >
              <Images className="h-7 w-7 text-blue-500" />
              <span>Photo</span>
            </button>
          </PopoverContent>
        </Popover>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
              const url = URL.createObjectURL(file);
              setImagePreview(url);
            }
          }}
        />

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
