import Server from "./core/server";

// Create a Server
const server = new Server();

// Start the Server
const app = server.startServer();

app.listen(process.env.PORT); // TO GET VARIABLES IN .env.dev
