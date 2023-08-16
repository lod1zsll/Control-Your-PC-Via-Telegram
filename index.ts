import { Telegraf } from "telegraf";
import path from "path";
import fs from "fs";
import colors from "colors";
import fastify, { FastifyInstance } from "fastify";

import { TelegramSession, BotContext } from "./classfields";
import saveScreenshot from "./modules/saveScreenshot";
import telegramApi from "./modules/telegramApi";
import web from "./modules/web";
import api from "./modules/web/api";
import config from "./config";

export class IMC {
    bot: Telegraf<BotContext<TelegramSession>>;
    dirName: string;
    server: FastifyInstance;
    PORT: string;
    isBotActive: boolean;

    async init() {
        const { chat_id, bot_token } = config(this).get();

        if (bot_token !== "" && !!bot_token && !!chat_id && !this.isBotActive) {
            this.isBotActive = true;
            this.bot = new Telegraf<BotContext<TelegramSession>>(bot_token);
            telegramApi(this);
        };

        web(this);
        api(this);
    }

    allCopy() {
        const isImageDirCreate = fs.existsSync(path.join(this.dirName + "/images"));
        if (!isImageDirCreate) {
            fs.mkdirSync(path.join(this.dirName + "/images"));
        };

        const isStaticDir = fs.existsSync(this.dirName + "/static");
        if (!isStaticDir) {
            console.error(`Папки static ${colors.red("не существует")}\nПропишите ${colors.yellow("npm run build")} в консоль `);
            return false;
        };

        const isConfigJSON = fs.existsSync(this.dirName + "/config/config.json");
        if (!isConfigJSON) {
            fs.writeFileSync(this.dirName + "/config/config.json", '{"chat_id":0,"bot_token":""}')
        };

        return true;
    }

    constructor() {
        this.dirName = __dirname;

        const isAllCopy = this.allCopy();
        if (!isAllCopy) return;

        this.bot;
        this.server = fastify();
        this.PORT = "6333";
        this.init();
    }
};

new IMC();