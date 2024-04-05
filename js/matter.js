const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const engine = Engine.create();

const render = Render.create({
  element: document.getElementById("scene"),
  engine: engine,
  options: {
    width: window.innerWidth,
    height:
      window.innerHeight - document.querySelector(".inputArea").offsetHeight,
    wireframes: false,
  },
});

let mountain = [];

function addMountain() {
  // 입력창 높이 계산
  const inputAreaHeight = document.querySelector(".inputArea").offsetHeight;

  // 월드에서 기존의 산을 제거
  World.remove(engine.world, mountain);

  // 화면 크기와 입력창 높이를 고려하여 산의 기본 위치 설정
  const baseX = 0; // 왼쪽 벽에 맞닿음
  const baseY = window.innerHeight - inputAreaHeight; // 입력창 바로 위에 맞닿음

  // 산의 높이와 너비 설정 (화면 높이 또는 너비에 맞춰 조정 가능)
  const mountainHeight = baseY * 2.5; // 화면 높이에서 입력창 높이를 제외한 만큼
  const mountainWidth = mountainHeight; // 직각 삼각형이므로 높이와 너비 동일

  // 직각 삼각형 산 생성
  // Matter.js에서는 직접적으로 직각 삼각형을 만드는 기능이 없으므로, vertices를 사용
  const vertices = [
    { x: baseX, y: baseY }, // 왼쪽 아래 꼭짓점
    { x: baseX + mountainWidth, y: baseY }, // 오른쪽 아래 꼭짓점
    { x: baseX, y: baseY - mountainHeight }, // 왼쪽 위 꼭짓점
  ];

  mountain = Bodies.fromVertices(
    baseX,
    baseY,
    [vertices],
    {
      isStatic: true,
      render: {
        fillStyle: "green", // 초록색 채우기
        strokeStyle: "green", // 테두리 색상도 초록색으로 맞추기 (선택적)
        lineWidth: 1, // 테두리 두께 (선택적)
      },
    },
    true
  );

  World.add(engine.world, mountain);
}

function updateRendererSize() {
  const sceneHeight =
    window.innerHeight - document.querySelector(".inputArea").offsetHeight;

  render.canvas.width = window.innerWidth;
  render.canvas.height = sceneHeight;
  render.options.width = window.innerWidth;
  render.options.height = sceneHeight;

  addMountain();

  Engine.update(engine, engine.timing.timestamp);
}

window.addEventListener("resize", updateRendererSize);

// 초기 산 추가 및 렌더러 크기 업데이트
addMountain();
updateRendererSize();

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

document.getElementById("submitBtn").addEventListener("click", function () {
  const inputText = document.getElementById("textInput").value;
  if (inputText.trim() === "") {
    alert("텍스트를 입력해 주세요.");
    return;
  }
  createPhysicalText(inputText, 200, 200);
  document.getElementById("textInput").value = "";
});

const glyphImages = {
  ㄱ: "img/ㄱ.png",
  ㄲ: "img/ㄲ.png",
  ㄴ: "img/ㄴ.png",
  ㄷ: "img/ㄷ.png",
  ㄸ: "img/ㄸ.png",
  ㄹ: "img/ㄹ.png",
  ㅁ: "img/ㅁ.png",
  ㅂ: "img/ㅂ.png",
  ㅃ: "img/ㅃ.png",
  ㅅ: "img/ㅅ.png",
  ㅆ: "img/ㅆ.png",
  ㅇ: "img/ㅇ.png",
  ㅈ: "img/ㅈ.png",
  ㅉ: "img/ㅉ.png",
  ㅊ: "img/ㅊ.png",
  ㅋ: "img/ㅋ.png",
  ㅌ: "img/ㅌ.png",
  ㅍ: "img/ㅍ.png",
  ㅎ: "img/ㅎ.png",
  ㅏ: "img/ㅏ.png",
  ㅑ: "img/ㅑ.png",
  ㅓ: "img/ㅓ.png",
  ㅕ: "img/ㅕ.png",
  ㅗ: "img/ㅗ.png",
  ㅛ: "img/ㅛ.png",
  ㅜ: "img/ㅜ.png",
  ㅠ: "img/ㅠ.png",
  ㅡ: "img/ㅡ.png",
  ㅣ: "img/ㅣ.png",
  ㅔ: "img/ㅔ.png",
  ㅖ: "img/ㅖ.png",
  ㅐ: "img/ㅐ.png",
  ㅒ: "img/ㅒ.png",
  ㅢ: "img/ㅢ.png",
  ㅚ: "img/ㅚ.png",
  ㅙ: "img/ㅙ.png",
  ㅟ: "img/ㅟ.png",
  ㅞ: "img/ㅞ.png",
  ㅝ: "img/ㅝ.png",
  ㅘ: "img/ㅘ.png",
  ㄳ: "img/ㄳ.png",
  ㄵ: "img/ㄵ.png",
  ㄶ: "img/ㄶ.png",
  ㅀ: "img/ㅀ.png",
  ㄿ: "img/ㄿ.png",
  ㄼ: "img/ㄼ.png",
  ㄺ: "img/ㄺ.png",
  ㄽ: "img/ㄽ.png",
  ㅄ: "img/ㅄ.png",
  ㄻ: "img/ㄻ.png",
};

function decomposeHangul(text) {
  const CHOSUNG_LIST = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const JUNGSUNG_LIST = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const JONGSUNG_LIST = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  let decomposedText = [];

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode >= 0xac00 && charCode <= 0xd7a3) {
      const baseCode = charCode - 0xac00;
      const jongSungIndex = baseCode % 28;
      const jungSungIndex = Math.floor((baseCode / 28) % 21);
      const choSungIndex = Math.floor(baseCode / 28 / 21);
      const choSung = CHOSUNG_LIST[choSungIndex];
      const jungSung = JUNGSUNG_LIST[jungSungIndex];
      const jongSung = JONGSUNG_LIST[jongSungIndex];
      decomposedText.push([choSung, jungSung, jongSung]);
    } else {
      decomposedText.push([text[i]]);
    }
  }

  return decomposedText;
}

const createRollingText = (text, x, y) => {
  const textBody = createPhysicalText(text, x, y);
  Body.setVelocity(textBody, { x: 5, y: -5 });
};
