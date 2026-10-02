import { useState } from "react";

import {
    sendMessage,
    type GreenApiConfig,
} from "@/shared/api/api";

import type { Message } from "@/entities/message";

interface UseSendMessageProps {
    config: GreenApiConfig;
    chatId: string;
    onMessage: (message: Message) => void;
}

export function useSendMessage({
    config,
    chatId,
    onMessage,
}: UseSendMessageProps) {
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        const message = text.trim();

        if (!message || sending) {
            return;
        }

        try {
            setSending(true);

            await sendMessage(
                config,
                chatId,
                message,
            );

            onMessage({
                id: crypto.randomUUID(),
                text: message,
                sender: "me",
                timestamp: Date.now(),
            });

            setText("");
        } catch (error) {
            console.error(error);
            alert("Не удалось отправить сообщение");
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (
        event: React.KeyboardEvent,
    ) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return {
        text,
        setText,
        sending,
        handleSend,
        handleKeyDown,
    };
}