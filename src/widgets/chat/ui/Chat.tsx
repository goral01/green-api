import { useCallback } from "react";
import { Box } from "@mui/material";

import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

import { useReceiveMessages } from "@/features/chat/recieve-messsage";
import { useSendMessage } from "@/features/chat/send-message";

import type { GreenApiConfig } from "@/shared/api/api";
import type { Message } from "@/entities/message";

interface ChatProps {
    config: GreenApiConfig;
    chatId: string;
    contactPhone: string;
    title: string;
    messages: Message[];
    addMessage: (chatId: string, message: Message) => void;
}

export function Chat({
    config,
    chatId,
    contactPhone,
    title,
    messages,
    addMessage,
}: ChatProps) {
    const appendMessage = useCallback(
        (message: Message) => {
            addMessage(chatId, message);
        },
        [addMessage, chatId],
    );

    useReceiveMessages({
        config,
        chatId,
        contactPhone,
        onMessage: appendMessage,
    });

    const {
        text,
        setText,
        sending,
        handleSend,
        handleKeyDown,
    } = useSendMessage({
        config,
        chatId,
        onMessage: appendMessage,
    });

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <ChatHeader title={title} />

            <MessageList
                key={chatId}
                messages={messages}
            />

            <MessageInput
                text={text}
                setText={setText}
                sending={sending}
                onSend={handleSend}
                onKeyDown={handleKeyDown}
            />
        </Box>
    );
}