import * as Rx from "rx";
import { canvas } from "./Canvas";

const HERO_Y = canvas.height - 30;
const mouseMove = Rx.Observable.fromEvent(canvas, "mousemove");

const SpaceShip = mouseMove
    .map(event => {

        return {
            x: event["clientX"],
            y: HERO_Y
        };
    })
    .startWith({
        x: canvas.width / 2,
        y: HERO_Y
    });

export default SpaceShip;