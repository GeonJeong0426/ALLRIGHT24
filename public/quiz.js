const article = document.getElementById("article"); //본문영역
const test_area = document.getElementById("test_area"); //문제가 나오는 영역
const start_btn = document.getElementById("start_btn"); //test 시작버튼
const reset_btn = document.getElementById("reset_btn"); //처음으로 버튼
const test_status = document.getElementById("test_status"); //진행도 영역 ex) 1/10

let test_score = {
  right: 0,
  wrong: 0,
};
let test_number = 0;
const test_question = [
  {
    question: "문제1",
    answer: true,
  },
  {
    question: "문제2",
    answer: true,
  },
  {
    question: "문제3",
    answer: true,
  },
  {
    question: "문제4",
    answer: true,
  },
  {
    question: "문제5",
    answer: true,
  },
  {
    question: "문제6",
    answer: false,
  },
  {
    question: "문제7",
    answer: false,
  },
  {
    question: "문제8",
    answer: false,
  },
  {
    question: "문제9",
    answer: false,
  },
  {
    question: "문제10",
    answer: false,
  },
];

function showTest(test_number) {
  //문제와 OX버튼 출력 함수
  if (test_number < 10) {
    test_area.innerHTML = `
    <div id = "test_question">${test_number + 1}. ${test_question[test_number].question}</div>
    <button id = "oButton" class = "oxButton">O</button>
    <button id = "xButton" class = "oxButton">X</button>
    `;
    test_status.innerText = `${test_number + 1}/10`;
    console.log(test_number);
  }

  if (test_number > 9) {
    console.log(test_number);

    test_area.innerHTML = `
    <div id = "test_question">
      
      <p>
        맞은개수: ${test_score.right}<br>
        틀린개수: ${test_score.wrong}
      </p>
      <br>
      당신의 점수는? ${test_score.right * 10}점!
    </div>
    `; //문제나오는곳 초기화
    test_status.innerText = ``;
    reset_btn.classList.remove("hide");
  }
}

// function resetTest() {
//   article.innerHTML = `
//   <button id="start_btn">시작하기</button>
//   `;
// }

start_btn.addEventListener("click", () => {
  //시작하기 버튼 누르면 문제 보여주는 함수
  start_btn.classList.add("hide");
  showTest(test_number);
});

document.addEventListener("click", (event) => {
  //OX버튼을 누르면 다음 문제로 넘어감
  if (event.target.id === "oButton" || event.target.id === "xButton") {
    test_number++;
    showTest(test_number);
    if (event.target.id === "oButton") {
      console.log("oclick");
    } else {
      console.log("xclick");
    }
  }
});

reset_btn.addEventListener("click", () => {
  reset_btn.classList.add("hide");
  start_btn.classList.remove("hide");
  test_area.innerText = ""; //점수현황 초기화
  test_number = 0; //문제번호 초기화
});
