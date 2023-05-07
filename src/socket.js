import { io } from "socket.io-client";

// importaciones y constantes de socket
const URL = "http://localhost:4000/";
// const URL = "apiquizapp-production.up.railway.app/";

export const socket = io(URL)