const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("server running");
});

server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
