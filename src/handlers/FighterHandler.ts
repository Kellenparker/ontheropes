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
    changes: Changes;
    formatted: FormattedFighter;
}

export interface Changes {
    weightClass: number;
    stamina: number;
    chin: number;
    damage: number;
    power: number;
    speed: number;
    timing: number;
    defense: number;
    footwork: number;
}

export interface FormattedFighter {
    record: String;
    overall: String;
    streak: String;
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

    advance = () => {
        for (let i = 0; i < wcNum; i++)
            for (let j = 0; j < wcSize; j++)
                this.progress(this.roster[i][j]);
        console.log(this.roster);
    }

    getRoster = () => this.roster;

    getWeightClass = (index: number) => this.roster[index];

    getOverall = (fighter: Fighter) => _.clamp(Math.floor(((fighter.defense * 3) + (fighter.timing * 3) + (fighter.speed * 3) + (fighter.power * 3) + (fighter.footwork * 3) +
                                                (fighter.stamina * 2) + (fighter.chin) + (fighter.reach) + (fighter.height)) / 20), 0, 100);

    generateFighter = (wc: number): Fighter => {
        let age = _.random(17, 44, false);
        let height = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let fights = Math.floor((age - 17) * _.random(1, 3, false));
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
            peakStatus: _.clamp(Math.floor((age - 17) / _.random(7,11)), 0, 2),
            overall: 0,
            changes: {} as Changes,
            formatted: {} as FormattedFighter
        }

        fighter.overall = this.getOverall(fighter);
        fighter.wins = _.clamp(Math.ceil(fighter.fights * (fighter.overall / 80) * ((100 - fighter.age) / 60)) + _.random(-2, 2, false), 0, fighter.fights);
        fighter.draws = Math.floor(_.random(0, (fighter.fights - fighter.wins) / 10, false));
        fighter.losses = fighter.fights - (fighter.wins + fighter.draws);

        fighter.formatted = {
            record: fighter.wins + "-" + fighter.losses + "-" + fighter.draws,
            overall: fighter.overall.toString(),
            streak: "N/A"
        } 

        return fighter;
    }

    progress = (fighter: Fighter) => {

        const mot = fighter.motivation;
        if(fighter.peakStatus === 0){

            fighter.speed += _.random(0, (mot / 100) * 2, false);
            fighter.power += _.random(0, (mot / 100) * 2, false);
            fighter.timing += _.random(0, (mot / 100) * 2, false);
            fighter.footwork += _.random(0, (mot / 100) * 2, false);
            fighter.defense += _.random(0, (mot / 100) * 2, false);
            fighter.stamina += _.random(0, (mot / 100) * 2, false);

        }else if(fighter.peakStatus === 1){

            fighter.speed += _.random(0, (mot / 100), false);
            fighter.power += _.random(0, (mot / 100), false);
            fighter.timing += _.random(0, (mot / 100), false);
            fighter.footwork += _.random(0, (mot / 100), false);
            fighter.defense += _.random(0, (mot / 100), false);
            fighter.stamina += _.random(0, (mot / 100), false);

        }else{

            fighter.speed += _.random(0, -((100 - mot) / 100) * 2, false);
            fighter.power += _.random(0, -((100 - mot) / 100) * 2, false);
            fighter.timing += _.random(0, -((100 - mot) / 100) * 2, false);
            fighter.footwork += _.random(0, -((100 - mot) / 100) * 2, false);
            fighter.defense += _.random(0, -((100 - mot) / 100) * 2, false);
            fighter.stamina += _.random(0, -((100 - mot) / 100) * 2, false);

        }

        let oldOvr = fighter.overall;
        fighter.overall = this.getOverall(fighter);
        if(oldOvr < fighter.overall){
            fighter.formatted.overall = fighter.overall + " (+" + (fighter.overall - oldOvr) + ")";
        } else if (oldOvr > fighter.overall){
            fighter.formatted.overall = fighter.overall + " (-" + (oldOvr - fighter.overall) + ")";
        } else fighter.formatted.overall = fighter.overall.toString();
    }
}

export default FighterHandler;
