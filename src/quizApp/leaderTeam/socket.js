import { io } from "socket.io-client";

// importaciones y constantes de socket
const URL = "http://localhost:4000/";

export const socket = io(URL)