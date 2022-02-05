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
    openDB("db2", 1, {
        upgrade(db) {
            db.createObjectStore("store3", { keyPath: "id" });
            db.createObjectStore("store4", { autoIncrement: true });
        },
    });
}
export async function demo2() {
    const db1 = await openDB("db1", 1);
    db1.add("store1", "hello world", "message");
    db1.add("store1", true, "delivered");
    db1.close();
}

class League {
    time: Time;
    roster: FighterHandler;

    constructor(start: number) {
        demo1();
        demo2();

        this.time = {
            tick: 0,
            year: start,
            week: 1,
        };

        this.roster = new FighterHandler();
        console.log(this.roster.getRoster());
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
    };

    getDateStr = () =>
        "Week " + this.time.week.toString() + ", " + this.time.year.toString();

    getWeightClass = (index: number) => this.roster.getWeightClass(index);
}

export default League;
