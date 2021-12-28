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
io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
  socket.on("callUser", ({ userIoCall, signalData, from, name }) => {
    io.to(userIoCall).emit("callUser", { signal: signalData, from, name });
  });
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });
});
server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
