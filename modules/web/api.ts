import { randomUUID } from "crypto";
import { IMC } from "../..";
import config from "../../config";

export default async function (Server: IMC) {
    const server = Server.server;

    server.post("/api/getConfig", (req, res) => {

        const {chat_id, bot_token} = config(Server).get();

        res.send({
            success: true,
            data: {
                chat_id: chat_id,
                bot_token: bot_token,
            }
        })
    })

    server.post("/api/telegram/update-chat-id", (req, res) => {
        const body = JSON.parse(!(typeof req.body === "string") ? "" : req.body);

        const chat_id = Number(body.chat_id);

        if (!chat_id) {
            return res.status(400).send({ success: false, error: "chat id is null" });
        }

        const configRes = config(Server).setChatId(chat_id);

        if(configRes.success === false) {
            return res.status(500).send({ success: false, error: configRes.error });
        }

        res.status(200).send({ success: true, data: configRes.data });
    });

    server.post("/api/telegram/update-bot-token", (req, res) => {
        const body = JSON.parse(!(typeof req.body === "string") ? "" : req.body);
        const bot_token = body.bot_token;

        if (!bot_token) {
            return res.status(400).send({ success: false, error: "bot token is null" });
        }

        const configRes = config(Server).setBotToken(bot_token);
        if(configRes.success === false) {
            return res.status(500).send({ success: false, error: configRes.error });
        }

        res.status(200).send({ success: true, data: JSON.stringify(configRes.data) });
    });
};