const express = require("express");
const { Server } = require("socket.io");
const app = express();
const { createServer } = require("http");
app.use(express.json());
const cors = require("cors");

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cors());

io.on("error", (err) => console.log(err.message));

io.on("connection", (socket) => {
  console.log("user connected : " + socket.id);

  socket.on("message", (msg) => {
    console.log(msg);
    socket.broadcast("msg", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected :" + socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running on port ");
});

const port = 3000;

server.listen(port, () => console.log("listening on port : " + port));
