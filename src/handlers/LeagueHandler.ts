import FighterHandler from "./FighterHandler";
import { openDB } from "idb";

interface Time {
    tick: number;
    year: number;
    week: number;
}
export function demo1() {
    openDB("db1", 1, {
        upgrade(db) {
            db.createObjectStore("store1");
            db.createObjectStore("store2");
        },
    });
}

class League {
    time: Time;
    roster: FighterHandler;

    constructor(start: number) {
        demo1();

        if(window.localStorage.getItem('time') === null){
            this.time = {
                tick: 0,
                year: start,
                week: 1,
            };
            window.localStorage.setItem('time', JSON.stringify(this.time));
        }
        else{
            let obj = window.localStorage.getItem('time') as string;
            this.time = JSON.parse(obj);
        }

        
        this.roster = new FighterHandler();
    }

    advance = (amt: number) => {
        console.log("advancing");
        this.roster.advance();
        for (let i = 0; i < amt; i++) {
            this.time.tick++;
            this.time.week++;
            if (this.time.week > 52) {
                this.time.week = 1;
                this.time.year++;
            }
        }
        window.localStorage.setItem('time', JSON.stringify(this.time));
    };

    getDateStr = () =>
        "Week " + this.time.week.toString() + ", " + this.time.year.toString();

    getWeightClass = (index: number) => this.roster.getWeightClass(index);
}

export default League;
