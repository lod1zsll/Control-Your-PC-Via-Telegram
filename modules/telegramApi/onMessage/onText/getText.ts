export default function (ctx) {

    const text = ctx.message.text.toLowerCase();
    const textENRU = ctx.message.text.toLowerCase().replace(/[^А-ЯЁа-яёA-Za-z ]/g, "");
    const textRU = ctx.message.text.toLowerCase().replace(/c/g, "с").replace(/[^А-ЯЁа-яё ]/g, "");

    return { text, textENRU, textRU };
};

export function getText(ctx) {
    return ctx.message.text.toLowerCase();
}

export function getTextENRU(ctx) {
    return ctx.message.text.toLowerCase().replace(/[^А-ЯЁа-яёA-Za-z ]/g, "");
}

export function getTextRU(ctx) {
    return ctx.message.text.toLowerCase().replace(/c/g, "с").replace(/[^А-ЯЁа-яё ]/g, "");
}