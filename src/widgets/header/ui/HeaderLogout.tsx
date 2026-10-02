import { Box } from "@mui/material";

import { LogoutButton } from "@/features/auth/logout";

interface HeaderProps {
    onLogout: () => void;
}

export function HeaderLogout({ onLogout }: HeaderProps) {
    return (
        <Box>
            <LogoutButton onLogout={onLogout} />
        </Box>
    );
}