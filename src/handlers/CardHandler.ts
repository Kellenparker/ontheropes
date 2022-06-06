import FighterHandler, { Fighter } from "./FighterHandler";
import * as _ from "lodash";
import Fight from "./Fight";
import Time from "./Time";

export interface Match {
    fighterOne: Fighter;
    fighterTwo: Fighter;
    dateStr: string;
    title: boolean;
    rounds: number;
    result?: number;
    weight: number;
    hype: number;
    matchId: {
        fone: string;
        ftwo: string;
    };
}

export interface Card {
    matches: Match[];
    hype?: number;
    attendance?: number;
    revenue?: number;
}

export interface Week {
    date: number;
    dateStr: string;
    cards: Card[];
    numFights: number;
}

export interface Result {
    fighterOne: Fighter;
    fighterTwo: Fighter;
    matchId: {
        fone: string;
        ftwo: string;
    };
    weight: number;
    title: boolean;
}

class CardHandler {
    weeks: Week[];
    time: Time;
    results: Result[];
    roster: FighterHandler;
    private cardBuffer = 15;
    private tick;

    constructor(time: Time, roster: FighterHandler, localCards: Week[] | null = null, result: Result[] | null = null) {
        this.tick = 0;
        this.time = time;
        this.roster = roster;
        
        if (localCards === null) {
            this.results = [];
            this.weeks = [];
            for (let i = 0; i < this.cardBuffer; i++) {
                this.weeks[i] = {
                    date: i,
                    dateStr: this.time.getFutureDate(i),
                    cards: [],
                    numFights: 0
                };
                this.weeks[i].cards[0] = {
                    matches: []
                };
            }
        } else {
            this.results = result!;
            this.weeks = [];
            for (let i = 0; i < this.cardBuffer; i++) {
                this.weeks[i] = {
                    date: localCards[i].date,
                    dateStr: localCards[i].dateStr,
                    numFights: localCards[i].numFights,
                    cards: []
                };

                let len = localCards[i].cards.length;
                for (let j = 0; j < len; j++){
                    let matches: Match[] = [];
                    let matchups = localCards[i].cards[j].matches;

                    matchups.forEach((match) => {
                        let fighterOne = _.find(roster?.fighters[match.weight], { id: match.matchId.fone });
                        let fighterTwo = _.find(roster?.fighters[match.weight], { id: match.matchId.ftwo });

                        matches.push({
                            fighterOne: fighterOne!,
                            fighterTwo: fighterTwo!,
                            title: match.title,
                            dateStr: match.dateStr,
                            rounds: match.rounds,
                            weight: match.weight,
                            hype: match.hype,
                            matchId: match.matchId
                        });
                    });

                    this.weeks[i].cards[j] = {
                        matches: matches
                    };
                }
            }

            this.results = [];
            if(result !== null){
                result!.forEach(result => {
                    let fighterOne = _.find(roster?.fighters[result.weight], { id: result.matchId.fone });
                    let fighterTwo = _.find(roster?.fighters[result.weight], { id: result.matchId.ftwo });
    
                    this.results.push({
                        fighterOne: fighterOne!,
                        fighterTwo: fighterTwo!,
                        matchId: result.matchId,
                        weight: result.weight,
                        title: result.title
                    });
                });
            }

        }

    }

    advance = () => {
        this.exec();
        this.weeks.shift();
        this.weeks[this.cardBuffer - 1] = {
            date: this.tick + this.cardBuffer,
            dateStr: this.time.getFutureDate(this.cardBuffer),
            cards: [],
            numFights: 0
        };
        this.weeks[this.cardBuffer - 1].cards[0] = {
            matches: []
        };

        this.tick++;
    };

    exec = () => {
        let len = this.weeks[0].cards.length;
        
        this.results = [];
        for(let i = 0; i < len; i++){
            this.weeks[0].cards[i].matches.forEach((match, j) => {
                let result: Result = Fight(match);
                if(j === 0) this.results.push(result);
                this.roster.postFight(match.fighterOne);
                this.roster.postFight(match.fighterTwo);
            });
        }
    };

    filter = () => {
        console.log(this.results);
        this.results.forEach((result, i, obj) => {
            if(result.fighterOne.retired === 2 || result.fighterTwo.retired === 2){
                console.log(obj[i]);
                obj.splice(i, 1);
            }
        });
    }

    structureCard = (tick: number) => {
        let numCards = _.clamp(Math.floor(this.weeks[tick].numFights / 7), 1, 1000);
        let fights: Match[] = _.orderBy(this.weeks[tick].cards[0].matches, "hype", "desc");
        this.weeks[tick].cards[0].matches = [];

        for(let i = 0; i < numCards; i++){
            this.weeks[tick].cards[i] = {
                matches: []
            };
        }

        for(let i = 0; i < fights.length; i++){
            this.weeks[tick].cards[i % numCards].matches.push(fights[i]);
        }

        for(let i = 0; i < numCards; i++){
            let sum = 0;
            this.weeks[tick].cards[i].matches.forEach(match => {
                sum += match.hype;
            });
            this.weeks[tick].cards[i].hype = sum;
        }
        
    };

    getWeek = () => this.weeks;
}

export default CardHandler;
