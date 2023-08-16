import { Markup } from "telegraf";

const menu = [
    ["Получить мой ID",],
        ["Скриншот📷", "Очистить корзину🗑"],
]

export default function () {
    return Markup.keyboard(menu).resize();
}

export function getOneTimeButtonMenu() {
    return Markup.keyboard(menu).oneTime().resize();
}