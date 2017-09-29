import "./styles/SpaceBattlegrounds.main.styles.css";
import * as Rx from "rx";
import SpaceShip from "./SpaceShip";
import StarStream from "./StarStream";
import { canvas } from "./Canvas";
import { renderScene } from "./Helpers";

const Game = Rx.Observable.combineLatest(
    StarStream,
    SpaceShip,
    (stars, spaceship) => {

        return {
            stars: stars,
            spaceship: spaceship
        };
    });

Game.subscribe(renderScene);

document.body.appendChild(canvas);