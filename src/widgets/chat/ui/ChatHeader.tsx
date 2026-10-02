import { Box, Typography } from "@mui/material";

interface ChatHeaderProps {
    title: string;
}

export function ChatHeader({
    title,
}: ChatHeaderProps) {
    return (
        <Box
            sx={{
                height: 64,
                display: "flex",
                alignItems: "center",
                px: 2,
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: "#fff",
            }}
        >
            <Box>
                <Typography sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            </Box>
        </Box>
    );
}