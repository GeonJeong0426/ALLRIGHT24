document.addEventListener("DOMContentLoaded", () => {
  //스트레칭 이미지&설명
  const stretches = [
    { id: "neck", image: "img/목.png", description: "목에 힘을 빼고 좌, 우, 앞, 뒤 순서로 머리를 기울입니다." },
    {
      id: "shoulder",
      image: "img/어깨.png",
      description:
        "a. 오른팔을 어깨 높이로 들고 왼팔로 걸어 몸쪽으로 당깁니다.<br>b. 오른팔을 들어 머리 뒤로 내리고 왼손으로 오른쪽 팔꿈치를 잡아서 밑으로 누릅니다.",
    },
    {
      id: "shoulder",
      image: "img/어깨,옆구리.png",
      description: "손바닥이 위를 향하도록 깍지를 끼고 몸을 좌, 우로 움직입니다.",
    },
    {
      id: "chest",
      image: "img/가슴.png",
      description: "무릎을 꿇고 앉아 양손을 앞으로 뻗고 엎드려, 어깨와 가슴을 아래로 지긋이 누릅니다.",
    },
    { id: "waist", image: "img/허리.png", description: "팔꿈치를 바닥에 대고 엎드리고 상체를 천천히 들어 올립니다." },
    {
      id: "waist",
      image: "img/몸통.png",
      description:
        "a. 고개를 들고 허리를 아래로 누릅니다.<br>b. 고개를 숙이고 복부에 힘을 주면서 등과 허리를 위로 당깁니다.",
    },
    {
      id: "thigh",
      image: "img/앞허벅지.png",
      description: "다리를 뒤로 접고 손으로 발을 잡아 엉덩이 쪽으로 당깁니다.",
    },
    {
      id: "thigh",
      image: "img/뒷허벅지.png",
      description: "뒷다리를 무릎을 굽혀 중심을 잡고 앞다리무릎은 편 후에 배꼽이 허벅지에 닿도록 내려갑니다.",
    },
    {
      id: "thigh",
      image: "img/허벅지,엉덩이.png",
      description:
        "양 다리를 좌우로 벌리고 손으로 무릎을 잡습니다.<br> 무릎이 90도가 될 때까지 엉덩이를 바닥 쪽으로 내리고 몸을 옆으로 틀어줍니다.",
    },
    {
      id: "hip",
      image: "img/엉덩이.png",
      description:
        "한쪽 다리 발목을 반대 다리 허벅지에 올려 숫자4 모양을 만들어 줍니다.<br> 세워놓은 다리 허벅지를 손으로 감싸 가슴으로 당겨줍니다.",
    },
    { id: "hip", image: "img/엉덩이,뒷허벅지.png", description: "바닥에 누워 한쪽 무릎을 접어 가슴쪽으로 당깁니다." },
    {
      id: "calf",
      image: "img/종아리.png",
      description: "양손으로 벽을 짚고 허리를 펴고 서서 왼쪽 종아리가 당기는 느낌이 들 때까지 오른쪽 무릎을 굽힙니다.",
    },
  ];

  let currentIndex = 0;

  //index태그 연결 변수
  const detailLinks = document.querySelectorAll("a.stretch_detail"); //스트레칭 세부 부위
  const partLinks = document.querySelectorAll("a.stretch_part"); //상하체
  const stretchImg = document.querySelector("#s_img img");
  const stretchDes = document.querySelector(".text");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  //스트레칭 사진, 설명 띄우기
  function updateSInfo() {
    const stretch = stretches[currentIndex];
    stretchImg.src = stretch.image;
    stretchImg.alt = stretch.description;
    stretchDes.innerHTML = stretch.description;

    detailLinks.forEach((link) => link.classList.remove("active"));
    partLinks.forEach((link) => link.classList.remove("active"));
    const currentDetailLink = document.querySelector(`a.stretch_detail[data-target="${stretch.id}"]`); //스트레칭 세부 부위 찾기
    const currentPartLink = document.querySelector(`a.stretch_part[data-target="${stretch.id.split("-")[0]}"]`); //upper / lower 찾기
    if (currentDetailLink) {
      currentDetailLink.classList.add("active"); //밑줄 효과
    }
    if (currentPartLink) {
      currentPartLink.classList.add("active");
    }
  }

  // 화살표 클릭event
  prevButton.addEventListener("click", () => {
    if (currentIndex === 0) {
      currentIndex = stretches.length - 1;
    } else {
      currentIndex--;
    }
    updateSInfo();
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex === stretches.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateSInfo();
  });

  detailLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); //기본 클릭 동작 방지
      currentIndex = stretches.findIndex((stretch) => stretch.id === link.getAttribute("data-target"));
      updateSInfo();
    });
  });

  partLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetPart = link.getAttribute("data-target");
      const targetIndex = stretches.findIndex((stretch) => stretch.id.startsWith(targetPart));
      if (targetIndex !== -1) {
        currentIndex = targetIndex;
        updateSInfo();
      }
    });
  });

  // 초기 표시
  updateSInfo();
});
