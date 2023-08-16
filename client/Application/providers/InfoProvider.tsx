import React, { useState, useContext, createContext } from "react";
import { getConfig, updateTelegramBotToken, updateTelegramChatId } from "../../api/mainAPI";
import { TMysqlData } from "../modules/classfields";

interface IInfoProvider {
    chatId: number;
    botToken: string;
    updateChatId: (number) => Promise<TMysqlData<number>>;
    updateBotToken: (string) => Promise<TMysqlData<string>>;
};

const InfoContext = createContext<IInfoProvider>({} as IInfoProvider);

export function InfoProvider({ children }: any) {

    const [chatId, setChatId] = useState<number>(0);
    const [botToken, setBotToken] = useState<string>("");

    getConfig().then(res => {

        if (!res.success) return;

        setChatId(res.data.chat_id);
        setBotToken(res.data.bot_token);

    });

    async function updateChatId(chatId: number): Promise<TMysqlData<number>> {
        const res = await updateTelegramChatId(chatId);
        
        if(res.success === false) {
            return {success: false, error: res.error};
        }


        setChatId(chatId);
        return {success: true, data: res.data};
    }

    async function updateBotToken(botToken: string): Promise<TMysqlData<string>> {
        const res = await updateTelegramBotToken(botToken);
        
        if(res.success === false) {
            return {success: false, error: res.error};
        }

        setBotToken(botToken);
        return {success: true, data: res.data};
    }

    let value: IInfoProvider = {
        chatId,
        botToken,
        updateChatId,
        updateBotToken
    };

    return <InfoContext.Provider value={value as any}>{children}</InfoContext.Provider>;
}

export function useInfoProvider(): IInfoProvider {
    return useContext(InfoContext);
}