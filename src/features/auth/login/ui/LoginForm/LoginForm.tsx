import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useLoginForm } from "../../model/useLoginForm";

interface LoginFormProps {
    onLogin: (idInstance: string, apiTokenInstance: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
    const {
        idInstance,
        apiToken,
        setIdInstance,
        setApiToken,
        handleSubmit,
    } = useLoginForm(onLogin);

    return (
        <Paper
            elevation={3}
            sx={{
                width: "100%",
                maxWidth: 420,
                p: 4,
                borderRadius: 3,
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Telegram Chat
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Подключение к GREEN-API
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <TextField
                    label="ID Instance"
                    value={idInstance}
                    onChange={(e) => setIdInstance(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="API Token Instance"
                    type="password"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    fullWidth
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                >
                    Войти
                </Button>
            </Box>
        </Paper>
    );
}