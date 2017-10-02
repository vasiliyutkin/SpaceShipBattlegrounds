import * as Rx from "rx";
import { isVisible } from "./Helpers";
import { canvas } from "./Canvas";
import Settings from "./Settings";

const Enemies: Rx.Observable<{}> = Rx.Observable
    .interval(Settings.ENEMY_FREQ)
    .scan(enemyArray => {

        const enemy = {
            x: Number(Math.random() * canvas.width),
            y: -30,
            shots: [],
            isDead: false
        };

        Rx.Observable
            .interval(Settings.ENEMY_SHOOTING_FREQ)
            .subscribe(() => {

                if (!enemy.isDead) {

                    enemy.shots.push({
                        x: enemy.x,
                        y: enemy.y
                    });
                }

                enemy.shots = enemy.shots.filter(isVisible);
            });

        enemyArray.push(enemy);

        return enemyArray
            .filter(isVisible)
            .filter(enemy => !(enemy.isDead && enemy.shots.length === 0));
    }, []);

export default Enemies;