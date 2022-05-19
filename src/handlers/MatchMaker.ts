import _ from "lodash";
import { Match, Week } from "./CardHandler";
import FighterHandler from "./FighterHandler";

function MatchMaker(weeks: Week[], roster: FighterHandler): void {
    let fighters = roster.fighters;
    let wcNum: number = fighters.length;
    let wcSize: number = fighters[0].length;

    for (let i = 0; i < wcNum; i++) {
        for (let j = 0; j < wcSize; j++) {
            if (fighters[i][j].hasFight) continue;
            let candidate: number = 0.0;
            let candInd: number = -1;
            let score: number = 0.0;
            let type = fighters[i][j].type;

            if (type === 0) {
                // champs
                for (let k = 0; k < wcSize; k++) {
                    if (j === k) continue;
                    if (fighters[i][k].hasFight) continue;
                    if (fighters[i][j].type === 3) continue;

                    score =
                        fighters[i][k].popularity / (100.0 / 0.35) +
                        fighters[i][k].overall / (100.0 / 0.25) +
                        fighters[i][k].belts / (3 / 0.3);
                    score = _.clamp(score + _.random(-0.05, 0.05, true), 0, 100);

                    if (score > candidate) {
                        candidate = score;
                        candInd = k;
                    }
                }
            } else if (type === 1) {
                // prospects
                for (let k = 0; k < wcSize; k++) {
                    if (fighters[i][k].type !== 3) continue;
                    if (j === k) continue;
                    if (fighters[i][k].hasFight) continue;
                    if (fighters[i][k].overall >= fighters[i][j].overall) continue;

                    score = 0.7 / (Math.abs(fighters[i][k].overall - (fighters[i][j].overall - 5)) + 1);
                    score = _.clamp(score + _.random(-0.05, 0.05, true), 0, 100);

                    if (score > candidate) {
                        candidate = score;
                        candInd = k;
                    }
                }
            } else if (type === 2) {
                // legends
                for (let k = 0; k < wcSize; k++) {
                    if (j === k) continue;
                    if (fighters[i][k].hasFight) continue;

                    score =
                        fighters[i][k].popularity / (100.0 / 0.4) -
                        fighters[i][k].overall / (100.0 / 0.3) +
                        fighters[i][k].belts / (3 / 0.2);
                    score = _.clamp(score + _.random(-0.05, 0.05, true), 0, 100);

                    if (score > candidate) {
                        candidate = score;
                        candInd = k;
                    }
                }
            } else if (type === 3) {
                // cans
                for (let k = 0; k < wcSize; k++) {
                    if (fighters[i][k].type !== 3) continue;
                    if (j === k) continue;
                    if (fighters[i][k].hasFight) continue;

                    score = 0.3 / (Math.abs(fighters[i][k].overall - fighters[i][j].overall) + 1);
                    score = _.clamp(score + _.random(-0.05, 0.05, true), 0, 100);

                    if (score > candidate) {
                        candidate = score;
                        candInd = k;
                    }
                }
            } else if (type === 4) {
                // average
                for (let k = 0; k < wcSize; k++) {
                    if (fighters[i][k].type !== 4) continue;
                    if (j === k) continue;
                    if (fighters[i][k].hasFight) continue;

                    score = 0.3 / (Math.abs(fighters[i][k].overall - fighters[i][j].overall) + 1);
                    score = _.clamp(score + _.random(-0.05, 0.05, true), 0, 100);

                    if (score > candidate) {
                        candidate = score;
                        candInd = k;
                    }
                }
            }

            if (_.random(0, 1, true) < candidate && candInd !== -1) {
                fighters[i][j].hasFight = true;
                fighters[i][candInd].hasFight = true;
                let hype = fighters[i][j].overall + fighters[i][candInd].overall + (fighters[i][j].belts > 1 ? 100 : 0 ) + (fighters[i][candInd].belts > 1 ? 100 : 0 )
                let match: Match = {
                    fighterOne: fighters[i][j],
                    fighterTwo: fighters[i][candInd],
                    weight: fighters[i][j].weightClass,
                    hype: hype,
                    matchId: {
                        fone: fighters[i][j].id,
                        ftwo: fighters[i][candInd].id,
                    }
                };
                let loc = _.random(4, 14, false);
                weeks[loc].cards[0].matches.push(match);
                weeks[loc].numFights++;
                console.log("Match Found");
            }
        }
    }
}

export default MatchMaker;
