import { IMC } from "../../..";
import getButtonMenu, { mainMenu } from "../getButtonMenu";
import config from "../../../config";

export default function (Server: IMC) {
    const bot = Server.bot;

    bot.command(["start", "menu"], async (ctx) => {
        return await ctx.reply("Выберете одну из комманд:", getButtonMenu(mainMenu));
    });
};