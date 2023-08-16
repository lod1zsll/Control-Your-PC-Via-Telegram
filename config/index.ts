import fs from "fs";
import path from "path";
import { Telegraf } from "telegraf";

import { TelegramSession, IConfig, IConfigJSON } from "../classfields";
import { TMysqlData, BotContext } from "../classfields";
import telegramApi from "../modules/telegramApi";
import { IMC } from "..";


export default function (Server: IMC) {
    const config = {
        limits: {
            fieldNameSize: 36, // Max field name size in bytes
            fieldSize: 100, // Max field value size in bytes
            fields: 10, // Max number of non-file fields
            fileSize: 1024 * 1024 * 30, // 30 mb // For multipart forms, the max file size in bytes
            files: 1, // Max number of file fields
            headerPairs: 2000, // Max number of header key=>value pairs
        }
    } as IConfig;

    const pathToConfig = path.join(Server.dirName + "/config/config.json");

    try {
        const configJSON = JSON.parse(fs.readFileSync(pathToConfig, "utf8"));

        config.chat_id = configJSON.chat_id;
        config.bot_token = configJSON.bot_token;
    } catch (err) {
        console.error(err);
        console.error("Невозможно прочитать файл: " + pathToConfig);
    }

    function saveConfigFile({ chat_id, bot_token }: IConfigJSON): void {
        fs.writeFileSync(pathToConfig, JSON.stringify({
            limits: {
                fieldNameSize: 36,
                fieldSize: 100,
                fields: 10,
                fileSize: 1024 * 1024 * 30,
                files: 1,
                headerPairs: 2000,
            },
            bot_token,
            chat_id: Number(chat_id)
        }));

        if (bot_token !== "" && !!bot_token && !!chat_id && !Server.isBotActive) {
            Server.isBotActive = true;
            Server.bot = new Telegraf<BotContext<TelegramSession>>(config.bot_token);
            telegramApi(Server);
        };
    };

    function get(): IConfig {
        return config;
    };

    function setChatId(chat_id: number): TMysqlData<number> {
        try {
            config.chat_id = chat_id;
            saveConfigFile({ chat_id: chat_id, bot_token: config.bot_token });
            return { success: true, data: config.chat_id }
        } catch (error) {
            return { success: false, error }
        }
    };

    function setBotToken(bot_token: string): TMysqlData<number> {
        try {
            config.bot_token = bot_token;
            saveConfigFile({ chat_id: config.chat_id, bot_token: bot_token });
            return { success: true, data: config.chat_id }
        } catch (error) {
            return { success: false, error }
        }

    };

    function setConfig(chat_id: number, bot_token: string): void {
        saveConfigFile({ chat_id, bot_token });
    }

    return { get, setChatId, setBotToken, setConfig };
}