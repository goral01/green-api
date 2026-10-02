import { useEffect, useRef } from "react";

import {
    deleteNotification,
    receiveNotification,
    type GreenApiConfig,
} from "@/shared/api/api";

import type { Message } from "@/entities/message";
import { isMessageForChat } from "@/shared/lib/chatId";

interface UseReceiveMessagesProps {
    config: GreenApiConfig;
    chatId: string;
    contactPhone: string;
    onMessage: (message: Message) => void;
}

export function useReceiveMessages({
    config,
    chatId,
    contactPhone,
    onMessage,
}: UseReceiveMessagesProps) {
    const onMessageRef = useRef(onMessage);

    onMessageRef.current = onMessage;

    useEffect(() => {
        let stopped = false;

        const receiveMessages = async () => {
            if (stopped) {
                return;
            }

            try {
                const notification = await receiveNotification(config);

                console.log("1 RECEIVE:", notification);

                if (stopped || !notification) {
                    return;
                }

                const body = notification.body;

                if (
                    body.typeWebhook === "incomingMessageReceived" &&
                    body.messageData?.typeMessage === "textMessage"
                ) {
                    const incomingText =
                        body.messageData.textMessageData?.textMessage;

                    if (
                        incomingText &&
                        isMessageForChat(
                            chatId,
                            contactPhone,
                            body.senderData,
                        )
                    ) {
                        onMessageRef.current({
                            id:
                                body.idMessage ??
                                crypto.randomUUID(),

                            text: incomingText,

                            sender: "other",

                            timestamp:
                                (body.timestamp ??
                                    Date.now() / 1000) *
                                1000,
                        });
                    }
                }

                await deleteNotification(
                    config,
                    notification.receiptId,
                );
            } catch (error) {
                console.error(error);
            }
        };

        const loop = async () => {
            while (!stopped) {
                await receiveMessages();
            }
        };

        loop();

        return () => {
            stopped = true;
        };
    }, [config, chatId, contactPhone]);
}