import "./styles/SpaceBattlegrounds.main.styles.css";
import * as Rx from "rx";
import startGame from "./Helpers";
import { createTheme, AudioStorage } from "./ThemeManager";

createTheme("opening", "./tunes/opening.mp3");
createTheme("battle", "./tunes/battle.mp3");
createTheme("gameover", "./tunes/gameover.mp3");

AudioStorage["opening"].play();
document.body.classList.add("game_start");

const start_game_button = document.getElementById("space_btn_start_game");
Rx.Observable.fromEvent(start_game_button, "click")
    .map(e => e["target"])
    .subscribe((element) => {

        document.body.removeChild(element);
        AudioStorage["opening"].pause();
        AudioStorage["battle"].play().then(startGame);
    });