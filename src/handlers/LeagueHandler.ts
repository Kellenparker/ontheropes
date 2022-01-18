import { start } from "repl";
import FighterHandler from "./FighterHandler";

interface Time {
    tick: number;
    year: number;
    week: number;
}

class League {
    time: Time;

    constructor(start: number) {
        this.time = {
            tick: 0,
            year: start,
            week: 1,
        };

        const roster = new FighterHandler();
        console.log(roster.getRoster());
    }

    advance = (amt: number) => {
        console.log("advancing");
        for (let i = 0; i < amt; i++) {
            this.time.tick++;
            this.time.week++;
            if (this.time.week > 52) {
                this.time.week = 1;
                this.time.year++;
            }
        }
    };

    getDateStr = () =>
        "Week " + this.time.week.toString() + ", " + this.time.year.toString();
}

export default League;
