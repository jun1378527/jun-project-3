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
  const inputAreaHeight = document.querySelector(".inputArea").offsetHeight;

  World.remove(engine.world, mountain);

  const baseX = 0;
  const baseY = window.innerHeight - inputAreaHeight;

  const mountainHeight = baseY * 2.5;
  const mountainWidth = mountainHeight;

  const vertices = [
    { x: baseX, y: baseY },
    { x: baseX + mountainWidth, y: baseY },
    { x: baseX, y: baseY - mountainHeight },
  ];

  mountain = Bodies.fromVertices(
    baseX,
    baseY,
    [vertices],
    {
      isStatic: true,
      render: {
        fillStyle: "green",
        strokeStyle: "green",
        lineWidth: 1,
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

addMountain();
updateRendererSize();

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

document.getElementById("submitBtn").addEventListener("click", function () {
  const inputText = document
    .getElementById("textInput")
    .value.trim()
    .toLowerCase();

  if (inputText === "") {
    alert("텍스트를 입력해 주세요.");
    return;
  }

  let velocity = { x: 0, y: 0 };

  // 동물 이름에 따른 속도와 방향 조정 실험상 아무거나
  if (inputText === "고양이") {
    velocity.y = -10;
  } else if (inputText === "거북이") {
    velocity.y = -1;
  } else if (inputText === "새") {
    velocity.y = -15;
    velocity.x = 15;
  }

  createPhysicalText(inputText, 200, 200, velocity);

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
