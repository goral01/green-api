import { Box, Typography } from "@mui/material";

import { NewChat } from "@/features/chat/new-chat";

interface ChatListProps {
    chats: string[];
    chatTitles: Record<string, string>;
    chatId: string | null;
    onCreateChat: (phone: string) => void | Promise<void>;
    onSelectChat: (chatId: string) => void;
}

export function ChatList({
    chats,
    chatTitles,
    chatId,
    onCreateChat,
    onSelectChat,
}: ChatListProps) {
    return (
        <Box
            sx={{
                width: 320,
                borderRight: "1px solid #e5e7eb",
                backgroundColor: "#fff",
            }}
        >
            <NewChat
                onCreateChat={onCreateChat}
            />

            {chats.map((id) => (
                <Box
                    key={id}
                    onClick={() => onSelectChat(id)}
                    sx={{
                        p: 2,
                        cursor: "pointer",
                        backgroundColor:
                            id === chatId
                                ? "#f0f4f8"
                                : "transparent",
                        "&:hover": {
                            backgroundColor: "#f8fafc",
                        },
                    }}
                >
                    <Typography sx={{ fontWeight: 500 }}>
                        {chatTitles[id] ?? id.replace(/@.*/, "")}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}