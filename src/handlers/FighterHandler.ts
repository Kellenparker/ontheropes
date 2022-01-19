import * as _ from 'lodash';

export interface Fighter {
    name: string;
    age: number;
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
                this.roster[i][j] = {
                    name: "test ing",
                    age: _.random(18, 44, false),
                    overall: _.random(0, 100, false)
                };
            }
        }
    }

    getRoster = () => this.roster;

    getWeightClass = (index: number) => this.roster[index];
}

export default FighterHandler;
