import { IMC } from "../../../..";

import nircmd from "nircmd";

import saveScreenshot from "../../../saveScreenshot";
import getButtonMenu from "../../getButtonMenu";
import getTexts from "./getText";

export default async function (Server: IMC) {
    const bot = Server.bot;

    bot.on("text", async (ctx) => {

        const { text, textRU, textENRU } = getTexts(ctx);

        if (textRU === "скриншот") {
            let photo = null
            try {
                photo = await saveScreenshot(Server);
            } catch (err) {
                console.error(err);
            }

            if(!photo) return;

            return await ctx.replyWithPhoto({ source: photo }, getButtonMenu());
        };

        if (textRU === "очистить корзину") {
            try {
                await nircmd("emptybin");
            } catch (err) {
                console.error(err);
            }
            return await ctx.reply("Корзина была очищена");
        };

        if (text === "получить мой id") {
            const chat_id = ctx.message.chat.id.toString();

            return await ctx.replyWithMarkdownV2(`Твой ID: \`${chat_id}\``);
        };

        return await ctx.replyWithMarkdownV2("Такой команды *не существует*", getButtonMenu());
    })



}