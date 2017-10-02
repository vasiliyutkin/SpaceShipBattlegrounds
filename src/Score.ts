import * as Rx from "rx";

export const ScoreSubject: Rx.Subject<{}> = new Rx.Subject();
export const Score: Rx.Observable<{}> = ScoreSubject
    .scan((prev: number, curr: number) => {

        return prev + curr;
    }, 0)
    .startWith(0);