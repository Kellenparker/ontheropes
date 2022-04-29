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

    constructor(tick: number){
        let cardBuffer = 15;
        this.cards = [];
        for(let i = 0; i < cardBuffer; i++){
            this.cards[i] = {
                date: 0 + i,
                matches: []
            }
        }
        console.log(this.cards)
    }

}

export default CardHandler;