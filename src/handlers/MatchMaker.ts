import _ from "lodash";
import { Card } from "./CardHandler";
import { Fighter } from "./FighterHandler";

function MatchMaker(cards: Card[], roster: Fighter[][]): void{

    let wcNum: number = roster.length;
    let wcSize: number = roster[0].length;

    for(let i = 0; i < wcNum; i++){
        for(let j = 0; j < wcSize; j++){
            
            if(roster[i][j].hasFight) continue;
            let candidate: number = 0.0;
            let candInd: number = -1;
            let score: number = 0.0;
            let type = roster[i][j].type;

            if(type === 0){ // champs
                for(let k = 0; k < wcSize; k++){
                    if(j === k) continue;
                    if(roster[i][k].hasFight) continue;
                    if(roster[i][j].type === 3) continue;

                    score = (roster[i][k].popularity / (100.0 / .35)) + (roster[i][k].overall / (100.0 / .25)) + (roster[i][k].belts / (3 / .3));
                    score = _.clamp(score + _.random(-.05, .05, true), 0, 100);

                    if(score > candidate) {
                        candidate = score;
                        candInd = k;
                    }
                }
            }
            else if(type === 1){ // prospects
                for(let k = 0; k < wcSize; k++){
                    if(roster[i][k].type !== 3) continue;
                    if(j === k) continue;
                    if(roster[i][k].hasFight) continue;
                    if(roster[i][k].overall >= roster[i][j].overall) continue;

                    score = (.7 / (Math.abs(roster[i][k].overall - (roster[i][j].overall - 5)) + 1));
                    score = _.clamp(score + _.random(-.05, .05, true), 0, 100);

                    if(score > candidate){
                        candidate = score;
                        candInd = k;
                    }
                }
            }
            else if(type === 2){ // legends
                for(let k = 0; k < wcSize; k++){
                    if(j === k) continue;
                    if(roster[i][k].hasFight) continue;

                    score = (roster[i][k].popularity / (100.0 / .4)) - (roster[i][k].overall / (100.0 / .3)) + (roster[i][k].belts / (3 / .2));
                    score = _.clamp(score + _.random(-.05, .05, true), 0, 100);

                    if(score > candidate){
                        candidate = score;
                        candInd = k;
                    }
                }
            }
            else if(type === 3){ // cans
                for(let k = 0; k < wcSize; k++){
                    if(roster[i][k].type !== 3) continue;
                    if(j === k) continue;
                    if(roster[i][k].hasFight) continue;
                    
                    score = (.3 / (Math.abs(roster[i][k].overall - roster[i][j].overall) + 1));
                    score = _.clamp(score + _.random(-.05, .05, true), 0, 100);

                    if(score > candidate){
                        candidate = score;
                        candInd = k;
                    }
                }
            }
            else if(type === 4){ // average
                for(let k = 0; k < wcSize; k++){
                    if(roster[i][k].type !== 4) continue;
                    if(j === k) continue;
                    if(roster[i][k].hasFight) continue;
                    
                    score = (.3 / (Math.abs(roster[i][k].overall - roster[i][j].overall) + 1));
                    score = _.clamp(score + _.random(-.05, .05, true), 0, 100);

                    if(score > candidate){
                        candidate = score;
                        candInd = k;
                    }
                }
            }

            if(_.random(0, 1, true) < candidate){
                roster[i][j].hasFight = true;
                roster[i][candInd].hasFight = true;
                let match: Fighter[] = [roster[i][j], roster[i][candInd]];
                let matchId = {
                    fone: roster[i][j].id, 
                    ftwo: roster[i][candInd].id, 
                    weight: roster[i][j].weightClass
                }
                let loc = _.random(0, 14, false)
                cards[loc].matches.push(match);
                cards[loc].matchId.push(matchId);
                console.log("Match Found");
            }
            
        }
    }

}

export default MatchMaker;