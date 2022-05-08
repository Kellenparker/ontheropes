import * as _ from "lodash";
import { randomTruncSkewNormal } from "../tools/rand";

var human_names = require("human-names");

export interface Fighter {
    name: string;
    age: number;
    career: number;
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
    hasFight: boolean;
    earnings: number;
    success: number;
    popularity: number;
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
    record: string;
    overall: string;
    streak: string;
}

interface ImportRoster {
    roster: Fighter[][];
}

const wcNum = 9;
const wcSize = 100;
const numBelts = 3;

class FighterHandler {
    private roster: Fighter[][];
    private champions: (Fighter | null)[][];

    constructor(localRoster: ImportRoster | null) {
        this.champions = [];
        if (localRoster === null) {
            this.roster = [];
            for (let i = 0; i < wcNum; i++) {
                this.roster[i] = [];
                for (let j = 0; j < wcSize; j++) {
                    this.roster[i][j] = this.generateFighter(i);
                }
                this.roster[i] = _.orderBy(this.roster[i], "overall", "desc");
            }
            this.setChamps();
        } else {
            this.roster = localRoster.roster;
            console.log(this.roster);
            this.getChamps();
        }
    }

    setChamps = () => {
        let ind;
        for (let i = 0; i < wcNum; i++) {
            this.champions[i] = [];
            for (let j = 0; j < numBelts; j++) {
                ind = _.random(0, 4, false);
                this.roster[i][ind].belts++;
                this.champions[i][j] = this.roster[i][ind];
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
                let belts = this.roster[i][j].belts;
                for (let k = 0; k < belts; k++) {
                    this.champions[i][currentFound] = this.roster[i][j];
                    currentFound++;
                }
            }
        }
    };

    advance = (tick: number) => {
        for (let i = 0; i < wcNum; i++)
            for (let j = 0; j < wcSize; j++)
                this.progress(this.roster[i][j], tick % 4 === 0);
        console.log(this.roster);
        console.log(this.champions);
    };

    age = () => {
        console.log("aging");
        for (let i = 0; i < wcNum; i++)
            for (let j = 0; j < wcSize; j++) {
                this.roster[i][j].age++;
                this.roster[i][j].career++;
                this.setPeak(this.roster[i][j]);
                this.roster[i][j] = this.retire(this.roster[i][j]);
            }
    };

    getRoster = () => this.roster;

    getWeightClass = (index: number) => this.roster[index];

