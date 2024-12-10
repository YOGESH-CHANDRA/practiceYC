require('dotenv').config;
const express= require('express');
const {Server}=require('socket.io');
const http= require('http');
const cors= require('cors');
const app = express();

const server = http.createServer(app);
const io=new Server(server);
app.use(cors());


app.get('/', (req, res) => {
    res.send('Server is up and running');
});


const port = 3000;

server.listen(port,() => {console.log(`listening on ${port}`);});