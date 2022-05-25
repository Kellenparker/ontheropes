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

        // Check if cards is already saved in browser
        if(window.localStorage.getItem('cards') === null){
            this.cards = new CardHandler(null);
            window.localStorage.setItem('cards', JSON.stringify(this.cards));

            MatchMaker(this.cards.weeks, this.roster, true);

            for(let i = 0; i < 4; i++){
                this.cards.structureCard(i);
            }
        }
        else{
            let obj = window.localStorage.getItem('cards') as string;
            this.cards = new CardHandler(JSON.parse(obj), this.roster);
        }
    }

    advance = (amt: number) => {
        for (let i = 0; i < amt; i++) {
            this.cards.advance();
            this.roster.advance(this.time.tick);
            MatchMaker(this.cards.weeks, this.roster, false);
            this.cards.structureCard(4);
            this.time.tick++;
            this.time.week++;
            if (this.time.week > 52) {
                this.time.week = 1;
                this.time.year++;
                this.roster.age();
            }
            console.log(this.cards.getWeek());
            console.log(this.roster.getPercentWithFight() + "%");
        }
        window.localStorage.setItem('time', JSON.stringify(this.time));
        window.localStorage.setItem('roster', JSON.stringify(this.roster));
        window.localStorage.setItem('cards', JSON.stringify(this.cards));

        console.log(this.roster.fighters);

    };

    getDateStr = () =>
        "Week " + this.time.week.toString() + ", " + this.time.year.toString();

    getWeightClass = (index: number) => this.roster.getWeightClass(index);

    getRoster = () => this.roster.fighters;

    getCards = () => this.cards.weeks;
}

export default League;
