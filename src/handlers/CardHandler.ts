import { Fighter } from "./FighterHandler";

export interface Card {
    date: number;
    matches: Fighter[][];
    rating?: number;
    hype?: number;
    attendance?: number;
    revenue?: number;
}

interface ImportCard {
    cards: Card[]
}

class CardHandler {
    private cards: Card[];
    private cardBuffer = 15;
    private tick;

    constructor(localCards: ImportCard | null){
        console.log(localCards);
        this.tick = 0;
        if(localCards === null){
            this.cards = [];
            for(let i = 0; i < this.cardBuffer; i++){
                this.cards[i] = {
                    date: i,
                    matches: []
                }
            }
        } else {
            this.cards = localCards.cards;
            console.log(this.cards);
        }
    }

    advance = () => {
        console.log(this.cards.shift());
        this.cards[this.cardBuffer - 1] = {
            date: this.tick + this.cardBuffer,
            matches: []
        }
        this.tick++;
    }

    getCards = () => this.cards;


}

export default CardHandler;