import * as _ from "lodash";
import { randomTruncSkewNormal } from "../tools/rand";

var human_names = require("human-names");

export interface Fighter {
    name: string;
    age: number;
    weightClass: number;
    height: number;
    reach: number;
    stamina: number;
    chin: number;
    damage: number;
    power: number;
    speed: number;
    timing: number;
    defense: number;
    motivation: number;
    wins: number;
    losses: number;
    draws: number;
    earnings: number;
    success: number;
    peakStatus: number;
    overall: number;
}

const wcNum = 9;
const wcSize = 100;

class FighterHandler {
    private roster: Fighter[][];

    constructor() {
        this.roster = [];
        for (let i = 0; i < wcNum; i++) {
            this.roster[i] = [];
            for (let j = 0; j < wcSize; j++) {
                this.roster[i][j] = this.generateFighter(i);
            }
        }
    }

    getRoster = () => this.roster;

    getWeightClass = (index: number) => this.roster[index];

    generateFighter = (wc: number): Fighter => {
        let age = _.random(17, 44, false);
        let height = randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0);
        return {
            name: human_names.maleRandom() + " " + human_names.allRandom(),
            age: age,
            weightClass: wc,
            height: height,
            reach:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            stamina:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            chin:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            damage:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            power:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            speed:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            timing:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            defense:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            motivation:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            wins:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            losses:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            draws:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            earnings:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            success:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            peakStatus:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0),
            overall:  randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        }
    }
}

export default FighterHandler;
