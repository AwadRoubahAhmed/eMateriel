import Server from "./core/server";

// Create a Server
const server = new Server();

// Start the Server
const app = server.startServer();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

if (Number.isNaN(port)) {
	throw new Error("PORT must be a number");
}
app.listen(port, "0.0.0.0", () => {
	console.log(`Server running on port ${port}`);
});
