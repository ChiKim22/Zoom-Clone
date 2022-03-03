import express from "express";

const app = express();

console.log('Hello world!');

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); 
app.use("/public", express.static(__dirname + "/public"));

function handleReq(req, res){
    res.render("home");
}
app.get("/", handleReq);

app.listen(3333);