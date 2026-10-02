import { useState } from "react";

interface UseCreateChatProps {
    onCreateChat: (phone: string) => void | Promise<void>;
}

export function useCreateChat({
    onCreateChat,
}: UseCreateChatProps) {
    const [phone, setPhone] = useState("");
    const [creating, setCreating] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent,
    ) => {
        event.preventDefault();

        const value = phone.trim();

        if (!value || creating) {
            return;
        }

        try {
            setCreating(true);
            await onCreateChat(value);
            setPhone("");
        } finally {
            setCreating(false);
        }
    };

    return {
        phone,
        setPhone,
        creating,
        handleSubmit,
    };
}