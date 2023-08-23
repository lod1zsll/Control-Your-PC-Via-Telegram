import nircmd from "nircmd";
import openURL from "opener";
import { execSync } from "child_process";
import os from "os";

import { IMC } from "../../../..";
import saveScreenshot from "../../../saveScreenshot";
import getButtonMenu, {mainMenu, systemMenu, infoMenu} from "../../getButtonMenu";
import getTexts from "./getText";
import isURL from "../../../isUrl";
import getIPv4, { getIPv6 } from "../../../getIp";
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

            if (!photo) return;

            return await ctx.replyWithPhoto({ source: photo }, getButtonMenu(mainMenu));
        };

        if (textRU === "очистить корзину") {
            try {
                await nircmd("emptybin");
            } catch (err) {
                console.error(err);
                return await ctx.replyWithHTML("Корзина <code>не</code> была очищена <i><b>(ошибка)</b></i>");
            }
            return await ctx.replyWithHTML("Корзина была очищена <b>успешно</b>");
        };

        if (textENRU === "получить мой id") {
            const chat_id = ctx.message.chat.id.toString();

            return await ctx.replyWithHTML(`Твой ID: <code>${chat_id}</code>`);
        };

        if (textRU === "открыть ссылку") {
            return await ctx.reply("Отправьте ссылку...")
        };

        if (textRU === "выключить компьютер") {
            try {
                execSync("shutdown /s /t 30");
            } catch (err) {
                console.error(err);
                return await ctx.replyWithHTML("<code>Не</code> получилось выключить компьютер <i><b>(ошибка)</b></i>");
            }

            
            return await ctx.replyWithHTML("Компьютер <b>выключиться</b> <i>через 30 секунд</i>");
        };

        if (textRU === "отменить выключение") {
            try {
                execSync("shutdown /a");
            } catch (err) {
                console.error(err);
                return await ctx.replyWithHTML("<code>Не</code> получилось отменить выключение <i><b>(ошибка)</b></i>");
            }
            
            return await ctx.replyWithHTML("Отмена выключения выполнена <b>успешно!</b>");
        };

        if (textRU === "заблокировать систему") {
            await ctx.replyWithHTML("<b>Успешно!</b>");
            execSync("%SystemRoot%\\system32\\rundll32.exe USER32.DLL LockWorkStation");
            return;
        };

        if (textRU === "получить время работы комьютера") {
            const ut = os.uptime();
            let utMinutes = ut / 60;
            let utHours = utMinutes / 60;
            const utDays = Math.floor(utHours / 24);
            const utSeconds = Math.floor(ut % 60);

            utMinutes = Math.floor(utMinutes % 60);
            utHours = Math.floor(utHours);

            let utText = `${utSeconds} сек.`;
            if (utMinutes) utText = `${utMinutes} мин. ` + utText;
            if (utHours) utText = `${utHours} ч. ` + utText;
            if (utDays) utText = `${utDays} д. ` + utText;

            return await ctx.replyWithHTML(`Время работы бота — <code>${utText}</code>`);
        };

        if (textRU === "информация") {
            return await ctx.replyWithHTML(`Выберете один из пунктов:`, getButtonMenu(infoMenu));
        };

        if (textRU === "система") {
            return await ctx.replyWithHTML(`Выберете один из пунктов:`, getButtonMenu(systemMenu));
        };

        if (textRU === "выйти из системы") {
            nircmd("exitwin logoff")

            return await ctx.replyWithHTML(`<b>Успешно!</b>`);
        };

        if (textENRU === "получить ip") {
            const ipv4 = await getIPv4();
            const ipv6 = await getIPv6();

            return await ctx.replyWithHTML(`IPv4-Адрес вашего ПК — <code>${ipv4}</code>\nIPv6-Адрес вашего ПК:\n<code>${ipv6}</code>`);
        };

        if (isURL(text.replace(/ /g, ""))) {
            openURL(text.replace(/ /g, ""));

            return await ctx.replyWithHTML("Ссылка открыта <b>успешно</b>");
        };

        return await ctx.replyWithHTML("Такой команды <b>не существует</b>", getButtonMenu(mainMenu));
    })



}