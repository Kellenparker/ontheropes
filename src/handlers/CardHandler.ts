import { Fighter } from "./FighterHandler";

export interface Card {
    date: number;
    matches: Fighter[][];
    rating?: number;
    hype?: number;
    attendance?: number;
    revenue?: number;
}

class CardHandler {
    private cards: Card[];
    private cardBuffer = 15;
    private tick;

    constructor(tick: number){
        this.tick = 0;
        this.cards = [];
        for(let i = 0; i < this.cardBuffer; i++){
            this.cards[i] = {
                date: i,
                matches: []
            }
        }
        console.log(this.cards)
    }

    advance = () => {
        console.log(this.cards.shift());
        this.cards[this.cardBuffer - 1] = {
            date: this.tick + this.cardBuffer,
            matches: []
        }
        this.tick++;
        console.log(this.cards);
    }

    getCards = () => this.cards;


}

export default CardHandler;