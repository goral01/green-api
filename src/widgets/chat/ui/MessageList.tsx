import {
    Box,
    Typography,
} from "@mui/material";

import {
    MessageBubble,
    type Message,
} from "@/entities/message";

interface MessageListProps {
    messages: Message[];
}

export function MessageList({
    messages,
}: MessageListProps) {
    return (
        <Box
            sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                backgroundColor: "#f3f6f8",
            }}
        >
            {messages.length === 0 && (
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography color="text.secondary">
                        Сообщений пока нет
                    </Typography>
                </Box>
            )}

            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}
        </Box>
    );
}