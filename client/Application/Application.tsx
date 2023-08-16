import React from "react";
import "@assets/scss/styles.scss";
import "react-toastify/dist/ReactToastify.min.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import { StorageProvider } from "./providers/StorageProvider";

import { InfoProvider } from "./providers/InfoProvider";

export default function App() {
    return <>
        <StorageProvider>
            <InfoProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Main />} />
                    </Routes>
                </BrowserRouter>
            </InfoProvider>
        </StorageProvider>
    </>
}