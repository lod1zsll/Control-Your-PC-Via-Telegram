import React, { useState, useEffect } from "react";
import { useStorageProvider } from "../../providers/StorageProvider";
import { useInfoProvider } from "../../providers/InfoProvider";
import InfoCard from "./InfoCard";
import { ToastContainer, toast as notificationAlert } from "react-toastify";

export default function Main() {
    const storageProvider = useStorageProvider();
    const infoProvider = useInfoProvider();

    const [chatId, setChatId] = useState("");
    const [botToken, setBotToken] = useState("");


    function notification(res) {
        if (res.success) {
            notificationAlert("Успешно!");
        }

        if (res.success === false) {
            notificationAlert("Ошибка: " + res.error);
        };
    };

    function botTokenHandler(e) {
        setBotToken(e.target.value.replace(/[А-ЯЁа-яё]/g, ""));
    };
    function updateBotToken() {
        infoProvider.updateBotToken(botToken).then(notification);
    };

    function chatIdHandler(e) {
        setChatId(e.target.value.replace(/[^1-90]/g, ""));
    };
    function updateChatId() {
        infoProvider.updateChatId(chatId).then(notification);
    };


    return <main className="w-100 d-flex align-items-center flex-column my-3">
        <ToastContainer position="top-right"
            autoClose={2500}
            hideProgressBar={false} newestOnTop={false} rtl={false} draggable={false}
            closeOnClick pauseOnFocusLoss pauseOnHover
            theme="dark" />



        <div className="w-75 ps-1 d-flex flex-start ">
            <a className="link" target="_blank" href="https://helpdesk.bitrix24.ru/open/17538378">Как получить токен</a>
        </div>
        <InfoCard<string> title="Текущий токен:" placeholder="Ваш токен бота..."
            info={botToken} apiInfo={infoProvider.botToken}
            isButtonDisabled={!botToken || !botToken.split("").includes(":")}
            infoHandler={botTokenHandler} updateInfo={updateBotToken} />


        <div className="w-75 mt-3 ps-1 d-flex flex-start ">
            <a className="link" target="_blank" href="https://t.me/username_to_id_bot?start=lod1z">Получить ID</a>
        </div>
        <InfoCard<number> title="Текущий id чата:" placeholder="Ваш ID чата...."
            info={chatId} apiInfo={infoProvider.chatId} isButtonDisabled={!chatId}
            infoHandler={chatIdHandler} updateInfo={updateChatId} />
    </main>
};