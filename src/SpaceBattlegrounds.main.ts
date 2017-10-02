import "./styles/SpaceBattlegrounds.main.styles.css";

import * as Rx from "rx";

import {
    canvas
} from "./Canvas";

import Settings from "./Settings";

import {
    renderScene,
    startGame,
    gameOver,
    paintGameEnding
} from "./Helpers";

import SpaceShip from "./SpaceShip";
import StarStream from "./StarStream";
import Enemies from "./Enemies";
import HeroShots from "./HeroShots";
import { Score } from "./Score";

startGame();

Rx.Observable
    .combineLatest(StarStream,
    SpaceShip,
    Enemies,
    HeroShots,
    Score,
    (stars, spaceship, enemies, heroShots, score) => {

        return {
            stars,
            spaceship,
            enemies,
            heroShots,
            score
        };
    })
    .sample(Settings.SPEED)
    .takeWhile(actors => {

        const isGameEnded: boolean = gameOver(actors.spaceship, actors.enemies);
        if (isGameEnded) paintGameEnding();
        return !isGameEnded;
    })
    .subscribe(renderScene);