const API_URL = "https://api.green-api.com";
// https://4100.api.green-api.com
// idInstance = "410022753458"
// apiTokenInstance = "d5036552d3b04639913ebce0555e446c957664d2339a433fa5"
// recieve = "curl --location "https://api.green-api.com/waInstance410022752101/receiveNotification/80fba24749844d1481a5805219ed144b003a071d50184ed1bb?receiveTimeout=5"
export interface GreenApiConfig {
  idInstance: string;
  apiTokenInstance: string;
}

export interface CheckTelegramResponse {
  exist: boolean;
  chatId: string;
  phoneNumber?: string;
  username?: string;
  force?: boolean;
}

export interface ReceiveNotificationResponse {
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage?: string;
    timestamp?: number;

    senderData?: {
      chatId?: string;
      chatName?: string;
      sender?: string;
      senderName?: string;
      senderPhoneNumber?: number;
    };

    messageData?: {
      typeMessage?: string;

      textMessageData?: {
        textMessage?: string;
      };
    };
  };
}

export async function checkAccount(
  config: GreenApiConfig,
  phoneDigits: string,
): Promise<CheckTelegramResponse> {
  const url =
    `${API_URL}/waInstance${config.idInstance}` +
    `/checkAccount/${config.apiTokenInstance}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber: +phoneDigits.replace(/\D/g, ""),
      force: true
    }),
  });

  if (!response.ok) {
    const error = await response.text();

    throw new Error(error || "Ошибка проверки номера");
  }

  return response.json();
}

export async function sendMessage(
    config: GreenApiConfig,
    chatId: string,
    message: string,
) {
    const url =
        `${API_URL}/waInstance${config.idInstance}` +
        `/sendMessage/${config.apiTokenInstance}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chatId,
            message,
        }),
    });

    const text = await response.text();

    if (!response.ok) {
        throw new Error(text || "Ошибка отправки сообщения");
    }

    return text ? JSON.parse(text) : null;
}

export async function receiveNotification(
  config: GreenApiConfig
): Promise<ReceiveNotificationResponse | null> {
  const url =
    `${API_URL}/waInstance${config.idInstance}` +
    `/receiveNotification/${config.apiTokenInstance}` +
    `?receiveTimeout=5`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Ошибка получения сообщений");
  }

  const text = await response.text();

  // Если за timeout ничего не пришло
  if (!text) {
    return null;
  }

  return JSON.parse(text);
}

export async function deleteNotification(
  config: GreenApiConfig,
  receiptId: number
) {
  const url =
    `${API_URL}/waInstance${config.idInstance}` +
    `/deleteNotification/${config.apiTokenInstance}/${receiptId}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Ошибка удаления уведомления");
  }

  return response.json();
}