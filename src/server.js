import express from "express";
import http from "http";
import WebSocket from "ws";
import { homedir } from "os";
const app = express();

// console.log('Hello world!');

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); 
app.use("/public", express.static(__dirname + "/public"));

// function handleReq(req, res){
//     res.render("home");
// }

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3333`);
//  node.js 에 이미 포함되어 있는 http 패키지 사용.
const server = http.createServer(app);

//  server 파라미터는 optional, Websocket 서버와 http 서버를 함께 생성하고자 할 때 사용.
// http 서버이며, WebSocket 서버인 프로레스가 3333 포트에 바인딩되어 실행됨.

const wss = new WebSocket.Server({server});

function handleConnection(socket) {
    console.log(socket);
}

wss.on("connection", (socket) => {
    console.log("Successfully connected");
    socket.on('close', () => {
        console.log("clossed...");
    });

    socket.on("message", (msg) => {
        console.log(Buffer.from(msg, "base64").toString("utf-8"));
        socket.send(Buffer.from(msg, "base64").toString("utf-8"));
    });
        // socket.send("Hello World!!!");
});

// app.listen(3333);
// websocket 서버 생성
server.listen(3333, handleConnection);
