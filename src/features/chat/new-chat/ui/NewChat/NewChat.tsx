import { Box, Button, TextField } from "@mui/material";
import { useCreateChat } from "../../model/useCreateChat";

interface NewChatProps {
    onCreateChat: (phone: string) => void | Promise<void>;
}

export function NewChat({ onCreateChat }: NewChatProps) {
    const {
        phone,
        setPhone,
        creating,
        handleSubmit,
    } = useCreateChat({ onCreateChat });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                gap: 1,
                p: 2,
                borderBottom: "1px solid #e5e7eb",
            }}
        >
            <TextField
                size="small"
                fullWidth
                label="Номер телефона"
                placeholder="79991234567"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={creating}
            >
                {creating ? "..." : "Создать"}
            </Button>
        </Box>
    );
}