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
    question: "3대 영양소는 탄수화물, 단백질, 지방이다.",
    answer: true,
    Alert() {
      Swal.fire("3대 영양소는 \n탄수화물, 단백질, 지방입니다.");
    },
  },
  {
    question: "나트륨은 좋지 않기에 아예 섭취하지 않는 것이 좋다.",
    answer: false,
    Alert() {
      Swal.fire(
        "나트륨을 아예 섭취하지 않으면 \n우리 몸은 에너지원인 탄수화물 속 \n글리코겐을 운반하는 것에 어려움을 느껴 땀도 잘 나지않고 혈류가 \n충분히 공급되지 않습니다."
      );
    },
  },
  {
    question: "근육 생성을 위해 단백질은 최대한 많이 먹어야 좋다",
    answer: false,
    Alert() {
      Swal.fire("단백질을 과도하게 섭취하면 \n지방으로 변하므로 목적에 따라 \n적정량 섭취하는 것이 중요합니다.");
    },
  },
  {
    question: "가슴근육은 팔의 이두 근육에 붙어있다.",
    answer: true,
    Alert() {
      Swal.fire("가슴근육인 대흉근은 \n우리 팔 이두근에 붙어있습니다.");
    },
  },
  {
    question: "몸이 좋아지기 위해서는 운동과 휴식을 잘 하면 된다.",
    answer: false,
    Alert() {
      Swal.fire("운동, 영양, 휴식 \n이 세가지 모두를 잘 해야 \n몸이 빠르게 좋아집니다.");
    },
  },
  {
    question: "단백질파우더(프로틴)을 섭취하면 통풍이 온다",
    answer: false,
    Alert() {
      Swal.fire(
        "빠르게 소화되는 특징때문에 \n많이 섭취했을 때는 \n통풍이 올 확률이 높지만, \n권장량만 섭취한다면 \n문제는 없습니다."
      );
    },
  },
  {
    question: "건강한 식단은 별로 중요하지 않고 운동만 잘하면 근성장은 잘 일어난다.",
    answer: false,
    Alert() {
      Swal.fire(
        "건강한 식단의 이유는 운동으로 인해 손상된 근육의 빠른 회복을 도와 \n근성장이 잘 일어나도록 \n하기 위함입니다."
      );
    },
  },
  {
    question: "데드리프트는 등운동이다.",
    answer: false,
    Alert() {
      Swal.fire(
        "데드리프트는 등 뿐이 아닌 \n후면에 위치한 근육들을 \n강화시키기에 좋은 운동이며, \n굳이 따지자면 하체 운동입니다."
      );
    },
  },
  {
    question: "3대 운동은 힘을 기르는 것 뿐이 아닌, 부상을 방지해주는 역할도 한다.",
    answer: true,
    Alert() {
      Swal.fire(
        "3대 운동은 몸의 협응근의 발달을 \n도와 부상 발생의 위험도를 낮춰주고 더욱 기능적인 움직임을 만드는 데에 도움을 줍니다."
      );
    },
  },
  {
    question: "운동을 시작하는 것은 너무 어렵다",
    answer: false,
    Alert() {
      Swal.fire("열정만 있으면 무엇이든 \n다 가능합니다. \n지금이라도 늦지 않았습니다. \nAllright!");
    },
  },
];

function answer(user_answer) {
  if (user_answer === test_question[test_number].answer) {
    test_score.right++;
  } else {
    test_score.wrong++;
  }
  // 사용자의 답변을 확인한 후 SweetAlert 호출
  test_question[test_number].Alert();
}

// 점수 초기화 함수
function resetTestScore() {
  test_score.right = 0;
  test_score.wrong = 0;
}

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

start_btn.addEventListener("click", () => {
  //시작하기 버튼 누르면 문제 보여주는 함수
  start_btn.classList.add("hide");
  showTest(test_number);
});

document.addEventListener("click", (event) => {
  //OX버튼을 누르면 다음 문제로 넘어감
  if (event.target.id === "oButton" || event.target.id === "xButton") {
    answer(event.target.id === "oButton");
    // 사용자의 답과 함께 answer 함수 호출

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
  resetTestScore(); // 점수 초기화
  reset_btn.classList.add("hide");
  start_btn.classList.remove("hide");
  test_area.innerText = ""; // 문제 영역 초기화
  test_number = 0; // 문제 번호 초기화
});
