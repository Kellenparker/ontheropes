import FighterHandler, { Fighter } from "./FighterHandler";
import * as _ from "lodash";

export interface Card {
    date: number;
    matches: Fighter[][];
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
                let matchups = localCards.cards[i].matchId;
                let matches: Fighter[][] = [];

                matchups.forEach((match) => {
                    let fighterOne = _.find(roster?.roster[match.weight], { id: match.fone });
                    let fighterTwo = _.find(roster?.roster[match.weight], { id: match.ftwo });

                    matches.push([fighterOne!, fighterTwo!]);
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
        console.log(this.cards.shift());
        this.cards[this.cardBuffer - 1] = {
            date: this.tick + this.cardBuffer,
            matches: [],
            matchId: [],
        };
        this.tick++;
    };

    getCards = () => this.cards;
}

export default CardHandler;
