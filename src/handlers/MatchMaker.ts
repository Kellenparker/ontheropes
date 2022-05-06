import _ from "lodash";
import { Card } from "./CardHandler";
import { Fighter } from "./FighterHandler";

function MatchMaker(cards: Card[], roster: Fighter[][]): void{

    let wcNum: number = roster.length;
    let wcSize: number = roster[0].length;

    for(let i = 0; i < wcNum; i++){
        for(let j = 0; j < wcSize; j++){
            
            if(roster[i][j].hasFight) continue;
            let score: number = 0.0;
            let scoreInd: number = -1;
            let candidate: number = 0.0;
            let type = roster[i][j].type;

            if(type === 0){ // champs
                for(let k = 0; k < wcSize; k++){
                    if(j === k) continue;
                    if(roster[i][k].hasFight) continue;
                    if(roster[i][j].type === 3) continue;

                    candidate = (roster[i][k].popularity / (100.0 / .4)) + (roster[i][k].overall / (100.0 / .3)) + (roster[i][k].belts / (3 / .3));
                    candidate = _.clamp(candidate + _.random(-.05, .05, true), 0, 100);

                    if(candidate > score) {
                        score = candidate;
                        scoreInd = k;
                    }
                }
            }
            else if(type === 1){ // prospects
                for(let k = 0; k < wcSize; k++){
                    if(roster[i][k].type !== 3) continue;
                    if(j === k) continue;
                    if(roster[i][k].hasFight) continue;
                    if(roster[i][k].overall >= roster[i][j].overall) continue;

                    candidate = (.8 / (Math.abs(roster[i][k].overall - (roster[i][j].overall - 5)) + 1));
                    candidate = _.clamp(candidate + _.random(-.05, .05, true), 0, 100);

                    if(candidate > score){
                        score = candidate;
                        scoreInd = k;
                    }
                }
            }
            else if(type === 2){ // legends
                for(let k = 0; k < wcSize; k++){
                    if(j === k) continue;
                    if(roster[i][k].hasFight) continue;

                    candidate = (roster[i][k].popularity / (100.0 / .5)) - (roster[i][k].overall / (100.0 / .2)) + (roster[i][k].belts / (3 / .3));
                    candidate = _.clamp(candidate + _.random(-.05, .05, true), 0, 100);

                    if(candidate > score){
                        score = candidate;
                        scoreInd = k;
                    }
                }
            }
            else if(type === 3){ // cans
                for(let k = 0; k < wcSize; k++){
                    if(roster[i][k].type !== 3) continue;
                    if(j === k) continue;
                    if(roster[i][k].hasFight) continue;
                    
                    candidate = (.4 / (Math.abs(roster[i][k].overall - roster[i][j].overall) + 1));
                    candidate = _.clamp(candidate + _.random(-.05, .05, true), 0, 100);

                    if(candidate > score){
                        score = candidate;
                        scoreInd = k;
                    }
                }
            }
            else if(type === 4){ // average
                for(let k = 0; k < wcSize; k++){
                    if(roster[i][k].type !== 4) continue;
                    if(j === k) continue;
                    if(roster[i][k].hasFight) continue;
                    
                    candidate = (.4 / (Math.abs(roster[i][k].overall - roster[i][j].overall) + 1));
                    candidate = _.clamp(candidate + _.random(-.05, .05, true), 0, 100);

                    if(candidate > score){
                        score = candidate;
                        scoreInd = k;
                    }
                }
            }
            
        }
    }

}

export default MatchMaker;