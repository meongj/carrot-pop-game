"use strict";

const CARROT_SIZE = 80;
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

function initGame() {
  // 벌레와 당근을 생성한뒤 field에 추가
  console.log(fieldRect);
  addItem("carrot", 5, "img/carrot.png");
  addItem("bug", 5, "img/bug.png");
}
function addItem(className, count, imgPath) {
  // x1 ~ x2, y1 ~ y2 영역 랜덤하게 위치 생성
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE; //
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    // <img class="bug" src="/img/bug.png" />
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

initGame();
