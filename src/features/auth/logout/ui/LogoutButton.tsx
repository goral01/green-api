import { Button } from "@mui/material";

import { useLogout } from "../model/useLogout";

interface LogoutButtonProps {
    onLogout: () => void;
}

export function LogoutButton({
    onLogout,
}: LogoutButtonProps) {
    const { handleLogout } = useLogout({
        onLogout,
    });

    return (
        <Button
            color="inherit"
            onClick={handleLogout}
        >
            Выйти
        </Button>
    );
}