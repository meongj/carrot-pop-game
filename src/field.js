"use strict";
import * as sound from "./sound.js";

/**
 * 필드 클래스
 * 아이템을 원하는 곳에 배치
 * 클릭 이벤트 처리
 */
const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();

    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    // 벌레와 당근을 생성한뒤 field에 추가
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
    this._addItem("bug", this.bugCount, "img/bug.png");
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // _ : private 함수
  _addItem(className, count, imgPath) {
    // x1 ~ x2, y1 ~ y2 영역 랜덤하게 위치 생성
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;

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

      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;

    // 당근 클릭할 경우
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);

      // 벌레를 클릭한 경우
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}
// static 함수
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
