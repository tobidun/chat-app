import http from "http";
import { app } from "./app";
import { onError, onListening } from "./appSupport";

const port = process.env.PORT || 3000;

export const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
