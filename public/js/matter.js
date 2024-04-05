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
  ㄱ: "/rolling_word_project/img/ㄱ.png",
  ㄲ: "/rolling_word_project/img/ㄲ.png",
  ㄴ: "/rolling_word_project/img/ㄴ.png",
  ㄷ: "/rolling_word_project/img/ㄷ.png",
  ㄸ: "/rolling_word_project/img/ㄸ.png",
  ㄹ: "/rolling_word_project/img/ㄹ.png",
  ㅁ: "/rolling_word_project/img/ㅁ.png",
  ㅂ: "/rolling_word_project/img/ㅂ.png",
  ㅃ: "/rolling_word_project/img/ㅃ.png",
  ㅅ: "/rolling_word_project/img/ㅅ.png",
  ㅆ: "/rolling_word_project/img/ㅆ.png",
  ㅇ: "/rolling_word_project/img/ㅇ.png",
  ㅈ: "/rolling_word_project/img/ㅈ.png",
  ㅉ: "/rolling_word_project/img/ㅉ.png",
  ㅊ: "/rolling_word_project/img/ㅊ.png",
  ㅋ: "/rolling_word_project/img/ㅋ.png",
  ㅌ: "/rolling_word_project/img/ㅌ.png",
  ㅍ: "/rolling_word_project/img/ㅍ.png",
  ㅎ: "/rolling_word_project/img/ㅎ.png",
  ㅏ: "/rolling_word_project/img/ㅏ.png",
  ㅑ: "/rolling_word_project/img/ㅑ.png",
  ㅓ: "/rolling_word_project/img/ㅓ.png",
  ㅕ: "/rolling_word_project/img/ㅕ.png",
  ㅗ: "/rolling_word_project/img/ㅗ.png",
  ㅛ: "/rolling_word_project/img/ㅛ.png",
  ㅜ: "/rolling_word_project/img/ㅜ.png",
  ㅠ: "/rolling_word_project/img/ㅠ.png",
  ㅡ: "/rolling_word_project/img/ㅡ.png",
  ㅣ: "/rolling_word_project/img/ㅣ.png",
  ㅔ: "/rolling_word_project/img/ㅔ.png",
  ㅖ: "/rolling_word_project/img/ㅖ.png",
  ㅐ: "/rolling_word_project/img/ㅐ.png",
  ㅒ: "/rolling_word_project/img/ㅒ.png",
  ㅢ: "/rolling_word_project/img/ㅢ.png",
  ㅚ: "/rolling_word_project/img/ㅚ.png",
  ㅙ: "/rolling_word_project/img/ㅙ.png",
  ㅟ: "/rolling_word_project/img/ㅟ.png",
  ㅞ: "/rolling_word_project/img/ㅞ.png",
  ㅝ: "/rolling_word_project/img/ㅝ.png",
  ㅘ: "/rolling_word_project/img/ㅘ.png",
  ㄳ: "/rolling_word_project/img/ㄳ.png",
  ㄵ: "/rolling_word_project/img/ㄵ.png",
  ㄶ: "/rolling_word_project/img/ㄶ.png",
  ㅀ: "/rolling_word_project/img/ㅀ.png",
  ㄿ: "/rolling_word_project/img/ㄿ.png",
  ㄼ: "/rolling_word_project/img/ㄼ.png",
  ㄺ: "/rolling_word_project/img/ㄺ.png",
  ㄽ: "/rolling_word_project/img/ㄽ.png",
  ㅄ: "/rolling_word_project/img/ㅄ.png",
  ㄻ: "/rolling_word_project/img/ㄻ.png",
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
