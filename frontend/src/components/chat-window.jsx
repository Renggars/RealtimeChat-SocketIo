import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MoreVertical, Paperclip, Send } from "lucide-react";
import Image from "next/image";

export default function ChatWindow() {
  const messages = [
    {
      type: "sent",
      content:
        "Ini adalah contoh pesan yang saya kirim. Ini adalah contoh pesan yang saya kirim. Ini adalah contoh pesan yang saya kirim.",
      time: "14:25",
    },
    {
      type: "received",
      content:
        "Ini adalah contoh pesan yang diterima. Ini adalah contoh pesan yang diterima. Ini adalah contoh pesan yang diterima.",
      time: "14:30",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header Chat */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center">
          <Image
            className="rounded-full cursor-pointer"
            src="/foto.jpeg"
            alt="Profile"
            width={50}
            height={50}
            onClick={() => router.push("/profile")}
          />
          <div className="ml-3">
            <h2 className="text-xl text-black font-normal">Akuu (Anda)</h2>
            <p className="text-sm text-gray-600">Terakhir terlihat hari ini</p>
          </div>
        </div>
        {/* Ikon untuk panggilan, video, dll. */}
        <div className="flex space-x-10 text-gray-900 px-5">
          <Search className="h-7 w-7 cursor-pointer hover:text-gray-700" />
          <MoreVertical className="h-7 w-7 cursor-pointer hover:text-gray-700" />
        </div>
      </div>

      {/* Area Pesan */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#F4F0EA]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2  ${
              msg.type === "sent" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-3xl text-lg text-black ${
                msg.type === "sent"
                  ? "bg-[#D9FDD3]"
                  : "bg-white border border-gray-200"
              }`}
            >
              {msg.content}
              <span className="block text-sm text-right text-gray-500 mt-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Area Input Chat */}
      <div className="py-1 mb-5 border-t h-[70px] border-gray-100 bg-white flex items-center space-x-4 rounded-full mx-5">
        <button className="text-gray-500 hover:text-gray-700 pl-5">
          <Paperclip className="h-8 w-8" />{" "}
        </button>
        <Input
          placeholder="Ketik pesan"
          className="px-3 py-0 rounded-2xl h-14 text-lg xl:text-lg border-none focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:outline-none transition-none placeholder:text-xl"
        />
        <button className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-14 flex items-center justify-center mr-2 p-0">
          <Send className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}