    getPercentWithFight = () => {
        let sum = 0;
        for (let i = 0; i < wcNum; i++)
            for (let j = 0; j < wcSize; j++) 
                if(this.roster[i][j].hasFight) sum++;

        return sum / (wcNum * wcSize);
    }

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
        let height = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let fights = Math.floor((age - 17) * _.random(1, 3, false));
        let reach = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], height, 30, 0)
        );
        let stamina = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let chin = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let damage = Math.floor(
            randomTruncSkewNormal(
                Math.random(),
                [0, 100],
                (age - 17) * 3,
                30,
                0
            )
        );
        let power = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let speed = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let timing = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let defense = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let footwork = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let motivation = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let fighter: Fighter = {
            name: human_names.maleRandom() + " " + human_names.allRandom(),
            age: age,
            career: Math.floor(
                randomTruncSkewNormal(
                    Math.random(),
                    [0, age - 16],
                    age - 17,
                    2,
                    0
                )
            ),
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
            hasFight: false,
            earnings: 0,
            success: 0,
            popularity: 0,
            peakStatus: _.clamp(Math.floor((age - 17) / _.random(7, 11)), 0, 2),
            overall: 0,
            changes: {} as Changes,
            formatted: {} as FormattedFighter,
        };

        fighter.overall = this.getOverall(fighter);
        fighter.wins = _.clamp(
            Math.ceil(
                fighter.fights *
                    (fighter.overall / 80) *
                    ((100 - fighter.age) / 60)
            ) + _.random(-2, 2, false),
            0,
            fighter.fights
        );
        fighter.draws = Math.floor(
            _.random(0, (fighter.fights - fighter.wins) / 10, false)
        );
        fighter.losses = fighter.fights - (fighter.wins + fighter.draws);
        fighter.popularity = Math.floor(
            randomTruncSkewNormal(
                Math.random(),
                [0, 100],
                fighter.overall,
                30,
                0
            )
        );

        fighter.formatted = {
            record: fighter.wins + "-" + fighter.losses + "-" + fighter.draws,
            overall: fighter.overall.toString(),
            streak: "N/A",
        };

        return fighter;
    };

    newFighter = (wc: number) => {
        let age = _.random(17, 23, false);
        let height = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let fights = Math.floor((age - 17) * _.random(1, 3, false));
        let reach = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], height, 30, 0)
        );
        let stamina = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let chin = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let damage = Math.floor(
            randomTruncSkewNormal(
                Math.random(),
                [0, 100],
                (age - 17) * 3,
                30,
                0
            )
        );
        let power = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let speed = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let timing = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 20, 30, 0)
        );
        let defense = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 20, 30, 0)
        );
        let footwork = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 20, 30, 0)
        );
        let motivation = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 50, 30, 0)
        );
        let fighter: Fighter = {
            name: human_names.maleRandom() + " " + human_names.allRandom(),
            age: age,
            career: Math.floor(
                randomTruncSkewNormal(
                    Math.random(),
                    [0, age - 16],
                    age - 17,
                    2,
                    0
                )
            ),
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
            hasFight: false,
            earnings: 0,
            success: 0,
            popularity: 0,
            peakStatus: _.clamp(Math.floor((age - 17) / _.random(7, 11)), 0, 2),
            overall: 0,
            changes: {} as Changes,
            formatted: {} as FormattedFighter,
        };

        fighter.overall = this.getOverall(fighter);
        fighter.wins = fighter.draws = fighter.losses = 0;
        fighter.popularity = Math.floor(
            randomTruncSkewNormal(Math.random(), [0, 100], 10, 30, 0)
        );

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
            fighter.speed = _.clamp(
                fighter.speed + _.random(0, mot / 100 / 4, true),
                0,
                100
            );
            fighter.power = _.clamp(
                fighter.power + _.random(0, mot / 100 / 4, true),
                0,
                100
            );
            fighter.timing = _.clamp(
                fighter.timing + _.random(0, mot / 100 / 4, true),
                0,
                100
            );
            fighter.footwork = _.clamp(
                fighter.footwork + _.random(0, mot / 100 / 4, true),
                0,
                100
            );
            fighter.defense = _.clamp(
                fighter.defense + _.random(0, mot / 100 / 4, true),
                0,
                100
            );
            fighter.stamina = _.clamp(
                fighter.stamina + _.random(0, mot / 100 / 4, true),
                0,
                100
            );
        } else if (fighter.peakStatus === 1) {
            fighter.speed = _.clamp(
                fighter.speed + _.random(0, mot / 100 / 8, true),
                0,
                100
            );
            fighter.power = _.clamp(
                fighter.power + _.random(0, mot / 100 / 8, true),
                0,
                100
            );
            fighter.timing = _.clamp(
                fighter.timing + _.random(0, mot / 100 / 8, true),
                0,
                100
            );
            fighter.footwork = _.clamp(
                fighter.footwork + _.random(0, mot / 100 / 8, true),
                0,
                100
            );
            fighter.defense = _.clamp(
                fighter.defense + _.random(0, mot / 100 / 8, true),
                0,
                100
            );
            fighter.stamina = _.clamp(
                fighter.stamina + _.random(0, mot / 100 / 8, true),
                0,
                100
            );
        } else {
            fighter.speed = _.clamp(
                fighter.speed + _.random(0, -((100 - mot) / 100) / 4),
                0,
                100
            );
            fighter.power = _.clamp(
                fighter.power + _.random(0, -((100 - mot) / 100) / 4),
                0,
                100
            );
            fighter.timing = _.clamp(
                fighter.timing + _.random(0, -((100 - mot) / 100) / 4),
                0,
                100
            );
            fighter.footwork = _.clamp(
                fighter.footwork + _.random(0, -((100 - mot) / 100) / 4),
                0,
                100
            );
            fighter.defense = _.clamp(
                fighter.defense + _.random(0, -((100 - mot) / 100) / 4),
                0,
                100
            );
            fighter.stamina = _.clamp(
                fighter.stamina + _.random(0, -((100 - mot) / 100) / 4),
                0,
                100
            );
        }

        let oldOvr = fighter.overall;
        fighter.overall = this.getOverall(fighter);
        if (oldOvr < fighter.overall) {
            fighter.formatted.overall =
                fighter.overall + " (+" + (fighter.overall - oldOvr) + ")";
        } else if (oldOvr > fighter.overall) {
            fighter.formatted.overall =
                fighter.overall + " (-" + (oldOvr - fighter.overall) + ")";
        } else fighter.formatted.overall = fighter.overall.toString();

        if (setType) {
            fighter.type = 4;
            if (fighter.belts > 0) fighter.type = 0;
            else if (fighter.age < 25 && fighter.overall < 70) fighter.type = 1;
            else if (fighter.popularity > 80 && fighter.age > 35)
                fighter.type = 2;
            else if (fighter.age > 27 && fighter.overall < 50) fighter.type = 3;
        }
    };

    setPeak = (fighter: Fighter) => {
        if (
            fighter.career - 14 > 0 &&
            fighter.peakStatus < 2 &&
            _.random(0, fighter.motivation, true) < 50
        ) {
            fighter.peakStatus++;
            console.log("peakChanged");
        } else if (
            fighter.career - 7 > 0 &&
            fighter.peakStatus < 2 &&
            _.random(0, fighter.motivation, true) < 50
        ) {
            fighter.peakStatus++;
            console.log("peakChanged");
        }
    };

    retire = (fighter: Fighter): Fighter => {
        let ret: boolean = false;
        if (fighter.age > 40) ret = true;

        if (ret) {
            if (fighter.belts > 0)
                for (let i = 0; i < numBelts; i++)
                    if (
                        _.isEqual(
                            this.champions[fighter.weightClass][i],
                            fighter
                        )
                    )
                        this.champions[fighter.weightClass][i] = null;

            console.log("replaced: ");
            console.log(fighter);
            let replacement = this.newFighter(fighter.weightClass);
            console.log("with ");
            console.log(fighter);
            return replacement;
        }
        return fighter;
    };
}

export default FighterHandler;
