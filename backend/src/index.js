import http from "http";
import app from "./app.js";
import { initSocket } from "./sockets/connection.js";

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
