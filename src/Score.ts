import * as Rx from "rx";

const ScoreSubject: Rx.Subject<{}> = new Rx.Subject();
const Score: Rx.Observable<{}> = ScoreSubject
    .scan((prev: number, curr: number) => {

        return prev + curr;
    }, 0)
    .concat(Rx.Observable.return(0));

export { ScoreSubject, Score };