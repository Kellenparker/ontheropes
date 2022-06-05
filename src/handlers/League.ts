import FighterHandler from "./FighterHandler";
import CardHandler from "./CardHandler";
import MatchMaker from "./MatchMaker";
import {Save} from "./Storage";
import Time from "./Time";

export interface LocalTime {
    tick: number,
    startYear: number,
}

export interface ImportData {
    leagueTime: LocalTime,
    time: Time,
    roster: FighterHandler,
    cards: CardHandler,
    init: boolean
}

class League {
    leagueTime: LocalTime;
    time: Time;
    roster: FighterHandler;
    cards: CardHandler;

    constructor(data: ImportData) {
        this.leagueTime = data.leagueTime;
        this.time = data.time;
        this.roster = data.roster;
        this.cards = data.cards;

        console.log(this.leagueTime);
        console.log(this.time);
        console.log(this.roster);
        console.log(this.cards);

        if(data.init){
            MatchMaker(this.cards.weeks, this.roster, this.time, true);

            for(let i = 0; i < 4; i++){
                this.cards.structureCard(i);
            }
        }

    }

    advance = (amt: number) => {
        for (let i = 0; i < amt; i++) {
            this.leagueTime.tick++;
            this.time.advance();
            this.cards.advance();
            this.roster.advance(this.leagueTime.tick);
            if(this.leagueTime.tick % 52 === 0) {
                this.roster.age();
                this.cards.filter();
            }
            MatchMaker(this.cards.weeks, this.roster, this.time, false);
            this.cards.structureCard(4);
            console.log(this.roster.getPercentWithFight() + "%");
            console.log(this.cards.weeks);
        }
        
        Save(this.leagueTime, this.roster, this.cards);

    };

    getWeightClass = (index: number) => this.roster.getWeightClass(index);

    getRoster = () => this.roster.fighters;

    getCards = () => this.cards.weeks;

    getResults = () => this.cards.results;
}

export default League;
