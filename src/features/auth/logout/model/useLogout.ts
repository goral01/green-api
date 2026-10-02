interface UseLogoutProps {
    onLogout: () => void;
}

export function useLogout({ onLogout }: UseLogoutProps) {
    const handleLogout = () => {
        onLogout();
    };

    return {
        handleLogout,
    };
}