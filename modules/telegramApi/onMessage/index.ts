import { IMC } from "../../..";
import onText from "./onText";
import onCommand from "./onCommand";

export default function (Server: IMC) {
    const bot = Server.bot;
    

    onCommand(Server);
    onText(Server);
}