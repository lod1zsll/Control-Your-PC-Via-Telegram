import { IMC } from "../../..";
import getButtonMenu from "../getButtonMenu";

export default function (Server: IMC) {
    const bot = Server.bot;

    bot.command(["start", "menu"], async (ctx) => {
        if (ctx.message.chat.id !== 724217808) {
            return await ctx.replyWithMarkdownV2("Ваш аккаунт *не привязан* к компьютеру");
        };

        return await ctx.reply("Выберете одну из комманд:", getButtonMenu());
    });
};