export interface Message {
    id: string;
    sender: "me" | "other";
    text: string;
    timestamp: number;
}