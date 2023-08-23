import { session, Telegraf } from "telegraf";
import { IMC } from "../..";
import config from "../../config";

import onMessage from "./onMessage";
import axios from "axios";
import { callback } from "telegraf/typings/button";

export default async function (Server: IMC) {
    const bot = Server.bot;

    console.log("Бот запущен!");

    if (!bot) {
        return
    };

    bot.use(session());
    bot.use((ctx, next) => {
        const start = Date.now();
        return next().then(() => {
            const ms = Date.now() - start;
            console.log(`Время ответа: ${ms}ms`,);
        });
    });



    bot.use((ctx, next) => {
        if (ctx.message !== undefined && ctx.message.chat.id === Number(config(Server).get().chat_id)) {
            return next();
        };

        return ctx.replyWithHTML("Ваш аккаунт <b>не привязан</b> к компьютеру");
    });
    onMessage(Server);

    bot.launch();

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}