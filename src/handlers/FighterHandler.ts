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
    footwork: number;
    motivation: number;
    fights: number;
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

    getOverall = (fighter: Fighter) => _.clamp(Math.floor(((fighter.defense * 3) + (fighter.timing * 3) + (fighter.speed * 3) + (fighter.power * 3) + (fighter.footwork * 3) +
                                                (fighter.stamina * 2) + (fighter.chin) + (fighter.reach) + (fighter.height)) / 20), 0, 100);

    generateFighter = (wc: number): Fighter => {
        let age = _.random(17, 44, false);
        let height = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let fights = Math.floor((age - 17) * _.random(1, 4, false));
        let reach =  Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], height, 30, 0));
        let stamina =  Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let chin = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let damage = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], (age - 17) * 3, 30, 0));
        let power = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let speed = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let timing = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let defense = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let footwork = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let motivation = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let fighter: Fighter = {
            name: human_names.maleRandom() + " " + human_names.allRandom(),
            age: age,
            weightClass: wc,
            height: height,
            reach: reach,
            stamina: stamina,
            chin: chin,
            damage: damage,
            power: power,
            speed: speed,
            timing: timing,
            defense: defense,
            footwork: footwork,
            motivation: motivation,
            fights: fights,
            wins: 0,
            losses: 0,
            draws: 0,
            earnings: 0,
            success: 0,
            peakStatus: 0,
            overall: 0
        }

        fighter.overall = this.getOverall(fighter);
        fighter.wins = _.clamp(Math.ceil(fighter.fights * (fighter.overall / 80)) + _.random(-2, 2, false), 0, fighter.fights);
        fighter.draws = Math.floor(_.random(0, (fighter.fights - fighter.wins) / 10, false));
        fighter.losses = fighter.fights - (fighter.wins + fighter.draws);

        return fighter;
    }
}

export default FighterHandler;
