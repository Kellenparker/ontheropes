import FighterHandler, { Fighter } from "./FighterHandler";
import * as _ from "lodash";
import Fight from "./Fight";

export interface Match {
    fighterOne: Fighter;
    fighterTwo: Fighter;
    result?: number;
}

export interface Card {
    date: number;
    matches: Match[];
    matchId: {
        fone: string;
        ftwo: string;
        weight: number;
    }[];
    rating?: number;
    hype?: number;
    attendance?: number;
    revenue?: number;
}

interface ImportCard {
    cards: Card[];
}

class CardHandler {
    private cards: Card[];
    private cardBuffer = 15;
    private tick;

    constructor(localCards: ImportCard | null, roster: FighterHandler | null = null) {
        this.tick = 0;
        if (localCards === null) {
            this.cards = [];
            for (let i = 0; i < this.cardBuffer; i++) {
                this.cards[i] = {
                    date: i,
                    matches: [],
                    matchId: [],
                };
            }
        } else {
            this.cards = [];
            for (let i = 0; i < this.cardBuffer; i++) {
                let matches: Match[] = [];
                let matchups = localCards.cards[i].matchId;

                matchups.forEach((match) => {
                    let fighterOne = _.find(roster?.fighters[match.weight], { id: match.fone });
                    let fighterTwo = _.find(roster?.fighters[match.weight], { id: match.ftwo });

                    matches.push({
                        fighterOne: fighterOne!,
                        fighterTwo: fighterTwo!,
                    });
                });

                this.cards[i] = {
                    date: i,
                    matches: matches,
                    matchId: matchups,
                };
            }
            console.log(this.cards);
        }
    }

    advance = () => {
        this.exec();
        console.log(this.cards.shift());
        this.cards[this.cardBuffer - 1] = {
            date: this.tick + this.cardBuffer,
            matches: [],
            matchId: [],
        };
        this.tick++;
    };

    exec = () => {
        this.cards[0].matches.forEach((match) => {
            Fight(match);
        });
    };

    getCards = () => this.cards;
}

export default CardHandler;
