import { useState } from "react";
import { Box, Typography } from "@mui/material";

import { LoginForm } from "@/features/auth/login";
import { HeaderLogout } from "@/widgets/header";
import { ChatList } from "@/widgets/chat-list/ui/ChatList";
import { Chat } from "@/widgets/chat/ui/Chat";
import { useChat } from "@/widgets/chat";

import { checkAccount } from "@/shared/api/api";
import type { GreenApiConfig } from "@/shared/api/api";
import {
    extractPhoneDigits,
    normalizePhoneDigits,
    phoneToDisplayLabel,
} from "@/shared/lib/chatId";

function App() {
    const [config, setConfig] =
        useState<GreenApiConfig | null>(null);

    const [chats, setChats] = useState<string[]>([]);
    const [chatTitles, setChatTitles] = useState<
        Record<string, string>
    >({});
    const [chatId, setChatId] =
        useState<string | null>(null);

    const { messagesByChat, addMessage } = useChat();

    const handleLogin = (
        idInstance: string,
        apiTokenInstance: string,
    ) => {
        setConfig({
            idInstance,
            apiTokenInstance,
        });
    };

    const handleCreateChat = async (phone: string) => {
        if (!config) {
            return;
        }

        const normalizedPhone = normalizePhoneDigits(
            phone.replace(/\D/g, ""),
        );

        if (!normalizedPhone) {
            return;
        }

        try {
            const check = await checkAccount(
                config,
                normalizedPhone,
            );

            if (!check.exist) {
                alert(
                    "Этот номер не зарегистрирован в Telegram",
                );
                return;
            }

            const apiChatId = check.chatId;
            const title =
                phoneToDisplayLabel(
                    extractPhoneDigits(
                        check.phoneNumber,
                    ) || normalizedPhone,
                );

            setChats((prev) =>
                prev.includes(apiChatId)
                    ? prev
                    : [...prev, apiChatId],
            );
            setChatTitles((prev) => ({
                ...prev,
                [apiChatId]: title,
            }));
            setChatId(apiChatId);
        } catch (error) {
            console.error(error);
            alert("Не удалось проверить номер телефона");
        }
    };

    const handleLogout = () => {
        setConfig(null);
        setChats([]);
        setChatTitles({});
        setChatId(null);
    };

    if (!config) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <LoginForm
                    onLogin={handleLogin}
                />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <HeaderLogout
                onLogout={handleLogout}
            />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    minHeight: 0,
                }}
            >
                <ChatList
                    chats={chats}
                    chatTitles={chatTitles}
                    chatId={chatId}
                    onCreateChat={handleCreateChat}
                    onSelectChat={setChatId}
                />

                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    {chatId ? (
                        <Chat
                            key={chatId}
                            config={config}
                            chatId={chatId}
                            contactPhone={
                                chatTitles[chatId] ??
                                extractPhoneDigits(chatId)
                            }
                            title={
                                chatTitles[chatId] ??
                                chatId.replace(/@.*/, "")
                            }
                            messages={
                                messagesByChat[chatId] ?? []
                            }
                            addMessage={addMessage}
                        />
                    ) : (
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography color="text.secondary">
                                Введите номер телефона,
                                чтобы начать чат
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default App;