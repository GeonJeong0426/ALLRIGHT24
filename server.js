const express = require("express");
const app = express();
const { ObjectId } = require("mongodb");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/Quiz", (req, res) => {
  res.sendFile(__dirname + "/public/quiz/quiz.html");
});

app.get("/Stretch", (req, res) => {
  res.sendFile(__dirname + "/public/stretch/stretch.html");
});

app.get("/CalorieCalculator", (req, res) => {
  res.sendFile(__dirname + "/public/calorieCalculator/calorieCalculator.html");
});
// 오운완 서버 코드

app.get("/OWunWan/:page", async (req, res) => {
  //게시글목록
  let pageCount = await db.collection("OWunWan").find().toArray();
  let totalPage = Math.ceil(pageCount.length / 8);
  let result = await db
    .collection("OWunWan")
    .find()
    .skip((req.params.page - 1) * 8)
    .limit(8)
    .toArray();
  console.log(totalPage);
  res.render("OWunWan.ejs", { result: result, totalPage: totalPage });
});

app.get("/OWunWan", (req, res) => {
  // /OWunWan 경로로 요청이 들어오면 /OWunWan/1로 리다이렉트
  res.redirect("/OWunWan/1");
});

app.get("/OWunWanWrite", async (req, res) => {
  //오운완 게시물 작성
  res.render("OWunWanWrite.ejs");
});

app.post("/OWunWan_post", async (req, res) => {
  //오운완 게시물 등록하기
  try {
    if (req.body.title === "") {
      res.send("제목을 입력해주세요");
    } else {
      //제목이 입력되었을때만 저장
      await db.collection("OWunWan").insertOne({ title: req.body.title, content: req.body.content });
      res.redirect("/OWunWan");
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

app.get("/OWunWan_edit/:id", async (req, res) => {
  //수정할 게시글 불러오기
  let result = await db.collection("OWunWan").findOne({ _id: new ObjectId(req.params.id) });
  res.render("OWunWan_edit.ejs", { result: result });
});

app.put("/OWunWan_edit_post/:id", async (req, res) => {
  // 수정완료 버튼 누르면
  try {
    await db
      .collection("OWunWan")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: { title: req.body.title, content: req.body.content } });

    res.redirect("/OWunWan");
  } catch (error) {
    console.log(error);
    res.status(400).send("DB오류");
  }
});

app.delete("/OWunWan_delete/:id", async (req, res) => {
  //삭제하기
  await db.collection("OWunWan").deleteOne({ _id: new ObjectId(req.params.id) });
  res.redirect("/OWunWan");
});

//자세 봐주세요 게시판

app.get("/PostureQnA", async (req, res) => {
  //자세 봐주세요 게시글목록
  let result = await db.collection("PostureQnA").find().toArray();
  res.render("PostureQnA.ejs", { result: result });
});

app.get("/PostureQnAWrite", async (req, res) => {
  //자세 봐주세요 게시물 작성
  res.render("PostureQnAWrite.ejs");
});

app.post("/PostureQnA_post", async (req, res) => {
  //자세 봐주세요 게시물 등록하기
  try {
    if (req.body.title === "") {
      res.send("제목을 입력해주세요");
    } else {
      //제목이 입력되었을때만 저장
      await db.collection("PostureQnA").insertOne({ title: req.body.title, content: req.body.content });
      res.redirect("/PostureQnA");
    }
  } catch (error) {
    res.send("DB error!");
  }
});

app.get("/PostureQnA/detail/:id", async (req, res) => {
  // 자세 봐주세요 상세페이지
  try {
    let result = await db.collection("OWunWan").findOne({ _id: new ObjectId(req.params.id) });
    if (result == null) {
      res.status(400).send("존재하지 않는 URL 입니다.");
    } else {
      res.render("PostureQnADetail.ejs", { result: result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("존재하지 않는 URL 입니다.");
  }
});

app.get("/PostureQnA_edit/:id", async (req, res) => {
  //수정할 게시글 불러오기
  let result = await db.collection("PostureQnA").findOne({ _id: new ObjectId(req.params.id) });
  res.render("PostureQnA_edit.ejs", { result: result });
});

app.put("/PostureQnA_edit_post/:id", async (req, res) => {
  // 수정완료 버튼 누르면
  try {
    await db
      .collection("PostureQnA")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: { title: req.body.title, content: req.body.content } });

    res.redirect("/PostureQnA");
  } catch (error) {
    console.log(error);
    res.status(400).send("DB오류");
  }
});

app.delete("/PostureQnA_delete/:id", async (req, res) => {
  //삭제하기
  await db.collection("PostureQnA").deleteOne({ _id: new ObjectId(req.params.id) });
  res.redirect("/PostureQnA");
});

app.get("/Stretch");
