import FighterHandler, { Fighter } from "./FighterHandler";
import * as _ from "lodash";
import Fight from "./Fight";

export interface Match {
    fighterOne: Fighter;
    fighterTwo: Fighter;
    result?: number;
    weight: number;
    hype: number;
    matchId: {
        fone: string;
        ftwo: string;
    };
}

export interface Card {
    date: number;
    matches: Match[];
    rating?: number;
    hype?: number;
    attendance?: number;
    revenue?: number;
}

export interface Week {
    cards: Card[];
    numFights: number;
}

interface ImportCard {
    weeks: Week[];
}

class CardHandler {
    weeks: Week[];
    private cardBuffer = 15;
    private tick;

    constructor(localCards: ImportCard | null, roster: FighterHandler | null = null) {
        this.tick = 0;
        if (localCards === null) {
            this.weeks = [];
            for (let i = 0; i < this.cardBuffer; i++) {
                this.weeks[i] = {
                    cards: [],
                    numFights: 0
                };
                this.weeks[i].cards[0] = {
                    date: i,
                    matches: []
                };
            }
        } else {
            this.weeks = [];
            for (let i = 0; i < this.cardBuffer; i++) {
                this.weeks[i].numFights = localCards.weeks[i].numFights;

                let len = localCards.weeks[i].cards.length;
                this.weeks[i].cards = [];
                for (let j = 0; j < len; j++){
                    let matches: Match[] = [];
                    let matchups = localCards.weeks[i].cards[j].matches;

                    matchups.forEach((match) => {
                        let fighterOne = _.find(roster?.fighters[match.weight], { id: match.matchId.fone });
                        let fighterTwo = _.find(roster?.fighters[match.weight], { id: match.matchId.ftwo });

                        matches.push({
                            fighterOne: fighterOne!,
                            fighterTwo: fighterTwo!,
                            weight: match.weight,
                            hype: match.hype,
                            matchId: match.matchId
                        });
                    });

                    this.weeks[i].cards[j] = {
                        date: i,
                        matches: matches
                    };
                }
            }
        }

        console.log(this.weeks);
    }

    advance = () => {
        this.exec();
        this.weeks.shift();
        this.weeks[this.cardBuffer - 1] = {
            cards: [],
            numFights: 0
        };
        this.weeks[this.cardBuffer - 1].cards[0] = {
            date: this.tick + this.cardBuffer,
            matches: []
        };
        for(let i = 0; i < this.cardBuffer - 1; i++){

        }
        this.tick++;
    };

    exec = () => {
        let len = this.weeks[0].cards.length;
        for(let i = 0; i < len; i++){
            this.weeks[0].cards[i].matches.forEach((match) => {
                Fight(match);
            });
        }
    };

    getWeek = () => this.weeks;
}

export default CardHandler;
