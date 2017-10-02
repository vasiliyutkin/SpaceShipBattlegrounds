import { canvas, ctx } from "./Canvas";
import { ScoreSubject } from "./Score";
import Settings from "./Settings";

interface ITarget {
    x: number,
    y: number
}

const collision = (target1: ITarget, target2: ITarget) => {

    return ((target1.x > (target2.x - 20))
        && (target1.x < (target2.x + 20)))
        && ((target1.y > (target2.y - 20))
        && (target1.y < (target2.y + 20)));
};

export const isVisible = (target: ITarget) => {

    return (target.x > -40)
        && (target.x < (canvas.width + 40))
        && (target.y > -40)
        && (target.y < (canvas.height + 40));
};

const getRandomInt = (min: number, max:number) => {

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const drawTriangle = (x: number, y: number, width: number, color: string, direction: string) => {

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - width, y);
    ctx.lineTo(x, direction == "up" ? y - width : y + width);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x - width, y);
    ctx.fill();
};

const paintStars = stars => {

    ctx.fillStyle = Settings.STARFIELD_MAIN_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = Settings.STARFIELD_SECONDARY_COLOR;
    stars.forEach(star => ctx.fillRect(star.x, star.y, star.size, star.size))
};

const paintSpaceShip = (x: number, y: number) => drawTriangle(x, y, Settings.SHIP_SIZE, Settings.SPACESHIP_COLOR, "up");

const paintEnemies = (enemies) => {

    enemies.forEach(enemy => {

        enemy.y += 5;
        enemy.x += getRandomInt(-15, 15);
        if (!enemy.isDead) drawTriangle(enemy.x, enemy.y, Settings.SHIP_SIZE, Settings.ENEMY_SHIPS_COLOR, "down");

        enemy.shots.forEach(shot => {

            shot.y += Settings.SHOOTING_SPEED;
            drawTriangle(shot.x, shot.y, Settings.SHOT_SIZE, Settings.ENEMY_SHOTS_COLOR, "down");
        });
    });
};

const paintScore = score => {

    ctx.fillStyle = Settings.SCORE_COLOR;
    ctx.font = Settings.SCORE_FONT;
    ctx.fillText(`Score: ${score}`, 40, 43);
};

const paintHeroShots = (heroShots, enemies) => {

    heroShots.forEach((shot, i) => {

        for (let l = 0; l < enemies.length; l++) {

            const enemy = enemies[l];

            if (!enemy.isDead && collision(shot, enemy)) {

                ScoreSubject.onNext(Settings.SCORE_INCREASE);
                enemy.isDead = true;
                shot.x = shot.y = -100;
                break;
            }
        }

        shot.y -= Settings.SHOOTING_SPEED;
        drawTriangle(shot.x, shot.y, Settings.SHOT_SIZE, Settings.HERO_SHOTS_COLOR, "up");
    });
};

export const gameOver = (ship, enemies) => {

    return enemies.some(enemy => {

        if (collision(ship, enemy)) return true;

        return enemy.shots.some(shot => {

            return collision(ship, shot);
        });
    });
};

export const paintGameEnding = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.body.removeChild(canvas);
    document.body.classList.add("gameOver");
};

export const renderScene = actors => {

        paintStars(actors.stars);
        paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
        paintEnemies(actors.enemies);
        paintHeroShots(actors.heroShots, actors.enemies);
        paintScore(0);
};