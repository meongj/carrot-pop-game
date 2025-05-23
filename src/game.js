import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

/**
 * 게임 클래스
 * - 당근, 벌레 랜덤 배열
 * - 게임시작, 게임 종료
 * - 타이머, 점수 셋팅
 */

// 게임 결과 (상수)
export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

// Builder Pattern
export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}

export class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector(".game__button");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");

    this.gameBtn.addEventListener("click", () => {
      this.started ? this.stop(Reason.cancel) : this.start();
    });

    // 게임 필드
    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListner((item) => {
      // item = bug or carrot
      this.onItemClick(item); // this -> arrow func
    });

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  // 게임 시작
  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  // 게임 정지 & 종료
  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();

    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }

    // 당근 클릭할 경우
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();

      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
      // 벌레를 클릭한 경우
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  showStopButton() {
    // play 아이콘 -> stop 아이콘 변경
    const icon = this.gameBtn.querySelector(".fa-solid");
    icon.classList.add("fa-square");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  showTimerAndScore() {
    // 게임 시작시 타이머와 점수가 보인다
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);

    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.score === this.carrotCount ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  updateTimerText(time) {
    // time = sec
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
