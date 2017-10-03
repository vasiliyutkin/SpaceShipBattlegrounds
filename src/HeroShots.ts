import * as Rx from "rx";
import { canvas } from "./Canvas";
import Settings from "./Settings";
import SpaceShip from "./SpaceShip";

const clickStream: Rx.Observable<{}> = Rx.Observable.fromEvent(canvas, "click");
const PlayerFiring: Rx.Observable<{}> = clickStream.startWith({}).sample(200).timestamp();

const HeroShots: Rx.Observable<{}> = Rx.Observable
    .combineLatest(
        PlayerFiring,
        SpaceShip,
        (shotEvents, spaceShip) => {

            return {
                timestamp: shotEvents["timestamp"],
                x: spaceShip.x
            };
        }
    )
    .distinctUntilChanged(shot => shot["timestamp"])
    .scan((shotArray, shot) => {

        shotArray.push({ x: shot.x, y: Settings.HERO_Y });
        return shotArray;
    }, []);

export default HeroShots;