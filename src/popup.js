"use strict";

/**
 * 팝업 클래스
 * 팝업 메시지 핸들링
 * 버튼 처리
 */

// 팝업 메시지 (상수)
export const Message = Object.freeze({
    cancel: "REPLAY❓",
    win: "YOU WON 🏆",
    lose: "YOU LOST 💩",
});

export class PopUp {
    constructor() {
        this.popUp = document.querySelector(".pop-up");
        this.popUpText = document.querySelector(".pop-up__message");
        this.popUpRefresh = document.querySelector(".pop-up__refresh");

        this.popUpRefresh.addEventListener("click", () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove("pop-up--hide");
    }

    hide() {
        this.popUp.classList.add("pop-up--hide");
    }
}