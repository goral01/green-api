export interface GreenApiSenderData {
    chatId?: string;
    sender?: string;
    senderPhoneNumber?: number;
}

export function normalizePhoneDigits(digits: string): string {
    const onlyDigits = digits.replace(/\D/g, "");

    if (
        onlyDigits.length === 11 &&
        onlyDigits.startsWith("8")
    ) {
        return `7${onlyDigits.slice(1)}`;
    }

    return onlyDigits;
}

export function extractPhoneDigits(
    value: string | number | undefined,
): string {
    if (value == null) {
        return "";
    }

    let raw = String(value).trim();

    if (raw.startsWith("[") && raw.endsWith("]")) {
        raw = raw.slice(1, -1);
    }

    const userPart = raw.includes("@")
        ? raw.split("@")[0]
        : raw;

    return normalizePhoneDigits(userPart);
}

export function phonesMatch(
    first: string,
    second: string,
): boolean {
    const a = extractPhoneDigits(first);
    const b = extractPhoneDigits(second);

    return Boolean(a && b && a === b);
}

function greenApiIdsEqual(
    first?: string,
    second?: string,
): boolean {
    if (!first || !second) {
        return false;
    }

    return (
        first.trim().toLowerCase() ===
        second.trim().toLowerCase()
    );
}

export function isMessageForChat(
    openChatId: string,
    contactPhone: string,
    senderData?: GreenApiSenderData,
): boolean {
    if (!senderData) {
        return false;
    }

    if (
        greenApiIdsEqual(senderData.chatId, openChatId) ||
        greenApiIdsEqual(senderData.sender, openChatId)
    ) {
        return true;
    }

    const openPhone = extractPhoneDigits(contactPhone);

    if (!openPhone) {
        return false;
    }

    const candidates = [
        senderData.chatId,
        senderData.sender,
        senderData.senderPhoneNumber,
    ];

    return candidates.some((value) =>
        phonesMatch(String(value ?? ""), openPhone),
    );
}

export function phoneToDisplayLabel(
    phoneDigits: string,
): string {
    return phoneDigits.replace(/\D/g, "");
}
