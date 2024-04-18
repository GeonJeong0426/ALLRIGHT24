const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;
const url = process.env.mongoDB_URL;

new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("SWE");

    app.listen(8080, () => {
      console.log("http://localhost:8080 에서 서버 실행중");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/quiz", async (req, res) => {
  res.sendFile(__dirname + "/public/quiz.html");
});

app.get("/OWunWan", async (req, res) => {
  let result = await db.collection("OWunWan").find().toArray();
  res.render("OWunWan.ejs", { 오운완: result });
});

app.post("/OWunWan_post", async (req, res) => {
  try {
    if (req.body.title === "") {
      res.send("제목을 입력해주세요");
    } else {
      //제목이 입력되었을때만 저장
      await db.collection("OWunWan").insertOne({ title: req.body.title, content: req.body.content });
      res.redirect("/");
    }
  } catch (error) {
    res.send("DB error!");
  }
});
