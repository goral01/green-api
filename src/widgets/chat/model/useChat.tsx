import { useCallback, useState } from "react";

import type { Message } from "@/entities/message";

export function useChat() {
    const [messagesByChat, setMessagesByChat] = useState<
        Record<string, Message[]>
    >({});

    const addMessage = useCallback(
        (chatId: string, message: Message) => {
            setMessagesByChat((prev) => ({
                ...prev,
                [chatId]: [...(prev[chatId] ?? []), message],
            }));
        },
        [],
    );

    return {
        messagesByChat,
        addMessage,
    };
}