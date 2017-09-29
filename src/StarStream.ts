import * as Rx from "rx";
import { canvas } from "./Canvas";

const SPEED: number = 40;
const STAR_NUMBER: number = 250;

const StarStream = Rx.Observable.range(1, STAR_NUMBER)
    .map(() => {

        return {
            x: Number(Math.random() * canvas.width),
            y: Number(Math.random() * canvas.height),
            size: Math.random() * 3 + 1
        };
    })
    .toArray()
    .flatMap(starArray => {

        return Rx.Observable.interval(SPEED).map(() => {

            starArray.forEach(star => {

                if (star.y > canvas.height) star.y = 0;
                star.y += 3;
            });

            return starArray;
        })
    });

export default StarStream;