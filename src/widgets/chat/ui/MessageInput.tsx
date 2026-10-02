import {
    Box,
    CircularProgress,
    IconButton,
    TextField,
} from "@mui/material";

interface MessageInputProps {
    text: string;
    setText: (value: string) => void;
    sending: boolean;
    onSend: () => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
}

export function MessageInput({
    text,
    setText,
    sending,
    onSend,
    onKeyDown,
}: MessageInputProps) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                p: 1.5,
                backgroundColor: "#fff",
                borderTop: "1px solid #e5e7eb",
            }}
        >
            <TextField
                fullWidth
                multiline
                maxRows={4}
                size="small"
                placeholder="Напишите сообщение..."
                value={text}
                onChange={(event) => setText(event.target.value)}
                onKeyDown={onKeyDown}
            />

            <IconButton
                color="primary"
                onClick={onSend}
                disabled={!text.trim() || sending}
            >
                {sending ? (
                    <CircularProgress size={22} />
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        fill="currentColor"
                    >
                        <path
                            d="M0 0h24v24H0V0z"
                            fill="none"
                        />
                        <path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" />
                    </svg>
                )}
            </IconButton>
        </Box>
    );
}