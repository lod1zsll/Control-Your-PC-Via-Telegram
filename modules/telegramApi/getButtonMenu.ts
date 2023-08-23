import { Markup } from "telegraf";

export const mainMenu = [
    ["Получить мой ID"],
    ["Скриншот📷", "Открыть ссылку🔗"],
    ["Система🖥", "Информацияℹ️"]
];

export const systemMenu = [
    ["Выключить компьютер🔴", "Отменить выключение❌"],
    ["Выйти из системы🏃", "Заблокировать систему🔒"],
    ["Очистить корзину🗑"]
];

export const infoMenu = [
    ["Получить IP📶", "Получить время работы комьютера",]
]

export default function (menu) {
    return Markup.keyboard(menu).resize();
}

export function getOneTimeButtonMenu(menu) {

    return Markup.keyboard(menu).oneTime().resize();
}