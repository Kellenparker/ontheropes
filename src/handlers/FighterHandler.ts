interface Fighter {
    fname: string;
    lname: string;
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
                    fname: "test",
                    lname: "ing",
                    age: 20,
                    overall: 50,
                };
            }
        }
    }

    getRoster = () => this.roster;
}

export default FighterHandler;
