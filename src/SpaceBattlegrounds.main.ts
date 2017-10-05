import "./styles/SpaceBattlegrounds.main.styles.css";
import * as Rx from "rx";
import startGame from "./Helpers";
import { createTheme, AudioStorage } from "./ThemeManager";

createTheme("opening", "./tunes/opening.mp3");
createTheme("battle", "./tunes/battle.mp3");
createTheme("gameover", "./tunes/gameover.mp3");

AudioStorage["opening"].play();

const start_game_button = document.getElementById("space_btn_start_game");
const play_again_button = document.getElementById("space_btn_play_again");

Rx.Observable
    .fromEvent(start_game_button, "click")
    .map(e => e["target"])
    .subscribe((element: HTMLElement) => {

        element.style.display = "none";
        AudioStorage["opening"].pause();
        AudioStorage["opening"].currentTime = 0;
        AudioStorage["battle"].play().then(startGame);
    });

Rx.Observable
    .fromEvent(play_again_button, "click")
    .map(e => e["target"])
    .subscribe((element: HTMLElement) => {

        element.style.display = "none";
        document.body.classList.remove("game_over");
        document.getElementById("player_score").style.display = "none";
        AudioStorage["gameover"].pause();
        AudioStorage["gameover"].currentTime = 0;
        AudioStorage["battle"].play().then(startGame);
    });