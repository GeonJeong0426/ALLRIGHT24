const express = require("express");
const app = express();
const { ObjectId } = require("mongodb");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

app.use(passport.initialize());
app.use(
  session({
    secret: "b90e94f9294f1665463f477c2ef7f0de73688f10f7013c06468448ec67c82aa5",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
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

app.get("/Recommend", (req, res) => {
  res.sendFile(__dirname + "/public/recommend/recommend.html");
});
// 오운완 서버 코드

app.get("/OWunWan/:page", async (req, res) => {
  //게시글목록
  let pageCount = await db.collection("OWunWan").countDocuments();
  let totalPage = Math.ceil(pageCount / 8);
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

passport.use(
  new LocalStrategy(async (ID, PW, cb) => {
    let result = await db.collection("user").findOne({ username: ID });
    if (!result) {
      return cb(null, false, { message: "존재하지 않는 ID입니다." });
    }
    if (await bcrypt.compare(PW, result.password)) {
      return cb(null, result);
    } else {
      return cb(null, false, { message: "비밀번호가 일치하지 않습니다." });
    }
  })
);

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user._id, username: user.username });
  });
});

passport.deserializeUser(async (user, done) => {
  let result = await db.collection("user").findOne({ _id: new ObjectId(user.id) });
  delete result.password;
  process.nextTick(() => {
    return done(null, result);
  });
});

app.get("/login", async (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    //로그인에 대한 응답 파라미터
    if (error) return res.status(500).json(error);
    if (!user) return res.status(401).json(info.message);
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
});

app.get("/join", async (req, res) => {
  res.render("join.ejs");
});

app.post("/join", async (req, res) => {
  let ID = req.body.username;
  let PW1 = req.body.password;
  let PW2 = req.body.password2;

  function isId(asValue) {
    var regExp = /^[a-z0-9]{4,20}$/;
    return regExp.test(asValue);
  }
  function isPw(asValue) {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[^\s]{6,20}$/;
    return regExp.test(asValue);
  }
  let checkId = isId(ID);
  let checkPw = isPw(PW1);

  if (checkId && checkPw && PW1 === PW2) {
    let hash = await bcrypt.hash(req.body.password, 12);
    await db.collection("user").insertOne({
      username: req.body.username,
      password: hash,
    });
    res.send('<script>alert("회원가입이 완료되었습니다."); location.href="/";</script>');
  } else if (PW1 !== PW2) {
    res.send('<script>alert("비밀번호가 일치하지 않습니다."); location.href="/join";</script>');
  } else if (checkId || checkPw) {
    res.send('<script>alert("아이디/비밀번호 조건을 확인하세요."); location.href="/join";</script>');
  }
});
