import { Card } from "./CardHandler";
import { Fighter } from "./FighterHandler";

function MatchMaker(cards: Card[], roster: Fighter[][]): void{

    let wcNum: number = roster.length;
    let wcSize: number = roster[0].length;

    for(let i = 0; i < wcNum; i++){
        for(let j = 0; j < wcSize; j++){
            
            
            if(roster[i][j].hasFight) continue;
            let score: number = 0.0;

            for(let k = 0; k < wcSize; k++){

            }

        }
    }

}

export default MatchMaker;