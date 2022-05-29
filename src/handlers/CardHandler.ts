import FighterHandler, { Fighter } from "./FighterHandler";
import * as _ from "lodash";
import Fight from "./Fight";

export interface Match {
    fighterOne: Fighter;
    fighterTwo: Fighter;
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

interface ImportCard {
    weeks: Week[];
    results: Result[];
}

class CardHandler {
    weeks: Week[];
    results: Result[];
    private cardBuffer = 15;
    private tick;

    constructor(localCards: ImportCard | null, result: Result[] | null, roster: FighterHandler | null = null) {
        this.tick = 0;
        if (localCards === null) {
            this.results = [];
            this.weeks = [];
            for (let i = 0; i < this.cardBuffer; i++) {
                this.weeks[i] = {
                    date: i,
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
                    date: localCards.weeks[i].date,
                    numFights: localCards.weeks[i].numFights,
                    cards: []
                };

                let len = localCards.weeks[i].cards.length;
                for (let j = 0; j < len; j++){
                    let matches: Match[] = [];
                    let matchups = localCards.weeks[i].cards[j].matches;

                    matchups.forEach((match) => {
                        let fighterOne = _.find(roster?.fighters[match.weight], { id: match.matchId.fone });
                        let fighterTwo = _.find(roster?.fighters[match.weight], { id: match.matchId.ftwo });

                        matches.push({
                            fighterOne: fighterOne!,
                            fighterTwo: fighterTwo!,
                            title: match.title,
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
            localCards.results.forEach(result => {
                let fighterOne = _.find(roster?.fighters[result.weight], { id: result.matchId.fone });
                let fighterTwo = _.find(roster?.fighters[result.weight], { id: result.matchId.ftwo });

                this.results.push({
                    fighterOne: fighterOne!,
                    fighterTwo: fighterTwo!,
                    matchId: result.matchId,
                    weight: result.weight,
                    title: result.title
                })
            });

        }

        console.log(this.weeks);
    }

    advance = () => {
        this.exec();
        this.weeks.shift();
        this.weeks[this.cardBuffer - 1] = {
            date: this.tick + this.cardBuffer,
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
            });
        }
    };

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
