import { IMC } from "../..";
import { randomUUID } from "crypto";
import fastifyStatic from "@fastify/static";
import path from "path"
import fastifyMultipart from "@fastify/multipart";
import config from "../../config";


export default async function (Server: IMC): Promise<void> {
    const server = Server.server;
    const dirName = Server.dirName;
    const port = Number(Server.PORT);

    fastifyStatic(server, { root: dirName + path.join("/static") });
    
    server.register(fastifyMultipart, {
        attachFieldsToBody: true,
        limits: config(Server).get().limits
    });

    server.get("/", (req, res) => {
        res.type("text/html; charset=utf-8");
        res.send(`<!DOCTYPE html> 
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <script defer src="/assets/client/vendor-react.bundle.js"></script><script defer src="/assets/client/index.bundle.js"></script>
        <title>SandeLLo PC Control</title>
        <link rel="icon" type="image/png" href="/assets/favicon.png" size="256x256">
        </head> 
        <body> 
        <div id="root"></div> 
        </body> 
        </html>`);
    });

    server.listen({ port }, (err, address) => {
        if (err) throw err;

        console.log(address);
    });
}