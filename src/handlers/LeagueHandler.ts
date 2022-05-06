import FighterHandler from "./FighterHandler";
import CardHandler from "./CardHandler";
import MatchMaker from "./MatchMaker";

interface Time {
    tick: number;
    year: number;
    week: number;
}

class League {
    time: Time;
    roster: FighterHandler;
    cards: CardHandler;

    constructor(start: number) {
        // Check if time is already saved in browser
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

        // Check if roster is already saved in browser
        if(window.localStorage.getItem('roster') === null){
            this.roster = new FighterHandler(null);
            window.localStorage.setItem('roster', JSON.stringify(this.roster));
        }
        else{
            let obj = window.localStorage.getItem('roster') as string;
            this.roster = new FighterHandler(JSON.parse(obj));
        }

        this.cards = new CardHandler(this.time.tick);

    }

    advance = (amt: number) => {
        for (let i = 0; i < amt; i++) {
            this.roster.advance(this.time.tick);
            this.cards.advance();
            MatchMaker(this.cards.getCards(), this.roster.getRoster());
            this.time.tick++;
            this.time.week++;
            if (this.time.week > 52) {
                this.time.week = 1;
                this.time.year++;
                this.roster.age();
            }
        }
        window.localStorage.setItem('time', JSON.stringify(this.time));
        window.localStorage.setItem('roster', JSON.stringify(this.roster));

    };

    getDateStr = () =>
        "Week " + this.time.week.toString() + ", " + this.time.year.toString();

    getWeightClass = (index: number) => this.roster.getWeightClass(index);

    getRoster = () => this.roster.getRoster();
}

export default League;
