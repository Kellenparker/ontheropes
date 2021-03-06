import * as _ from "lodash";
import { randomTruncSkewNormal } from "../tools/rand";
import { nanoid } from "nanoid";

var human_names = require("human-names");

export interface Fighter {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    career: number;
    retired: number; // 0: active, 1: planning to retire, 2: retired
    timeOff: number;
    belts: number;
    weightClass: number;
    type: number; // 0: champ, 1: prospect, 2: legend, 3: can, 4: average
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
    streak: number;
    hasFight: boolean;
    opponentId?: string;
    earnings: number;
    success: number;
    popularity: number;
    peakStatus: number;
    overall: number;
    changes: Changes;
    formatted: FormattedFighter;
    results: FighterResults[];
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
    record: string;
    overall: string;
    streak: string;
}

export interface FighterResults {
    opponent: {
        name: string;
        id: string;
        overall: number;
        record: string;
        belts: number;
    };
    num: number;
    dateStr: string;
    win: boolean;
    finish?: {
        round: number;
        style: number; //0: KO, 1: TKO, 2: RTD, 3: DSQ
    };
    title: boolean;
}

const wcNum = 9;
const wcSize = 100;
const numBelts = 3;

class FighterHandler {
    fighters: Fighter[][];
    champions: (Fighter | null)[][];
    retired: Fighter[];

    constructor() {
        this.champions = [];
        this.fighters = [];
        this.retired = [];
    }
    
    loadFighters = (fighters: Fighter[][]) => {
        let len = fighters.length;
        for(let i = 0; i < len; i++){
            this.fighters[i] = [];
            fighters[i].forEach((fighter, j) => {
                this.fighters[i][j] = fighter;
            })
        }
        this.getChamps();
    }

    loadRetired = (fighters: Fighter[]) => {
        fighters.forEach((fighter, i) => {
            this.retired[i] = fighter;
        })
    }

    initRoster = () => {
        for (let i = 0; i < wcNum; i++) {
            this.fighters[i] = [];
            for (let j = 0; j < wcSize; j++) {
                this.fighters[i][j] = this.generateFighter(i);
            }
        }
        this.setChamps();
    }

    setChamps = () => {
        let ind;
        for (let i = 0; i < wcNum; i++) {
            this.champions[i] = [];
            for (let j = 0; j < numBelts; j++) {
                ind = _.random(0, 4, false);
                this.fighters[i][ind].belts++;
                this.champions[i][j] = this.fighters[i][ind];
            }
        }
        console.log(this.champions);
    };

    getChamps = () => {
        let currentFound;
        for (let i = 0; i < wcNum; i++) {
            this.champions[i] = [];
            currentFound = 0;
            for (let j = 0; j < wcSize && currentFound < 3; j++) {
                let belts = this.fighters[i][j].belts;
                for (let k = 0; k < belts; k++) {
                    this.champions[i][currentFound] = this.fighters[i][j];
                    currentFound++;
                }
            }
        }
    };

    advance = (tick: number) => {
        for (let i = 0; i < wcNum; i++)
            for (let j = 0; j < wcSize; j++) this.progress(this.fighters[i][j], tick % 4 === 0);
    };

    age = () => {
        console.log("aging");
        for (let i = 0; i < wcNum; i++)
            for (let j = 0; j < wcSize; j++) {
                this.fighters[i][j].age++;
                this.fighters[i][j].career++;
                this.setPeak(this.fighters[i][j]);
                if (this.fighters[i][j].retired === 1) this.fighters[i][j] = this.retire(this.fighters[i][j]);
            }
    };

    getFighter = (id: number) => {
        let ret: Fighter | undefined;
        for (let i = 0; i < wcNum && ret === undefined; i++) ret = _.find(this.fighters[i], { id: id }) as Fighter;
        return ret;
    };

    getRoster = () => this.fighters;

    getWeightClass = (index: number) => this.fighters[index];

    getPercentWithFight = () => {
        let sum = 0;
        for (let i = 0; i < wcNum; i++) for (let j = 0; j < wcSize; j++) if (this.fighters[i][j].hasFight) sum++;

        return sum / (wcNum * wcSize);
    };

    getOverall = (fighter: Fighter) =>
        _.clamp(
            Math.floor(
                (fighter.defense * 3 +
                    fighter.timing * 3 +
                    fighter.speed * 3 +
                    fighter.power * 3 +
                    fighter.footwork * 3 +
                    fighter.stamina * 2 +
                    fighter.chin +
                    fighter.reach +
                    fighter.height) /
                20
            ),
            0,
            100
        );

