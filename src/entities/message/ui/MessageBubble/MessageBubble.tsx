import { Box, Paper, Typography } from "@mui/material";
import type { Message } from "../../model/types";

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isMine = message.sender === "me";

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: isMine ? "flex-end" : "flex-start",
                mb: 1,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    px: 1.5,
                    py: 1,
                    maxWidth: "70%",
                    borderRadius: 2,
                    backgroundColor: isMine ? "#e7f3ff" : "#ffffff",
                }}
            >
                <Typography
                    sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                >
                    {message.text}
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        display: "block",
                        textAlign: "right",
                        mt: 0.5,
                    }}
                >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Typography>
            </Paper>
        </Box>
    );
}