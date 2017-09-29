import { canvas, ctx } from "./Canvas";

const paintStars = stars => {

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";

    stars.forEach(star => {

        ctx.fillRect(star.x, star.y, star.size, star.size);
    })
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

const paintSpaceShip = (x: number, y: number) => {

    drawTriangle(x, y, 20, "#ff0000", "up");
};

const renderScene = actors => {

    paintStars(actors.stars);
    paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
};

export { paintStars, drawTriangle, paintSpaceShip, renderScene };