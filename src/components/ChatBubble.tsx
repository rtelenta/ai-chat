"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

interface ChatBubbleProps {
  name: string;
  time: string;
  message: string;
  position?: "start" | "end";
  img?: string;
}

export function ChatBubble({
  name,
  time,
  message,
  position = "start",
  img = "https://i.pravatar.cc/40?img=32",
}: ChatBubbleProps) {
  const isFake = name === "Asistente" && message === "fake";
  const [isLoadingFake, setIsLoadingFake] = useState(isFake);

  useEffect(() => {
    if (isFake) {
      setTimeout(() => {
        setIsLoadingFake(false);
      }, 1000);
    }

    return () => {
      setIsLoadingFake(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsx("chat", position === "start" ? "chat-start" : "chat-end")}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt={name} src={img} />
        </div>
      </div>
      <div className="chat-header flex items-center gap-2 mb-1">
        {name}
        <time className="text-xs opacity-50">{time}</time>
      </div>

      {!isFake && <div className="chat-bubble">{message}</div>}

      {isFake && (
        <div className="chat-bubble flex items-center">
          {isLoadingFake ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            "Lo siento, no tengo la respuesta a esa pregunta. ¿Puedes intentar con otra consulta o contactar a uno de nuestros expertos legales?"
          )}
        </div>
      )}
    </div>
  );
}
