import { Box } from "@mui/material";
import { LoginForm } from "@/features/auth/login";

export function LoginPage() {
    const handleLogin = (
        idInstance: string,
        apiTokenInstance: string,
    ) => {
        console.log(idInstance, apiTokenInstance);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f7fa",
                p: 2,
            }}
        >
            <LoginForm onLogin={handleLogin} />
        </Box>
    );
}