"use client";

import { ChatBubble } from "@/components/ChatBubble";
import supabase from "@/config/supabase";
import { formatRelative } from "date-fns";
import { es } from "date-fns/locale";

import { Fragment, useState } from "react";
import { MdRocketLaunch, MdSend } from "react-icons/md";

type Message = {
  time: Date;
  message: string;
  me: boolean;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      time: new Date(),
      message:
        "¡Hola! Soy Clippy, tu asistente virtual. ¿En qué puedo ayudarte?",
      me: false,
    },
  ]);

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;

    if (message) {
      (event.target as HTMLFormElement).reset();

      setMessages((prev) => [
        ...prev,
        { time: new Date(), message, me: true },
        { time: new Date(), message: "fake", me: false },
      ]);

      await supabase.from("chat").insert([{ message }]);
    }
  };

  return (
    <main className="p-4 flex h-screen">
      <div className="w-[260px] prose">
        <div className="flex items-center p-4 gap-2">
          <h2 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent m-0">
            AI CHAT
          </h2>
          <MdRocketLaunch className="text-pink-400" size={20} />
        </div>
      </div>

      <div className="bg-white flex flex-col flex-1 rounded-xl p-4 text-primary-content h-full">
        <div className="flex-1 overflow-auto pb-4 pt-8">
          <div className="mx-auto flex flex-col flex-1 gap-3 text-base md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
            {messages.map((message) => (
              <ChatBubble
                key={message.time.toISOString()}
                name={message.me ? "Tú" : "Asistente"}
                time={formatRelative(message.time, new Date(), { locale: es })}
                message={message.message}
                position={message.me ? "end" : "start"}
                img={message.me ? "/coraje.jpg" : "/clippy.jpg"}
              />
            ))}
          </div>
        </div>

        <div>
          <form
            className="mx-auto flex flex-col flex-1 gap-3 text-base md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]"
            onSubmit={handleSendMessage}
            autoComplete="off"
          >
            <label className="input input-bordered flex items-center gap-2 rounded-full">
              <input
                type="text"
                className="grow text-base-content"
                placeholder="Mensaje"
                name="message"
                autoComplete="off"
              />
              <button className="btn btn-circle btn-sm btn-ghost text-white/80">
                <MdSend />
              </button>
            </label>
          </form>
        </div>
      </div>
    </main>
  );
}
