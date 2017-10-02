import * as Rx from "rx";
import { canvas } from "./Canvas";
import Setting from "./Settings";

const mouseMove: Rx.Observable<{}> = Rx.Observable.fromEvent(canvas, "mousemove");
const SpaceShip = mouseMove
    .map(event => {

        return {
            x: event["clientX"],
            y: Setting.HERO_Y
        };
    })
    .startWith({
        x: canvas.width / 2,
        y: Setting.HERO_Y
    });

export default SpaceShip;