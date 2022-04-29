import app from "./app";

const PORT = process.env.PORT;
const server = app.listen(PORT);

export default server;
