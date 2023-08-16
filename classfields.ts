import { Context } from "telegraf";

export interface BotContext<I> extends Context {
    session: {
        heyCounter: number
    };
}   

export interface TelegramSession {
    messageSessionCount: number
}

export interface IConfig {
    limits: {
        fieldNameSize: number;
        fieldSize: number;
        fields: number;
        fileSize: number;
        files: number;
        headerPairs: number;
    };
    chat_id: number;
    bot_token: string;
};
export interface IConfigJSON {
    bot_token: string;
    chat_id: number
}

interface IMysqlDataSuccess<T> {
    success: true,
    data?: T
}

interface IMysqlDataFailed {
    success: false,
    error: string
}
export type TMysqlData<Y> = IMysqlDataSuccess<Y> | IMysqlDataFailed;
