import FighterHandler from "./FighterHandler";
import CardHandler from "./CardHandler";
import MatchMaker from "./MatchMaker";
import Time from "./Time";

interface LeagueTime {
    tick: number;
    startYear: number;
}

class League {
    leagueTime: LeagueTime;
    time: Time;
    roster: FighterHandler;
    cards: CardHandler;

    constructor(start: number) {
        // Check if time is already saved in browser
        if(window.localStorage.getItem('leagueTime') === null){
            this.leagueTime = {
                tick: 0,
                startYear: start,
            };
            window.localStorage.setItem('leagueTime', JSON.stringify(this.leagueTime));
        }
        else{
            let obj = window.localStorage.getItem('leagueTime') as string;
            this.leagueTime = JSON.parse(obj);
        }
        
        this.time = new Time(this.leagueTime.startYear, this.leagueTime.tick);

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
        if(window.localStorage.getItem('weeks') === null){
            this.cards = new CardHandler(this.time, this.roster);
            window.localStorage.setItem('weeks', JSON.stringify(this.cards.weeks));

            MatchMaker(this.cards.weeks, this.roster, this.time, true);

            for(let i = 0; i < 4; i++){
                this.cards.structureCard(i);
            }
        }
        else{
            let cards = window.localStorage.getItem('weeks') as string;
            let result = window.localStorage.getItem('result') as string;
            this.cards = new CardHandler(this.time, this.roster, JSON.parse(cards), JSON.parse(result));
        }

        console.log(this.cards.weeks);
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
        window.localStorage.setItem('leagueTime', JSON.stringify(this.leagueTime));
        window.localStorage.setItem('roster', JSON.stringify(this.roster));
        window.localStorage.setItem('weeks', JSON.stringify(this.cards.weeks));
        window.localStorage.setItem('result', JSON.stringify(this.cards.results));
    };

    getWeightClass = (index: number) => this.roster.getWeightClass(index);

    getRoster = () => this.roster.fighters;

    getCards = () => this.cards.weeks;

    getResults = () => this.cards.results;
}

export default League;
