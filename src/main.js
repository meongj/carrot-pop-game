"use strict";
import { PopUp, Message } from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

// 팝업
const gameFinishBanner = new PopUp();

// 빌더 패턴을 이용해서 어떤 값을 썼는지 알수 있음
const game = new GameBuilder()
    .withGameDuration(10)
    .withCarrotCount(10)
    .withBugCount(10)
    .build();

game.setGameStopListener((reason) => {
    let popupMessage;

    switch (reason) {
        case Reason.cancel:
            popupMessage = Message.cancel;
            sound.playAlert();
            break;
        case Reason.win:
            popupMessage = Message.win;
            sound.playWin();
            break;
        case Reason.lose:
            popupMessage = Message.lose;
            sound.playBug();
            break;
        default:
            throw new Error("not valid reason");
    }
    // 팝업 문구 추가
    gameFinishBanner.showWithText(popupMessage);
    // 팝업 나오면 당근 선택할 수 없다
});

gameFinishBanner.setClickListener(() => {
    game.start();
});