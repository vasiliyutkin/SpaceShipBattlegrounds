import "./styles/SpaceBattlegrounds.main.styles.css";
import * as Rx from "rx";
import SpaceShip from "./SpaceShip";
import StarStream from "./StarStream";
import Enemies from "./Enemies";
import HeroShots from "./HeroShots";
import Settings from "./Settings";
import { canvas } from "./Canvas";
import { renderScene, gameOver, paintGameEnding } from "./Helpers";

Rx.Observable
    .combineLatest(StarStream, SpaceShip, Enemies, HeroShots, (stars, spaceship, enemies, heroShots) => { return { stars, spaceship, enemies, heroShots } })
    .sample(Settings.SPEED)
    .takeWhile(actors => {

        const isGameEnded: boolean = gameOver(actors.spaceship, actors.enemies);
        if (isGameEnded) paintGameEnding();
        return !isGameEnded;
    })
    .subscribe(renderScene);