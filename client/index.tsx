import { createRoot } from "react-dom/client";
import Application from "./Application/Application";
import React from "react";

const root = createRoot(document.getElementById("root"));

if (root == null) {
    alert("query #root is null");
} else {
    const isProd = process.env.NODE_ENV === "production";

    if (isProd) {
        root.render(<Application />);
    };
    if (!isProd) {
        root.render(<React.StrictMode>
            <Application />
        </React.StrictMode>);
    };
};