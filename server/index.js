const app = require("express")();
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const googleAuth = require("./routes/auth");
const server = require("http").createServer(app);
const PORT = process.env.PORT || 8000;
const passportSetup = require("./passport");
const cookieSession = require("cookie-session");

app.use(
  cors({
    origin: "https://video-app-reactjs.vercel.app",
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: ["anymeet"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(googleAuth);

app.get("/", (req, res) => {
  res.send("server running");
});
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log(userToCall, name, from, signalData);
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  socket.on("answerCall", (data) => {
    console.log(data, "answerCall");
    io.to(data.to).emit("callAccepted", data.signal);
  });
});
server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
