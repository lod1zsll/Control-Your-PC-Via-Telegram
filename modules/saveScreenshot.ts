import path from "path";
import nircmd from "nircmd";
import crypto from "crypto";
import fs from "fs";
import { IMC } from "..";

export default async function (Server: IMC): Promise<Buffer> {
    const imagesDirPath = path.join(Server.dirName + "/images");
    const uuid = crypto.randomUUID();
    const imagePath = imagesDirPath + `\\${uuid}.png`;

    await nircmd("savescreenshotfull " + `"${imagePath}"`);

    const photo = fs.readFileSync(imagePath);
    fs.unlinkSync(imagePath);

    return photo;
}