    generateFighter = (wc: number): Fighter => {
        let age = _.random(17, 44, false);
        let height = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let fights = Math.floor((age - 17) * _.random(1, 3, false));
        let reach = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], height, 30, 0));
        let stamina = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let chin = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let damage = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], (age - 17) * 3, 30, 0));
        let power = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let speed = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let timing = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let defense = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let footwork = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let motivation = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let fighter: Fighter = {
            id: nanoid(9),
            firstName: human_names.maleRandom(),
            lastName: human_names.allRandom(),
            age: age,
            career: Math.floor(randomTruncSkewNormal(Math.random(), [0, age - 16], age - 17, 2, 0)),
            retired: 0,
            timeOff: 0,
            belts: 0,
            weightClass: wc,
            type: 4,
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
            streak: 0,
            hasFight: false,
            earnings: 0,
            success: 0,
            popularity: 0,
            peakStatus: _.clamp(Math.floor((age - 17) / _.random(7, 11)), 0, 2),
            overall: 0,
            changes: {} as Changes,
            formatted: {} as FormattedFighter,
            results: [],
        };

        fighter.overall = this.getOverall(fighter);
        fighter.wins = _.clamp(
            Math.ceil(fighter.fights * (fighter.overall / 80) * ((100 - fighter.age) / 60)) + _.random(-2, 2, false),
            0,
            fighter.fights
        );
        fighter.draws = Math.floor(_.random(0, (fighter.fights - fighter.wins) / 10, false));
        fighter.losses = fighter.fights - (fighter.wins + fighter.draws);
        fighter.popularity = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], fighter.overall, 30, 0));

        fighter.formatted = {
            record: fighter.wins + "-" + fighter.losses + "-" + fighter.draws,
            overall: fighter.overall.toString(),
            streak: "N/A",
        };

        return fighter;
    };

    newFighter = (wc: number) => {
        let age = _.random(17, 23, false);
        let height = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let fights = 0;
        let reach = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], height, 30, 0));
        let stamina = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let chin = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let damage = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], (age - 17) * 3, 30, 0));
        let power = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let speed = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let timing = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 20, 30, 0));
        let defense = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 20, 30, 0));
        let footwork = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 20, 30, 0));
        let motivation = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0));
        let fighter: Fighter = {
            id: nanoid(9),
            firstName: human_names.maleRandom(),
            lastName: human_names.allRandom(),
            age: age,
            career: Math.floor(randomTruncSkewNormal(Math.random(), [0, age - 16], age - 17, 2, 0)),
            retired: 0,
            timeOff: 0,
            belts: 0,
            weightClass: wc,
            type: 4,
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
            streak: 0,
            hasFight: false,
            earnings: 0,
            success: 0,
            popularity: 0,
            peakStatus: _.clamp(Math.floor((age - 17) / _.random(7, 11)), 0, 2),
            overall: 0,
            changes: {} as Changes,
            formatted: {} as FormattedFighter,
            results: [],
        };

        fighter.overall = this.getOverall(fighter);
        fighter.wins = fighter.draws = fighter.losses = 0;
        fighter.popularity = Math.floor(randomTruncSkewNormal(Math.random(), [0, 100], 10, 30, 0));

        fighter.formatted = {
            record: fighter.wins + "-" + fighter.losses + "-" + fighter.draws,
            overall: fighter.overall.toString(),
            streak: "N/A",
        };

        return fighter;
    };

    progress = (fighter: Fighter, setType: boolean) => {
        const mot = fighter.motivation;
        if (fighter.peakStatus === 0) {
            fighter.speed = _.clamp(fighter.speed + _.random(0, mot / 100 / 4, true), 0, 100);
            fighter.power = _.clamp(fighter.power + _.random(0, mot / 100 / 4, true), 0, 100);
            fighter.timing = _.clamp(fighter.timing + _.random(0, mot / 100 / 4, true), 0, 100);
            fighter.footwork = _.clamp(fighter.footwork + _.random(0, mot / 100 / 4, true), 0, 100);
            fighter.defense = _.clamp(fighter.defense + _.random(0, mot / 100 / 4, true), 0, 100);
            fighter.stamina = _.clamp(fighter.stamina + _.random(0, mot / 100 / 4, true), 0, 100);
        } else if (fighter.peakStatus === 1) {
            fighter.speed = _.clamp(fighter.speed + _.random(0, mot / 100 / 8, true), 0, 100);
            fighter.power = _.clamp(fighter.power + _.random(0, mot / 100 / 8, true), 0, 100);
            fighter.timing = _.clamp(fighter.timing + _.random(0, mot / 100 / 8, true), 0, 100);
            fighter.footwork = _.clamp(fighter.footwork + _.random(0, mot / 100 / 8, true), 0, 100);
            fighter.defense = _.clamp(fighter.defense + _.random(0, mot / 100 / 8, true), 0, 100);
            fighter.stamina = _.clamp(fighter.stamina + _.random(0, mot / 100 / 8, true), 0, 100);
        } else {
            fighter.speed = _.clamp(fighter.speed + _.random(0, -((100 - mot) / 100) / 4), 0, 100);
            fighter.power = _.clamp(fighter.power + _.random(0, -((100 - mot) / 100) / 4), 0, 100);
            fighter.timing = _.clamp(fighter.timing + _.random(0, -((100 - mot) / 100) / 4), 0, 100);
            fighter.footwork = _.clamp(fighter.footwork + _.random(0, -((100 - mot) / 100) / 4), 0, 100);
            fighter.defense = _.clamp(fighter.defense + _.random(0, -((100 - mot) / 100) / 4), 0, 100);
            fighter.stamina = _.clamp(fighter.stamina + _.random(0, -((100 - mot) / 100) / 4), 0, 100);
        }

        let oldOvr = fighter.overall;
        fighter.overall = this.getOverall(fighter);
        if (oldOvr < fighter.overall) {
            fighter.formatted.overall = fighter.overall + " (+" + (fighter.overall - oldOvr) + ")";
        } else if (oldOvr > fighter.overall) {
            fighter.formatted.overall = fighter.overall + " (-" + (oldOvr - fighter.overall) + ")";
        } else fighter.formatted.overall = fighter.overall.toString();

        fighter.formatted.record = fighter.wins + "-" + fighter.losses + "-" + fighter.draws;

        if (fighter.streak > 0) fighter.formatted.streak = "+" + fighter.streak;
        else if (fighter.streak < 0) fighter.formatted.streak = fighter.streak.toString();

        if (setType) {
            fighter.type = 4;
            if (fighter.belts > 0) fighter.type = 0;
            else if (fighter.age < 25 && fighter.overall < 70) fighter.type = 1;
            else if (fighter.popularity > 80 && fighter.age > 35) fighter.type = 2;
            else if (fighter.age > 27 && fighter.overall < 50) fighter.type = 3;
        }

        fighter.timeOff = _.clamp(fighter.timeOff - 1, 0, fighter.timeOff);
    };

    setPeak = (fighter: Fighter) => {
        if (fighter.career - 14 > 0 && fighter.peakStatus < 2 && _.random(0, fighter.motivation, true) < 50) {
            fighter.peakStatus++;
            console.log("peakChanged");
        } else if (fighter.career - 7 > 0 && fighter.peakStatus < 2 && _.random(0, fighter.motivation, true) < 50) {
            fighter.peakStatus++;
            console.log("peakChanged");
        }
    };

    postFight = (fighter: Fighter) => {
        if (fighter.age > 40) fighter.retired = 1;
        else {
            fighter.timeOff = _.random(0, 5, false);
        }
    }

    retire = (fighter: Fighter): Fighter => {
        let ret: boolean = false;
        if (fighter.age > 40) ret = true;

        if (ret) {
            if (fighter.belts > 0){
                let ordered = _.orderBy(this.fighters[fighter.weightClass], "overall", "desc");
                let topFighter = ordered[0];
                topFighter.belts = fighter.belts;
                console.log(fighter.belts);
                let len = fighter.belts
                for (var i = 0; i < len; i++)
                    if (_.isEqual(this.champions[fighter.weightClass][i], fighter))
                        this.champions[fighter.weightClass][i] = topFighter;
            }

            fighter.retired = 2;
            this.retired.push(fighter);
            if (fighter.hasFight) {
                let opponent: Fighter = _.find(this.fighters[fighter.weightClass], { id: fighter.opponentId })!;
                opponent.hasFight = false;
                opponent.opponentId = undefined;
            }
            let replacement = this.newFighter(fighter.weightClass);
            return replacement;
        }
        return fighter;
    };
}

export default FighterHandler;
