import React from "react";

interface IInfoCardProps<T> {
    title: string;
    placeholder: string;
    info: string;
    apiInfo: T;
    isButtonDisabled: boolean
    infoHandler: (e) => void;
    updateInfo: (T) => void;
}

export default function InfoCard<T>({ title, placeholder, info, apiInfo, isButtonDisabled, infoHandler, updateInfo}: IInfoCardProps<T>) {

    return <div className="my-2 w-75 d-flex align-items-center">
        <input type="text" className="w-50 input-form"
            onChange={infoHandler}
            value={info.toString()}
            placeholder={placeholder} />

        <button className="ms-2 btn btn-success" onClick={updateInfo} disabled={isButtonDisabled}>Подтвердить</button>
        <p className="ms-2 text-white">
            {title}&nbsp;
            {!apiInfo ? <span className="text-secondary-emphasis">не указан</span> : apiInfo.toString()}
        </p>
    </div>
}