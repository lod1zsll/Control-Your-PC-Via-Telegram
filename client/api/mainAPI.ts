import { sendPost } from "./sendPost";

export async function getConfig() {
    return await sendPost({
        url: "/api/getConfig",
    })
}

export async function updateTelegramChatId(chat_id: number) {
    return await sendPost({
        url: "/api/telegram/update-chat-id",
        body: { chat_id }
    });
};

export async function updateTelegramBotToken(bot_token: string) {
    return await sendPost({
        url: "/api/telegram/update-bot-token",
        body: { bot_token }
    })
}