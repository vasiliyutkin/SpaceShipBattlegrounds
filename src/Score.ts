import * as Rx from "rx";

let currentScore;
export const getScore: Function = (): number => currentScore || 0;
export const resetScore: Function = () => currentScore = 0;

export const ScoreSubject: Rx.Subject<{}> = new Rx.Subject();
export const Score: Rx.Observable<{}> = ScoreSubject
    .scan((prev: number, curr: number) => {

        currentScore = prev + curr;
        return currentScore;
    }, 0)
    .startWith(0);