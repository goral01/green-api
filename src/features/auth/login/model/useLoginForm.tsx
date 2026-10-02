import { useState } from "react";

export function useLoginForm(
    onLogin: (idInstance: string, apiTokenInstance: string) => void,
) {
    const [idInstance, setIdInstance] = useState("");
    const [apiToken, setApiToken] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const id = idInstance.trim();
        const token = apiToken.trim();

        if (!id || !token) {
            return;
        }

        onLogin(id, token);
    };

    return {
        idInstance,
        apiToken,
        setIdInstance,
        setApiToken,
        handleSubmit,
    };
}