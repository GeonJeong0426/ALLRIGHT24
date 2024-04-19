const express = require("express");
const app = express();
const { ObjectId } = require("mongodb");

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

// 오운완 서버 코드

app.get("/OWunWan", async (req, res) => {
  //게시글목록
  let result = await db.collection("OWunWan").find().toArray();
  res.render("OWunWan.ejs", { result: result });
});

app.get("/OWunWanWrite", async (req, res) => {
  //오운완 게시물 작성
  res.render("OWunWanWrite.ejs");
});

app.post("/OWunWan_post", async (req, res) => {
  //오운완 게시물 DB저장
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

app.get("/OWunWan/detail/:id", async (req, res) => {
  // 오운완 상세페이지
  try {
    let result = await db.collection("OWunWan").findOne({ _id: new ObjectId(req.params.id) });
    if (result == null) {
      res.status(400).send("존재하지 않는 URL 입니다.");
    } else {
      res.render("OWunWanDetail.ejs", { result: result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("존재하지 않는 URL 입니다.");
  }
});
